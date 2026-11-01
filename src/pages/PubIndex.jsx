/**
 * PubIndex
 * - JSON 기반 퍼블리시 화면 목록 (탭 / 화면명 필터 / 검색 / 폴더 펼침)
 * - 공통 컴포넌트 의존 없이 이 페이지만으로 동작 (스타일: wbs-* → _wbs-index.scss)
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { cx } from '@/utils/cx'
import '@/styles/pages/_wbs-index.scss'

/* ------------------------------------------------------------------ */
/* 상수                                                                */
/* ------------------------------------------------------------------ */

// 프로젝트 메타·탭 목록
const INDEX_URL = '/static/data/publish/index.json'
// 탭별 폴더·화면 JSON 루트
const DATA_BASE = '/static/data/publish/'

// index.json 이 덮어쓸 수 있는 기본 탭
const DEFAULT_TABS = [
  { id: 'pc', label: 'PC', base: 'pc/' },
  { id: 'mobile', label: 'MOBILE', base: 'mobile/' },
  { id: 'pc-guide', label: 'PC 컴포넌트 가이드', base: 'pc-guide/' },
  { id: 'mobile-guide', label: 'Mobile 컴포넌트 가이드', base: 'mobile-guide/' }
]
const FALLBACK_TAB = DEFAULT_TABS[0]

const DEFAULT_PROJECT_NAME = 'Publish List'
const DEFAULT_PROJECT_DESC = 'PC / MOBILE 화면 퍼블리시 목록과 컴포넌트 가이드를 확인합니다.'

// 상태 코드 → 한글 라벨
const STATUS_MAP = {
  done: '완료',
  active: '진행중',
  pending: '대기',
  delayed: '지연'
}

// 상태 코드 → 뱃지 색상 클래스 접미사 (is-success 등)
const STATUS_COLOR = {
  all: 'default',
  done: 'success',
  active: 'info',
  pending: 'muted',
  delayed: 'warning'
}

// 검색 카테고리
const SEARCH_CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'screenName', label: '화면명' },
  { value: 'screenType', label: 'Screen Type' },
  { value: 'screenId', label: 'Screen ID' },
  { value: 'pageUrl', label: 'PageUrl' },
  { value: 'filePath', label: 'File Path' },
  { value: 'owner', label: '담당자' },
  { value: 'start', label: '시작일' },
  { value: 'expected', label: '예상일' },
  { value: 'end', label: '종료일' },
  { value: 'status', label: '상태' },
  { value: 'planning', label: '기획' },
  { value: 'design', label: '디자인' },
  { value: 'remark', label: '비고' }
]

// 카테고리 value → input placeholder
const SEARCH_PLACEHOLDERS = {
  all: '화면명, Screen Type, Screen ID, PageUrl, File Path, 담당자, 시작일, 예상일, 종료일, 상태, 기획, 디자인, 비고로 검색',
  screenName: '화면명 검색',
  screenType: 'Screen Type 검색',
  screenId: 'Screen ID 검색',
  pageUrl: 'PageUrl 검색',
  filePath: 'File Path 검색',
  owner: '담당자 검색',
  start: '시작일 검색',
  expected: '예상일 검색',
  end: '종료일 검색',
  status: '상태 검색 (완료, 진행중, 대기, 지연)',
  planning: '기획 경로 검색',
  design: '디자인 경로 검색',
  remark: '비고 검색'
}

/**
 * 진행·일정·상태 표시 여부
 * - true: 전체 진행률 + 시작일/예상일/종료일/상태/진행률 컬럼 표시
 * - false: 프로젝트 완료 후 숨김
 */
const SHOW_PROGRESS_META = true

// 로딩 스켈레톤 1뎁스 행 수
const SKELETON_ROW_COUNT = 10

// 테이블 컬럼 정의 (progress: showProgressMeta 일 때만 노출)
const COLUMNS = [
  { key: 'name', label: '화면명' },
  { key: 'type', label: 'Screen Type' },
  { key: 'id', label: 'Screen ID' },
  { key: 'pageurl', label: 'PageUrl' },
  { key: 'path', label: 'File Path' },
  { key: 'owner', label: '담당자' },
  { key: 'start', label: '시작일', progress: true },
  { key: 'expected', label: '예상일', progress: true },
  { key: 'end', label: '종료일', progress: true },
  { key: 'status', label: '상태', progress: true },
  { key: 'progress', label: '진행률', progress: true },
  { key: 'planning', label: '기획' },
  { key: 'design', label: '디자인' },
  { key: 'remark', label: '비고' }
]
const VISIBLE_COLUMNS = COLUMNS.filter((col) => !col.progress || SHOW_PROGRESS_META)

const EMPTY_REMARK_MODAL = { open: false, screenName: '', screenId: '', items: [] }

/* ------------------------------------------------------------------ */
/* 순수 헬퍼                                                           */
/* ------------------------------------------------------------------ */

/** JSON 로드. 실패 시 한글 메시지의 Error 를 throw */
async function fetchJson (url) {
  let res
  try {
    res = await fetch(url)
  } catch (e) {
    throw new Error('네트워크 오류: ' + url)
  }
  if (!res.ok) throw new Error('요청 실패 (' + res.status + '): ' + url)
  try {
    return JSON.parse(await res.text())
  } catch (e) {
    throw new Error('JSON 형식 오류: ' + url)
  }
}

/**
 * 탭의 index.json → 각 폴더 JSON 병렬 로드
 * Promise.all 이 원본 순서를 유지한다.
 */
async function fetchTabFolders (base) {
  // 예: pc/ → /static/data/publish/pc/index.json
  const data = await fetchJson(DATA_BASE + base + 'index.json')
  const list = (data && data.folders) || []

  const payloads = await Promise.all(list.map((meta) => {
    const file = meta.file || (meta.id + '.json')
    // 절대/외부 URL 이면 그대로, 아니면 DATA_BASE + base 붙임
    const url = file.indexOf('/') === 0 || /^https?:\/\//i.test(file)
      ? file
      : DATA_BASE + base + file
    return fetchJson(url).then((payload) => (
      payload
        ? {
          id: payload.id || meta.id,
          name: payload.name || meta.name,
          filePath: payload.filePath || '',
          screens: payload.screens || []
        }
        : null
    ))
  }))

  return payloads.filter(Boolean)
}

/** 뱃지/닷용 색상 키 */
const statusColor = (status) => STATUS_COLOR[status] || 'muted'

/** 상태 코드 → 표시 라벨 */
const statusLabel = (status) => STATUS_MAP[status] || status || '-'

/** 비고 텍스트 정규화 (배열·개행 정리) */
function normalizeRemarkText (value) {
  if (value == null) return ''
  // 줄 배열이면 합친 뒤 빈 줄 정리
  if (Array.isArray(value)) {
    return value
      .map((line) => (line == null ? '' : String(line)))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }
  // 문자열이면 CR 제거 후 trim
  return String(value).replace(/\r\n/g, '\n').trim()
}

/** 비고 → [{ date, author, text }] 목록 */
function remarkItems (remark) {
  if (!remark) return []
  // 배열: 문자열 항목 또는 객체 항목을 동일 형태로
  if (Array.isArray(remark)) {
    return remark.map((item) => {
      if (typeof item === 'string') {
        return { date: '', author: '', text: normalizeRemarkText(item) }
      }
      return {
        date: item.date || item.at || '',
        author: item.author || item.by || '',
        // text / content / message 중 있는 키 사용
        text: normalizeRemarkText(
          item.text != null
            ? item.text
            : item.content != null
              ? item.content
              : item.message
        )
      }
    }).filter((item) => !!item.text) // 본문 없는 항목 제외
  }
  // 단일 문자열 비고
  if (typeof remark === 'string' && remark.trim()) {
    return [{ date: '', author: '', text: normalizeRemarkText(remark) }]
  }
  return []
}

/** 비고 내용 존재 여부 */
const remarkHasContent = (remark) => remarkItems(remark).length > 0

/** 목록용 비고 미리보기 (최신 1건, 한 줄) */
function remarkPreview (remark) {
  const items = remarkItems(remark)
  if (!items.length) return '-'
  // 마지막(최신) 항목의 개행을 공백으로
  return items[items.length - 1].text.replace(/\s*\n\s*/g, ' ')
}

/** 검색용 비고 전체 텍스트 */
const remarkSearchText = (remark) =>
  remarkItems(remark)
    .map((item) => [item.date, item.author, item.text].join(' '))
    .join(' ')

/** 화면 1건이 검색어·카테고리에 맞는지 */
function screenMatches (screen, q, category) {
  // 검색 대상 필드를 문자열로 모음
  const fields = {
    screenName: String(screen.screenName || ''),
    screenType: String(screen.screenType || ''),
    screenId: String(screen.screenId || ''),
    pageUrl: String(screen.pageUrl || ''),
    filePath: String(screen.filePath || ''),
    owner: String(screen.owner || ''),
    start: String(screen.start || ''),
    expected: String(screen.expected || ''),
    end: String(screen.end || ''),
    status: statusLabel(screen.status),
    planning: String(screen.planning || ''),
    design: String(screen.design || ''),
    remark: remarkSearchText(screen.remark)
  }

  // 특정 카테고리면 그 필드만 검사
  if (category && category !== 'all') {
    return String(fields[category] || '').toLowerCase().indexOf(q) !== -1
  }

  // 전체: 어느 필드든 포함되면 매칭
  return Object.keys(fields).some((key) =>
    String(fields[key] || '').toLowerCase().indexOf(q) !== -1
  )
}

/**
 * 검색어(query)로 필터된 폴더 목록
 * - 폴더명 매칭 시 하위 화면 전부
 * - 아니면 매칭된 화면만 남김
 */
function filterFolders (folders, query, category) {
  const q = (query || '').toLowerCase()
  if (!q) return folders

  return folders
    .map((folder) => {
      // 폴더명 자체 매칭 여부 (전체/화면명 카테고리일 때만)
      const folderHit = category === 'all' || category === 'screenName'
        ? (folder.name || '').toLowerCase().indexOf(q) !== -1
        : false

      return {
        id: folder.id,
        name: folder.name,
        filePath: folder.filePath,
        // 폴더명이 맞으면 하위 화면 전부, 아니면 매칭된 화면만
        screens: folderHit
          ? folder.screens || []
          : (folder.screens || []).filter((screen) => screenMatches(screen, q, category))
      }
    })
    // 검색 중이면 화면이 1개 이상인 폴더만
    .filter((folder) => folder.screens && folder.screens.length)
}

/* ------------------------------------------------------------------ */
/* 하위 컴포넌트                                                       */
/* ------------------------------------------------------------------ */

/** 스켈레톤 뼈대 한 조각 */
function Skel ({ mod, style }) {
  return <span className={'wbs-skel wbs-skel--' + mod} style={style} />
}

/** 로딩 상태: 실제 레이아웃과 동일한 스켈레톤 */
function PubIndexSkeleton () {
  return (
    <div
      className="wbs-skeleton"
      aria-busy="true"
      aria-label="목록을 불러오는 중"
    >
      {/* 스켈레톤: 히어로(제목·설명) + 진행률 요약 */}
      <header className="wbs-hero">
        <Skel mod="eyebrow" />
        <Skel mod="title" />
        <Skel mod="desc" />
        {/* 스켈레톤: 전체 진행률 카드 */}
        {SHOW_PROGRESS_META && (
          <div className="wbs-summary">
            <div className="wbs-summary-main">
              <Skel mod="label" />
              <Skel mod="value" />
            </div>
            <Skel mod="bar" />
            <div className="wbs-skeleton__stats">
              {[1, 2, 3, 4, 5].map((n) => <Skel key={'stat-' + n} mod="stat" />)}
            </div>
          </div>
        )}
      </header>

      {/* 스켈레톤: 탭 + 검색 sticky */}
      <div className="wbs-sticky" aria-hidden="true">
        <div className="wbs-tabs-bar wbs-skeleton__tabs">
          {[1, 2, 3, 4].map((n) => <Skel key={'tab-' + n} mod="tab" />)}
        </div>
        <div className="wbs-panel-head">
          <div className="wbs-skeleton__search">
            <Skel mod="select" />
            <Skel mod="input" />
          </div>
          <Skel mod="switch" />
        </div>
      </div>
      <div className="wbs-filter-bar" aria-hidden="true">
        <Skel mod="chip" style={{ width: '88px', height: '32px' }} />
        <Skel mod="chip" style={{ width: '72px' }} />
        <Skel mod="chip" style={{ width: '96px' }} />
      </div>

      {/* 스켈레톤: 목록 테이블 */}
      <section className="wbs-panel" aria-hidden="true">
        <div className="wbs-table-wrap">
          <div className={cx('wbs-table', { 'is-progress-hidden': !SHOW_PROGRESS_META })}>
            <div className="wbs-table__head" role="presentation">
              {VISIBLE_COLUMNS.map((col) => (
                <div key={col.key} className={'col-' + col.key}>
                  <Skel mod="th" />
                </div>
              ))}
            </div>
            <ul className="wbs-table__list">
              {Array.from({ length: SKELETON_ROW_COUNT }, (_, i) => i + 1).map((n) => (
                <li key={'row-' + n} className="wbs-table__group">
                  <div className="wbs-table__row level-0">
                    <div className="col-name" role="presentation">
                      <Skel mod="toggle" />
                      <Skel mod="name" style={{ width: (40 + (n % 5) * 10) + '%' }} />
                    </div>
                    {VISIBLE_COLUMNS.filter((col) => col.key !== 'name').map((col) => (
                      <div key={col.key} className={'col-' + col.key}>
                        <Skel mod="cell" />
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

/** 외부 링크 셀 (기획/디자인/PageUrl 공통) */
function PathLinkCell ({ href }) {
  return href
    ? (
      <a
        className="path-link"
        href={href}
        title={href}
        target="_blank"
        rel="noopener noreferrer"
      ><code>{href}</code></a>
    )
    : <span className="path-empty">-</span>
}

/* ------------------------------------------------------------------ */
/* 메인 컴포넌트                                                       */
/* ------------------------------------------------------------------ */

export default function PubIndex () {
  /* ---------- 상태 ---------- */
  const [loading, setLoading] = useState(true) // 최초·탭 전환 로딩
  const [error, setError] = useState('') // 로드 실패 메시지
  const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME)
  const [projectDesc, setProjectDesc] = useState(DEFAULT_PROJECT_DESC)
  const [tabs, setTabs] = useState(DEFAULT_TABS)
  const [activeTab, setActiveTab] = useState('pc') // 현재 퍼블리시 탭 id
  const [folders, setFolders] = useState([]) // 현재 탭의 1뎁스 폴더(+screens)
  const [expanded, setExpanded] = useState({}) // { [folderId]: true } 펼침 여부
  const [searchCategory, setSearchCategory] = useState('all') // 검색 대상 컬럼
  const [searchInput, setSearchInput] = useState('') // 입력 중인 검색어
  const [query, setQuery] = useState('') // Enter 적용된 실제 검색어
  const [activeFolderId, setActiveFolderId] = useState(null) // 화면명 필터 선택값 (null = 전체)
  const [filterSheetOpen, setFilterSheetOpen] = useState(false) // 화면명 필터 버텀시트
  const [remarkModal, setRemarkModal] = useState(EMPTY_REMARK_MODAL) // 비고 히스토리 모달

  /* ---------- ref ---------- */
  const rootRef = useRef(null)
  const stickyRef = useRef(null)
  const filterSheetRef = useRef(null)
  const remarkDialogRef = useRef(null)
  const scrollTargetRef = useRef(null) // 필터 선택 후 스크롤할 폴더 id
  const requestRef = useRef(0) // 오래된 응답 무시용 토큰

  /* ---------- 파생 값 ---------- */
  /** 현재 탭 메타 (id, label, base 경로) */
  const activeTabMeta = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) || FALLBACK_TAB,
    [tabs, activeTab]
  )
  /** 요약 영역에 표시할 탭 이름 */
  const activeTabLabel = activeTabMeta.label || '목록'

  /** 필터로 고른 폴더 */
  const activeFolder = useMemo(
    () => (activeFolderId ? folders.find((folder) => folder.id === activeFolderId) : null),
    [folders, activeFolderId]
  )
  /** 필터로 고른 화면명(번호 접두 제거) — 예: 0. 로그인 → 로그인 */
  const filterSelectedLabel = activeFolder
    ? String(activeFolder.name || '').replace(/^\d+\.\s*/, '')
    : ''
  /** 필터로 고른 폴더의 하위 화면(2뎁스) 목록 */
  const activeFolderScreens = (activeFolder && activeFolder.screens) || []

  /** 검색어로 필터된 폴더 */
  const visibleFolders = useMemo(
    () => filterFolders(folders, query, searchCategory),
    [folders, query, searchCategory]
  )
  /** 목록에 실제로 그릴 폴더 (activeFolderId 가 있으면 해당 폴더만) */
  const displayFolders = useMemo(
    () => (activeFolderId
      ? visibleFolders.filter((folder) => folder.id === activeFolderId)
      : visibleFolders),
    [visibleFolders, activeFolderId]
  )

  /** 하나라도 펼쳐져 있으면 true (모두 접기/펼치기 스위치) */
  const hasExpanded = Object.keys(expanded).some((id) => !!expanded[id])

  /** 현재 탭 전체 화면(2뎁스) flat 목록 — 진행률·통계용 */
  const allScreens = useMemo(
    () => folders.flatMap((folder) => folder.screens || []),
    [folders]
  )
  /** 전체 화면 진행률 평균(%) */
  const overallProgress = useMemo(() => {
    if (!allScreens.length) return 0
    const sum = allScreens.reduce((acc, screen) => acc + (screen.progress || 0), 0)
    return Math.round(sum / allScreens.length)
  }, [allScreens])
  /** 상태별 건수 (전체/완료/진행중/대기/지연) */
  const statusStats = useMemo(() => {
    const counts = { done: 0, active: 0, pending: 0, delayed: 0 }
    allScreens.forEach((screen) => {
      if (counts[screen.status] !== undefined) counts[screen.status] += 1
    })
    return [
      { key: 'all', label: '전체', count: allScreens.length },
      { key: 'done', label: '완료', count: counts.done },
      { key: 'active', label: '진행중', count: counts.active },
      { key: 'pending', label: '대기', count: counts.pending },
      { key: 'delayed', label: '지연', count: counts.delayed }
    ]
  }, [allScreens])

  /** 검색 카테고리에 맞는 input placeholder */
  const searchPlaceholder = SEARCH_PLACEHOLDERS[searchCategory] || SEARCH_PLACEHOLDERS.all

  /* ---------- 데이터 로드 ---------- */
  /** 탭 하나의 폴더·화면 JSON 로드 (tabMeta: { id, base }) */
  function loadTabData (tabMeta) {
    const token = ++requestRef.current
    const base = tabMeta.base || (tabMeta.id + '/')

    setLoading(true)
    setError('')
    setFolders([])
    setActiveFolderId(null)
    setFilterSheetOpen(false)

    fetchTabFolders(base).then(
      (list) => {
        if (token !== requestRef.current) return // 더 새로운 요청이 있음
        setFolders(list)
        setExpanded({})
        setLoading(false) // ← 스켈레톤 종료 시점
      },
      (err) => {
        if (token !== requestRef.current) return
        setError(err.message || '화면 JSON을 불러오지 못했습니다.')
        setFolders([])
        setLoading(false)
      }
    )
  }

  // 최초 진입: index.json → 프로젝트/탭 설정 후 첫 탭 데이터 로드
  useEffect(() => {
    const token = ++requestRef.current
    setLoading(true)
    setError('')

    fetchJson(INDEX_URL).then(
      (data) => {
        if (token !== requestRef.current) return
        const project = (data && data.project) || {}

        // 프로젝트명·설명·탭 목록 반영
        if (project.name) setProjectName(project.name)
        if (project.description) setProjectDesc(project.description)
        const nextTabs = data && data.tabs && data.tabs.length ? data.tabs : DEFAULT_TABS
        setTabs(nextTabs)

        // 첫 탭 선택 후 해당 탭 폴더 JSON 로드
        const first = nextTabs[0] || FALLBACK_TAB
        setActiveTab(first.id || 'pc')
        loadTabData(first)
      },
      (err) => {
        if (token !== requestRef.current) return
        setLoading(false)
        setError(err.message)
      }
    )

    // 언마운트(또는 StrictMode 재실행) 시 진행 중인 응답 무시
    return () => { requestRef.current += 1 }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------- 레이아웃 계산 ---------- */
  /**
   * 목록 영역 max-height 갱신
   * - 기본(전체·검색 없음): 접힌 1뎁스가 모두 보이는 높이
   * - 검색 중 또는 화면명 필터 선택: 제한 해제(none) → 내용 전부 표시
   * - --wbs-sticky-offset: 탭+검색 sticky 바 높이
   * - --wbs-thead-height: 테이블 헤더 높이 (1뎁스 행 sticky top)
   */
  function updateTableMaxHeight () {
    const root = rootRef.current
    if (!root) return

    const sticky = stickyRef.current
    const headEl = root.querySelector('.wbs-table__head')
    const headH = headEl ? headEl.offsetHeight : 33

    // 탭 바 오프셋
    if (sticky) {
      root.style.setProperty('--wbs-sticky-offset', sticky.offsetHeight + 'px')
    }
    // 1뎁스(현재 화면명) 행이 헤더 바로 아래에 붙도록
    root.style.setProperty('--wbs-thead-height', headH + 'px')

    const isFiltered = !!(query && String(query).trim()) || !!activeFolderId
    if (isFiltered) {
      root.style.setProperty('--wbs-table-max', 'none')
      return
    }

    // 접힌 1뎁스 기준: 헤더 높이 + (행 높이 × 폴더 수)
    const count = displayFolders.length
    const rowEl = root.querySelector('.wbs-table__row.level-0')
    const rowH = rowEl ? rowEl.offsetHeight : 36
    const collapsedH = Math.max(headH + count * rowH, 120)
    root.style.setProperty('--wbs-table-max', Math.ceil(collapsedH) + 'px')
  }

  // 검색·탭·필터·폴더 변경 시 DOM 반영 직후 높이 재계산
  useLayoutEffect(() => {
    updateTableMaxHeight()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, folders, displayFolders, activeFolderId, query, activeTab])

  // 리사이즈에도 재계산 (최신 클로저를 쓰도록 매 렌더 갱신되는 ref 경유)
  const updateRef = useRef(updateTableMaxHeight)
  updateRef.current = updateTableMaxHeight
  useEffect(() => {
    const onResize = () => updateRef.current()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // 필터 선택 후 해당 폴더 행으로 스크롤 (렌더 완료 뒤 1회)
  useEffect(() => {
    const id = scrollTargetRef.current
    if (!id) return
    scrollTargetRef.current = null
    const el = document.getElementById('wbs-folder-' + id)
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  })

  // 다이얼로그 열릴 때 포커스 (Esc 등)
  useEffect(() => {
    if (filterSheetOpen && filterSheetRef.current) filterSheetRef.current.focus()
  }, [filterSheetOpen])
  useEffect(() => {
    if (remarkModal.open && remarkDialogRef.current) remarkDialogRef.current.focus()
  }, [remarkModal.open])

  /* ---------- 핸들러 ---------- */
  /** 퍼블리시 탭 전환 (검색·펼침·필터 초기화) */
  function selectTab (tabId) {
    if (activeTab === tabId) return
    setActiveTab(tabId)
    setSearchInput('')
    setQuery('')
    setExpanded({})
    setActiveFolderId(null)
    setFilterSheetOpen(false)
    loadTabData(tabs.find((tab) => tab.id === tabId) || { id: tabId })
  }

  /** Enter: 검색 적용 (결과 폴더는 자동 펼침) */
  function applySearch () {
    const nextQuery = (searchInput || '').trim()
    setQuery(nextQuery)
    if (!nextQuery) return
    const matched = filterFolders(folders, nextQuery, searchCategory)
    setExpanded((prev) => {
      const next = { ...prev }
      matched.forEach((folder) => { next[folder.id] = true })
      return next
    })
  }

  /** 검색어 초기화 */
  function clearSearch () {
    setSearchInput('')
    setQuery('')
  }

  /** 모두 펼치기/접기 스위치 */
  function onExpandSwitch (checked) {
    if (checked) {
      setExpanded((prev) => {
        const next = { ...prev }
        folders.forEach((folder) => { next[folder.id] = true })
        return next
      })
    } else {
      setExpanded({})
    }
  }

  /** 1뎁스 폴더 +/- 토글 */
  function toggleFolder (folderId) {
    setExpanded((prev) => ({ ...prev, [folderId]: !prev[folderId] }))
  }

  const isExpanded = (folderId) => !!expanded[folderId]

  /**
   * 화면명 필터 적용
   * - folderId: 해당 폴더만 표시 + 펼침
   * - null(전체): 필터 해제 + 모두 접기
   */
  function selectFolder (folderId) {
    setActiveFolderId(folderId || null)
    if (folderId) {
      setExpanded((prev) => ({ ...prev, [folderId]: true }))
    } else {
      setExpanded({})
    }
    // 특정 폴더면 렌더 후 해당 행으로 스크롤
    scrollTargetRef.current = folderId || null
  }

  /** 버텀시트에서 화면명(폴더) 선택 → 적용 후 시트 닫기 */
  function pickFilterFolder (folderId) {
    selectFolder(folderId)
    setFilterSheetOpen(false)
  }

  /** 비고 히스토리 모달 열기 (최신순) */
  function openRemarkModal (screen) {
    // 비고 없으면 모달 열지 않음
    if (!screen || !remarkHasContent(screen.remark)) return
    setRemarkModal({
      open: true,
      screenName: screen.screenName || '',
      screenId: screen.screenId || '',
      items: remarkItems(screen.remark).slice().reverse()
    })
  }

  const closeRemarkModal = () => setRemarkModal(EMPTY_REMARK_MODAL)
  const closeFilterSheet = () => setFilterSheetOpen(false)

  /* ---------- 렌더 ---------- */
  function renderMain () {
    return (
      <>
        {/* 히어로: 프로젝트명·설명 */}
        <header className="wbs-hero">
          <p className="wbs-eyebrow">Publishing List</p>
          <h1 className="wbs-title">{projectName}</h1>
          <p className="wbs-desc">{projectDesc}</p>

          {/* 전체 진행률·상태 통계 (SHOW_PROGRESS_META: false 면 숨김) */}
          {SHOW_PROGRESS_META && (
            <div className="wbs-summary">
              {/* 진행률 숫자 + 현재 탭 태그 */}
              <div className="wbs-summary-main">
                <span className="wbs-summary-label">
                  전체 진행률{' '}
                  <span className="wbs-tag is-primary">{activeTabLabel}</span>
                </span>
                <strong className="wbs-summary-value">{overallProgress}%</strong>
              </div>
              {/* 진행률 바 */}
              <div
                className="wbs-progress"
                role="progressbar"
                aria-valuenow={overallProgress}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="전체 진행률"
              >
                <span className="wbs-progress__bar" style={{ width: overallProgress + '%' }} />
              </div>
              {/* 상태별 건수 (전체/완료/진행중/대기/지연) */}
              <ul className="wbs-stats">
                {statusStats.map((stat) => (
                  <li key={stat.key}>
                    <span
                      className={cx('wbs-badge is-dot', 'is-' + statusColor(stat.key))}
                      aria-label={stat.label}
                    />{' '}
                    {stat.label} {stat.count}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* sticky: 탭 + 검색 고정 (화면명 레이블·테이블은 스크롤) */}
        <div ref={stickyRef} className="wbs-sticky">
          <div className="wbs-tabs-bar" role="tablist" aria-label="퍼블리시 탭">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={cx('wbs-tab', { 'is-active': activeTab === tab.id })}
                role="tab"
                aria-selected={activeTab === tab.id ? 'true' : 'false'}
                onClick={() => selectTab(tab.id)}
              >{tab.label}</button>
            ))}
          </div>

          {/* 검색 / 모두 펼치기·접기 */}
          <div className="wbs-panel-head">
            <div className="wbs-search">
              <label className="wbs-search-label" htmlFor="wbs-search-category">검색 카테고리</label>
              <select
                id="wbs-search-category"
                className="wbs-select"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                {SEARCH_CATEGORIES.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <label className="wbs-search-label" htmlFor="wbs-search-input">검색</label>
              <div className="wbs-search-field">
                <input
                  id="wbs-search-input"
                  className="wbs-input"
                  type="search"
                  value={searchInput}
                  placeholder={searchPlaceholder}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      applySearch()
                    }
                  }}
                />
                {searchInput && (
                  <button
                    type="button"
                    className="wbs-input-clear"
                    aria-label="검색어 지우기"
                    onClick={clearSearch}
                  >×</button>
                )}
              </div>
            </div>
            <div className="wbs-actions">
              <label className="wbs-switch">
                <input
                  type="checkbox"
                  checked={hasExpanded}
                  onChange={(e) => onExpandSwitch(e.target.checked)}
                />
                <span className="wbs-switch__ui" aria-hidden="true" />
                <span className="wbs-switch__label">{hasExpanded ? '모두 접기' : '모두 펼치기'}</span>
              </label>
            </div>
          </div>
        </div>

        {/* 필터: 버튼 + 선택 폴더의 하위 화면 칩 */}
        {folders.length > 0 && (
          <div className="wbs-filter-bar">
            <button
              type="button"
              className={cx('wbs-filter-btn', { 'is-active': !!activeFolderId })}
              aria-expanded={filterSheetOpen ? 'true' : 'false'}
              aria-haspopup="dialog"
              aria-label={activeFolderId ? ('필터, ' + filterSelectedLabel) : '필터'}
              onClick={() => setFilterSheetOpen(true)}
            >
              <span className="wbs-filter-btn__label">{filterSelectedLabel || '필터'}</span>
              <span className="wbs-filter-btn__icon" aria-hidden="true">▾</span>
            </button>
            {/* 필터 | 하위 목록 */}
            {activeFolderScreens.length > 0 && (
              <div className="wbs-filter-selected">
                <span className="wbs-filter-selected__sep" aria-hidden="true" />
                <ul className="wbs-filter-subs" aria-label="선택한 화면명 하위 목록">
                  {activeFolderScreens.map((screen, idx) => (
                    <li key={(screen.screenId || screen.screenName || idx) + '-sub'}>
                      {screen.pageUrl
                        ? (
                          <a
                            className="wbs-filter-sub"
                            href={screen.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >{screen.screenName}</a>
                        )
                        : <span className="wbs-filter-sub is-static">{screen.screenName}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 목록 패널: 테이블 */}
        <section className="wbs-panel" aria-label="퍼블리시 화면 목록">
          {/* 화면 목록 테이블 (가로·세로 스크롤) */}
          <div className="wbs-table-wrap">
            <div
              className={cx('wbs-table', { 'is-progress-hidden': !SHOW_PROGRESS_META })}
              role="table"
              aria-label="화면 목록"
            >
              {/* 테이블 헤더 행 */}
              <div className="wbs-table__head" role="row">
                {VISIBLE_COLUMNS.map((col) => (
                  <div key={col.key} className={'col-' + col.key} role="columnheader">{col.label}</div>
                ))}
              </div>

              {/* 폴더(1뎁스) + 화면(2뎁스) 목록 */}
              {displayFolders.length
                ? (
                  <ul className="wbs-table__list">
                    {displayFolders.map(renderFolder)}
                  </ul>
                )
                : <div className="wbs-empty">검색 결과가 없습니다.</div>}
            </div>
          </div>
        </section>
      </>
    )
  }

  /** 1뎁스 폴더 행 + 2뎁스 화면 행 */
  function renderFolder (folder) {
    const open = isExpanded(folder.id)

    return (
      <li
        key={folder.id}
        id={'wbs-folder-' + folder.id}
        className="wbs-table__group"
      >
        {/* 1뎁스: 폴더 행 (클릭 시 펼침/접힘, 화면명 열 sticky) */}
        <div
          className={cx('wbs-table__row level-0', 'status-' + (folder.status || 'pending'))}
          role="row"
        >
          {/* 화면명 (폴더) — 클릭 시 펼침/접힘, 가로 스크롤 시 sticky */}
          <div className="col-name" role="cell">
            <span className="name">
              <button
                type="button"
                className="toggle"
                aria-label={open ? '폴더 접기' : '폴더 펼치기'}
                aria-expanded={open ? 'true' : 'false'}
                onClick={() => toggleFolder(folder.id)}
              >{open ? '−' : '+'}</button>
              <button
                type="button"
                className="folder-name"
                aria-expanded={open ? 'true' : 'false'}
                onClick={() => toggleFolder(folder.id)}
              >
                {folder.name}{' '}
                <span className="folder-count">({folder.screens.length})</span>
              </button>
            </span>
          </div>
          {/* 나머지 컬럼은 빈 셀 */}
          {VISIBLE_COLUMNS.filter((col) => col.key !== 'name').map((col) => (
            <div key={col.key} className={'col-' + col.key} role="cell" />
          ))}
        </div>

        {/* 2뎁스: 폴더 하위 화면 행 */}
        <ul className="wbs-table__screens" style={open ? undefined : { display: 'none' }}>
          {folder.screens.map((screen, idx) => renderScreenRow(folder, screen, idx))}
        </ul>
      </li>
    )
  }

  function renderScreenRow (folder, screen, idx) {
    const items = remarkItems(screen.remark)

    return (
      <li
        key={folder.id + '-' + screen.screenId + '-' + idx}
        className={cx('wbs-table__row level-1', 'status-' + (screen.status || 'pending'))}
        role="row"
      >
        {/* 화면명 */}
        <div className="col-name" role="cell">
          <span className="name name--child">
            <span className="toggle-spacer" />
            {screen.pageUrl
              ? (
                <a
                  className="wbs-link"
                  href={screen.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >{screen.screenName}</a>
              )
              : screen.screenName}
          </span>
        </div>
        {/* Screen Type */}
        <div className="col-type" role="cell">
          <span className="wbs-tag is-muted">{screen.screenType || '-'}</span>
        </div>
        {/* Screen ID */}
        <div className="col-id" role="cell">
          <code>{screen.screenId || '-'}</code>
        </div>
        {/* PageUrl */}
        <div className="col-pageurl" role="cell">
          <PathLinkCell href={screen.pageUrl} />
        </div>
        {/* File Path */}
        <div className="col-path" role="cell">
          {screen.filePath
            ? <code title={screen.filePath}>{screen.filePath}</code>
            : <span className="path-empty">-</span>}
        </div>
        {/* 담당자 */}
        <div className="col-owner" role="cell">{screen.owner || '-'}</div>
        {SHOW_PROGRESS_META && (
          <>
            <div className="col-start" role="cell">{screen.start || '-'}</div>
            <div className="col-expected" role="cell">{screen.expected || '-'}</div>
            <div className="col-end" role="cell">{screen.end || '-'}</div>
            <div className="col-status" role="cell">
              <span className={cx('wbs-badge', 'is-' + statusColor(screen.status))}>
                {statusLabel(screen.status)}
              </span>
            </div>
            <div className="col-progress" role="cell">
              <span className="pct">{screen.progress || 0}%</span>
            </div>
          </>
        )}
        {/* 기획 */}
        <div className="col-planning" role="cell">
          <PathLinkCell href={screen.planning} />
        </div>
        {/* 디자인 */}
        <div className="col-design" role="cell">
          <PathLinkCell href={screen.design} />
        </div>
        {/* 비고 (내용 있을 때만 클릭 → 상세 모달) */}
        <div className="col-remark" role="cell">
          {items.length > 0
            ? (
              <button
                type="button"
                className="remark-trigger"
                onClick={() => openRemarkModal(screen)}
              >
                <span className="remark-preview">{remarkPreview(screen.remark)}</span>
                {items.length > 1 && (
                  <span className="wbs-badge is-muted is-count">+{items.length - 1}</span>
                )}
              </button>
            )
            : <span className="path-empty">-</span>}
        </div>
      </li>
    )
  }

  return (
    <div ref={rootRef} className="wbs">
      {/* ===== 1) 로딩 / 2) 에러 / 3) 정상 ===== */}
      {loading
        ? <PubIndexSkeleton />
        : error
          ? (
            <div className="wbs-state wbs-alert" role="alert">
              {/* 에러 메시지 문구 */}
              <p className="wbs-alert__title">{error}</p>
              {/* 현재 탭 데이터 재요청 */}
              <button type="button" className="wbs-btn" onClick={() => loadTabData(activeTabMeta)}>
                다시 시도
              </button>
            </div>
          )
          : renderMain()}

      {/* ===== 4) 화면명 필터 버텀시트 ===== */}
      {filterSheetOpen && (
        <div
          className="wbs-bottom-sheet"
          onKeyDown={(e) => { if (e.key === 'Escape') closeFilterSheet() }}
        >
          <div className="wbs-bottom-sheet__backdrop" onClick={closeFilterSheet} />
          <div
            ref={filterSheetRef}
            className="wbs-bottom-sheet__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="wbs-filter-sheet-title"
            tabIndex={-1}
          >
            <header className="wbs-bottom-sheet__header">
              <div className="wbs-bottom-sheet__handle" aria-hidden="true" />
              <h2 id="wbs-filter-sheet-title" className="wbs-bottom-sheet__title">화면명 필터</h2>
              <button
                type="button"
                className="wbs-btn is-ghost wbs-bottom-sheet__close"
                aria-label="닫기"
                onClick={closeFilterSheet}
              >×</button>
            </header>
            <ul className="wbs-bottom-sheet__list" role="listbox" aria-label="화면명 목록">
              <li role="option" aria-selected={!activeFolderId ? 'true' : 'false'}>
                <button
                  type="button"
                  className={cx('wbs-bottom-sheet__item', { 'is-active': !activeFolderId })}
                  onClick={() => pickFilterFolder(null)}
                >
                  <span>전체</span>
                  <span className="wbs-bottom-sheet__count">{folders.length}</span>
                </button>
              </li>
              {folders.map((folder) => (
                <li
                  key={'filter-' + folder.id}
                  role="option"
                  aria-selected={activeFolderId === folder.id ? 'true' : 'false'}
                >
                  <button
                    type="button"
                    className={cx('wbs-bottom-sheet__item', { 'is-active': activeFolderId === folder.id })}
                    onClick={() => pickFilterFolder(folder.id)}
                  >
                    <span>{folder.name}</span>
                    <span className="wbs-bottom-sheet__count">{(folder.screens || []).length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ===== 5) 비고 상세 모달 (내용 있는 비고 클릭 시) ===== */}
      {remarkModal.open && (
        <div
          className="remark-modal"
          onKeyDown={(e) => { if (e.key === 'Escape') closeRemarkModal() }}
        >
          {/* 모달 배경(클릭 시 닫기) */}
          <div className="remark-modal__backdrop" onClick={closeRemarkModal} />
          {/* 모달 다이얼로그 */}
          <div
            ref={remarkDialogRef}
            className="remark-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="remark-modal-title"
            tabIndex={-1}
          >
            {/* 모달 헤더: 화면명·Screen ID·닫기 */}
            <header className="remark-modal__header">
              <div>
                <p className="remark-modal__eyebrow">비고 히스토리</p>
                <h2 id="remark-modal-title" className="remark-modal__title">
                  {remarkModal.screenName || '상세'}
                </h2>
                {remarkModal.screenId && (
                  <p className="remark-modal__meta">{remarkModal.screenId}</p>
                )}
              </div>
              <button
                type="button"
                className="wbs-btn is-ghost remark-modal__close"
                aria-label="닫기"
                onClick={closeRemarkModal}
              >×</button>
            </header>
            {/* 모달 본문: 비고 히스토리 목록 */}
            <div className="remark-modal__body">
              {remarkModal.items.length
                ? (
                  <ul className="remark-history">
                    {remarkModal.items.map((item, index) => (
                      <li key={index} className="remark-history__item">
                        {/* 날짜·작성자 */}
                        <div className="remark-history__head">
                          <span className="remark-history__date">{item.date || '-'}</span>
                          {item.author && (
                            <span className="remark-history__author">{item.author}</span>
                          )}
                        </div>
                        {/* 비고 본문 */}
                        <p className="remark-history__text">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                )
                : <div className="remark-modal__empty">등록된 비고 내역이 없습니다.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
