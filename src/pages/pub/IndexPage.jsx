'use client'

/**
 * PubIndex
 * - JSON 기반 퍼블리시 화면 목록 (탭 / 화면명 필터 / 검색 / 폴더 펼침)
 * - 스타일: wbs-* (pages/pub → pub.scss) / 언어: AppLayout 전역 번역
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AutoSkeleton } from '@/comp'
import {
  FilterSheet,
  FolderFilterBar,
  PubHeader,
  folderFilterLabel,
  folderLabel,
  remarkHasContent,
  remarkItems,
  remarkSearchText,
  itemLabel,
  typeLabel,
  statusLabel,
  tabLabel,
  ProgressSummary,
  PubError,
  PubIndexSkeleton,
  PubSearchBar,
  PubTable,
  PubTabs,
  RemarkModal,
  collectExpandKeys,
  collectLeaves,
  countLeaves,
  filterDepthTree,
  linkFieldSearchText
} from './widgets/list'
import { resolveSkeletonMode } from '@/config/skeleton'
import { useSiteTitle } from '@/lib/siteTitle'

/** 스켈레톤 설정 키 — 디자인 확정 시 src/config/skeleton.ts 에 'pub/index': 'manual' */
const PUB_SKELETON_ID = 'pub/index'

/* ------------------------------------------------------------------ */
/* 상수                                                                */
/* ------------------------------------------------------------------ */

// 프로젝트 메타·탭 목록
const INDEX_URL = '/data/pub/index.json'
// 탭별 폴더·화면 JSON 루트
const DATA_BASE = '/data/pub/'

// index.json 이 덮어쓸 수 있는 기본 탭
const DEFAULT_TABS = [
  { id: 'b2b', label: 'B2B', base: 'b2b/' },
  { id: 'web', label: 'WEB', base: 'web/' },
  { id: 'mobile', label: 'MOBILE', base: 'mobile/' }
]

/** 화면 목록이 아닌 예전 가이드 탭. 컴포넌트 가이드 페이지로 대신한다 */
const LEGACY_GUIDE_TABS = new Set(['pc-guide', 'mobile-guide'])
/** 탭 목록이 비었을 때 쓰는 첫 탭 */
const FALLBACK_TAB = DEFAULT_TABS[0]

/** 프로젝트 이름이 없을 때 탭 제목 */
const DEFAULT_PROJECT_NAME = 'Publish List'
/** 프로젝트 설명이 없을 때 기본 문구 */
const DEFAULT_PROJECT_DESC = 'WEB / MOBILE 화면 퍼블리시 목록과 컴포넌트 가이드를 확인합니다.'

/** 검색 범위. all 은 전체, 나머지는 열/필드 이름 */
const SEARCH_CATEGORIES = [
  { value: 'all', label: '전체', placeholder: '화면명, 화면 유형, 화면 ID, PageUrl, 파일 경로, 담당자, 시작일, 예상일, 종료일, 상태, 기획, 디자인, 비고로 검색' },
  { value: 'name', label: '화면명', placeholder: '화면명 검색' },
  { value: 'type', label: '화면 유형', placeholder: '화면 유형 검색' },
  { value: 'id', label: '화면 ID', placeholder: '화면 ID 검색' },
  { value: 'pageUrl', label: 'PageUrl', placeholder: 'PageUrl 검색' },
  { value: 'filePath', label: '파일 경로', placeholder: '파일 경로 검색' },
  { value: 'owner', label: '담당자', placeholder: '담당자 검색' },
  { value: 'start', label: '시작일', placeholder: '시작일 검색' },
  { value: 'expected', label: '예상일', placeholder: '예상일 검색' },
  { value: 'end', label: '종료일', placeholder: '종료일 검색' },
  { value: 'status', label: '상태', placeholder: '상태 검색 (완료, 진행중, 대기, 지연)' },
  { value: 'planning', label: '기획', placeholder: '기획 검색 (예: 피그마)' },
  { value: 'design', label: '디자인', placeholder: '디자인 검색 (예: 피그마)' },
  { value: 'remark', label: '비고', placeholder: '비고 검색' }
]

// 테이블 컬럼 (progress: showProgressMeta 일 때만 노출)
const COLUMN_DEFS = [
  { key: 'name', label: '화면명' },
  { key: 'type', label: '화면 유형' },
  { key: 'id', label: '화면 ID' },
  { key: 'pageurl', label: 'PageUrl' },
  { key: 'path', label: '파일 경로' },
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

/**
 * 진행·일정·상태 표시 여부
 * - true: 전체 진행률 + 시작일/예상일/종료일/상태/진행률 컬럼 표시
 * - false: 프로젝트 완료 후 숨김
 */
const SHOW_PROGRESS_META = true

/**
 * 퍼블리시 탭(B2B/WEB/MOBILE) UI 표시 여부
 * - true: index.json tabs 그대로 탭 전환
 * - false: 탭 UI 숨김, LOCKED_TAB_ID(또는 tabs[0]) 만 사용
 *   JSON tabs 는 수정하지 않고 페이지에서만 잠근다
 */
const SHOW_PUB_TABS = false

/**
 * SHOW_PUB_TABS 가 false 일 때 고정할 탭 id
 * - 빈 문자열: index.json tabs 의 첫 항목
 * - 예: 'web' | 'mobile' | 'b2b'
 */
const LOCKED_TAB_ID = ''

// 로딩 스켈레톤 1뎁스 행 수
const SKELETON_ROW_COUNT = 10

/** 비고 창을 닫았을 때의 빈 값 */
const EMPTY_REMARK_MODAL = { open: false, itemName: '', itemId: '', items: [] }

/* ------------------------------------------------------------------ */
/* 순수 헬퍼                                                           */
/* ------------------------------------------------------------------ */

/** JSON 로드. 실패 시 Error 를 throw */
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
  // 예: web/ → /data/pub/web/index.json
  const data = await fetchJson(DATA_BASE + base + 'index.json')
  /** 이 탭의 폴더 목록. 없으면 빈 배열 */
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
          excludeFromStats: !!(payload.excludeFromStats || meta.excludeFromStats),
          depth2: payload.depth2 || []
        }
        : null
    ))
  }))

  return payloads.filter(Boolean)
}

/** 검색용: 원문 + 번역 라벨을 함께 담아 언어 전환 후에도 검색되게 */
const searchBlob = (...parts) =>
  parts.filter((part) => part != null && String(part).trim() !== '').join(' ')

/** depth 리프 1건이 검색어·카테고리에 맞는지 */
function itemMatches (folder, item, q, category) {
  const nameText = itemLabel(folder, item)
  const typeText = typeLabel(item.type)
  const statusText = statusLabel(item.status)
  // 검색 대상 필드를 문자열로 모음 (원문·번역 모두 포함)
  const fields = {
    name: searchBlob(item.name, nameText),
    type: searchBlob(item.type, typeText),
    id: String(item.id || ''),
    pageUrl: String(item.pageUrl || ''),
    filePath: String(item.filePath || ''),
    owner: String(item.owner || ''),
    start: String(item.start || ''),
    expected: String(item.expected || ''),
    end: String(item.end || ''),
    status: searchBlob(item.status, statusText),
    planning: linkFieldSearchText(item.planning),
    design: linkFieldSearchText(item.design),
    remark: remarkSearchText(item.remark)
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
 * - 폴더명 매칭 시 하위(depth2·depth3) 전부
 * - 아니면 Depth2 그룹 / Depth3 리프 트리를 재귀 필터
 */
function filterFolders (folders, query, category) {
  /** 비교용 검색어. 대소문자를 무시 */
  const q = (query || '').toLowerCase()
  if (!q) return folders

  return folders
    .map((folder) => {
      const name = folderLabel(folder)
      // 폴더명 자체 매칭 여부 (전체/이름 카테고리일 때만)
      const folderHit = category === 'all' || category === 'name'
        ? searchBlob(folder.name, name).toLowerCase().indexOf(q) !== -1
        : false

      return {
        id: folder.id,
        name: folder.name,
        filePath: folder.filePath,
        excludeFromStats: !!folder.excludeFromStats,
        depth2: filterDepthTree(
          folder.depth2 || [],
          folder,
          q,
          category,
          folderHit,
          itemMatches
        )
      }
    })
    // 검색 중이면 최종 리프가 1개 이상인 폴더만
    .filter((folder) => countLeaves(folder) > 0)
}

/* ------------------------------------------------------------------ */
/* 메인 컴포넌트                                                       */
/* ------------------------------------------------------------------ */

export default function PubIndex () {
  useSiteTitle()

  /* ---------- 상태 ---------- */
  const [loading, setLoading] = useState(true) // 최초·탭 전환 로딩
  const [error, setError] = useState('') // 로드 실패 메시지
  const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME)
  const [projectDesc, setProjectDesc] = useState(DEFAULT_PROJECT_DESC)
  const [descFromJson, setDescFromJson] = useState(false)
  const [tabs, setTabs] = useState(DEFAULT_TABS)
  const [activeTab, setActiveTab] = useState('b2b') // 현재 퍼블리시 탭 id
  const [folders, setFolders] = useState([]) // 현재 탭의 1뎁스 폴더(+depth2)
  const [expanded, setExpanded] = useState({}) // { [folderId|folderId/groupId]: true } 펼침 여부
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
  const activeTabLabel = tabLabel(activeTabMeta)

  /** 필터로 고른 폴더 */
  const activeFolder = useMemo(
    () => (activeFolderId ? folders.find((folder) => folder.id === activeFolderId) : null),
    [folders, activeFolderId]
  )
  /** 필터로 고른 화면명(번호 접두 제거) — 예: 0. 로그인 → 로그인 */
  const filterSelectedLabel = activeFolder
    ? folderFilterLabel(activeFolder)
    : ''
  /** 필터로 고른 폴더의 최종 리프 목록 — 바로가기 칩 */
  const activeFolderLeaves = useMemo(
    () => (activeFolder ? collectLeaves(activeFolder) : []),
    [activeFolder]
  )

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

  /** 현재 탭 최종 리프 flat 목록 — 진행률·통계용 (excludeFromStats 폴더 제외) */
  const allLeaves = useMemo(
    () => folders
      .filter((folder) => !folder.excludeFromStats)
      .flatMap((folder) => collectLeaves(folder)),
    [folders]
  )
  /** 전체 진행률 평균(%) */
  const overallProgress = useMemo(() => {
    if (!allLeaves.length) return 0
    const sum = allLeaves.reduce((acc, item) => acc + (item.progress || 0), 0)
    return Math.round(sum / allLeaves.length)
  }, [allLeaves])
  /** 상태별 건수 (전체/완료/진행중/대기/지연) */
  const statusStats = useMemo(() => {
    const counts = { done: 0, active: 0, pending: 0, delayed: 0 }
    allLeaves.forEach((item) => {
      if (counts[item.status] !== undefined) counts[item.status] += 1
    })
    return [
      { key: 'all', label: '전체', count: allLeaves.length },
      { key: 'done', label: '완료', count: counts.done },
      { key: 'active', label: '진행중', count: counts.active },
      { key: 'pending', label: '대기', count: counts.pending },
      { key: 'delayed', label: '지연', count: counts.delayed }
    ]
  }, [allLeaves])

  const searchCategories = useMemo(
    () => SEARCH_CATEGORIES.map(({ value, label }) => ({ value, label })),
    []
  )

  const visibleColumns = useMemo(
    () => COLUMN_DEFS.filter((col) => !col.progress || SHOW_PROGRESS_META),
    []
  )

  /** 검색 카테고리에 맞는 input placeholder */
  const searchPlaceholder = (
    SEARCH_CATEGORIES.find((item) => item.value === searchCategory) ||
    SEARCH_CATEGORIES[0]
  ).placeholder

  // index.json 설명이 없을 때 기본 설명 유지
  useEffect(() => {
    if (!descFromJson) setProjectDesc(DEFAULT_PROJECT_DESC)
  }, [descFromJson])

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
        /** 목록 상단 프로젝트 이름·설명 */
        const project = (data && data.project) || {}

        // 프로젝트명·설명·탭 목록 반영
        // 설명이 기본 문구와 같으면 공통 문구로 둔다
        if (project.name) setProjectName(project.name)
        if (project.description && project.description !== DEFAULT_PROJECT_DESC) {
          setProjectDesc(project.description)
          setDescFromJson(true)
        } else {
          setDescFromJson(false)
          setProjectDesc(DEFAULT_PROJECT_DESC)
        }
        const loadedTabs = data && data.tabs && data.tabs.length ? data.tabs : DEFAULT_TABS
        const nextTabs = loadedTabs.filter((tab) => !LEGACY_GUIDE_TABS.has(tab.id))
        const resolvedTabs = nextTabs.length ? nextTabs : DEFAULT_TABS
        setTabs(resolvedTabs)

        // 탭 UI 숨김 시 LOCKED_TAB_ID(또는 첫 탭)만 로드, 표시 시에는 첫 탭
        const locked = !SHOW_PUB_TABS && LOCKED_TAB_ID
          ? resolvedTabs.find((tab) => tab.id === LOCKED_TAB_ID)
          : null
        const first = locked || resolvedTabs[0] || FALLBACK_TAB
        setActiveTab(first.id || 'web')
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
   * sticky 오프셋 갱신
   * - --wbs-sticky-offset: 탭+검색 sticky 바 높이
   * - --wbs-thead-height: 테이블 헤더 높이 (1뎁스 행 sticky top)
   * 목록 자체에는 높이 제한을 두지 않아 페이지 스크롤로만 본다.
   */
  function updateStickyOffsets () {
    const root = rootRef.current
    if (!root) return

    const sticky = stickyRef.current
    const headEl = root.querySelector('.wbs-table__head')
    const headH = headEl ? headEl.offsetHeight : 33

    if (sticky) {
      root.style.setProperty('--wbs-sticky-offset', sticky.offsetHeight + 'px')
    }
    root.style.setProperty('--wbs-thead-height', headH + 'px')
  }

  // 검색·탭·필터·폴더 변경 시 DOM 반영 직후 sticky 오프셋 재계산
  useLayoutEffect(() => {
    updateStickyOffsets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error, folders, displayFolders, activeFolderId, query, activeTab])

  // 리사이즈에도 재계산 (최신 클로저를 쓰도록 매 렌더 갱신되는 ref 경유)
  const updateRef = useRef(updateStickyOffsets)
  updateRef.current = updateStickyOffsets
  useEffect(() => {
    /** 창 크기가 바뀌면 sticky 오프셋을 다시 잰다 */
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

  /** Enter: 검색 적용 (결과 폴더·그룹은 자동 펼침) */
  function applySearch () {
    /** 입력칸의 앞뒤 공백을 뺀 검색어 */
    const nextQuery = (searchInput || '').trim()
    setQuery(nextQuery)
    if (!nextQuery) return
    const matched = filterFolders(folders, nextQuery, searchCategory)
    setExpanded((prev) => {
      const next = { ...prev }
      collectExpandKeys(matched).forEach((key) => { next[key] = true })
      return next
    })
  }

  /** 검색어 초기화 */
  function clearSearch () {
    setSearchInput('')
    setQuery('')
  }

  /** 모두 펼치기/접기 스위치 (Depth1 폴더 + Depth2 그룹) */
  function onExpandSwitch (checked) {
    if (checked) {
      setExpanded((prev) => {
        const next = { ...prev }
        collectExpandKeys(folders).forEach((key) => { next[key] = true })
        return next
      })
    } else {
      setExpanded({})
    }
  }

  /** 폴더·그룹 +/- 토글 (키: folderId 또는 folderId/groupId) */
  function toggleFolder (expandId) {
    setExpanded((prev) => ({ ...prev, [expandId]: !prev[expandId] }))
  }

  /** 해당 키가 펼쳐져 있는지 */
  const isExpanded = (expandId) => !!expanded[expandId]

  /**
   * 화면명 필터 적용
   * - folderId: 해당 폴더만 표시 + 폴더·하위 그룹 펼침
   * - null(전체): 필터 해제 + 모두 접기
   */
  function selectFolder (folderId) {
    setActiveFolderId(folderId || null)
    if (folderId) {
      const folder = folders.find((item) => item.id === folderId)
      setExpanded((prev) => {
        const next = { ...prev, [folderId]: true }
        if (folder) {
          collectExpandKeys([folder]).forEach((key) => { next[key] = true })
        }
        return next
      })
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
  function openRemarkModal (folder, item) {
    // 비고 없으면 모달 열지 않음
    if (!item || !remarkHasContent(item.remark)) return
    setRemarkModal({
      open: true,
      itemName: itemLabel(folder, item),
      itemId: item.id || '',
      items: remarkItems(item.remark).slice().reverse()
    })
  }

  /** 비고 창을 닫고 내용을 비운다 */
  const closeRemarkModal = () => setRemarkModal(EMPTY_REMARK_MODAL)
  /** 필터 시트를 닫는다 */
  const closeFilterSheet = () => setFilterSheetOpen(false)

  /* ---------- 렌더 ---------- */

  /** 데이터 로드 후 본문: 진행률 → 탭/검색(sticky) → 폴더 필터 → 화면 목록 */
  function renderMain () {
    return (
      <>
        {/* 상단 진행률 요약 (SHOW_PROGRESS_META 일 때만) */}
        <header className="wbs-hero">
          {SHOW_PROGRESS_META && (
            <ProgressSummary
              label="전체 진행률"
              tabLabel={activeTabLabel}
              progress={overallProgress}
              stats={statusStats}
            />
          )}
        </header>

        {/* 세로 스크롤 시 헤더 아래 고정: 탭(B2B/WEB/MOBILE) + 검색/펼침 */}
        <div ref={stickyRef} className="wbs-sticky">
          <PubTabs
            tabs={SHOW_PUB_TABS ? tabs : tabs.filter((tab) => tab.id === activeTab)}
            activeTab={activeTab}
            ariaLabel="퍼블리시 탭"
            labelOf={(tab) => tabLabel(tab)}
            onSelect={selectTab}
          />
          <PubSearchBar
            categoryLabel="검색 카테고리"
            category={searchCategory}
            categories={searchCategories}
            onCategory={setSearchCategory}
            searchLabel="검색"
            value={searchInput}
            placeholder={searchPlaceholder}
            onChange={setSearchInput}
            onSearch={applySearch}
            onClear={clearSearch}
            clearLabel="초기화"
            expanded={hasExpanded}
            expandLabel="모두 펼치기"
            collapseLabel="모두 접기"
            onExpand={onExpandSwitch}
          />
        </div>

        {/* 폴더 칩/시트 진입 — 목록이 있을 때만 */}
        {folders.length > 0 && (
          <FolderFilterBar
            active={!!activeFolderId}
            open={filterSheetOpen}
            label={filterSelectedLabel}
            filterLabel="필터"
            filterWithLabel={'필터, ' + filterSelectedLabel}
            subsAria="선택한 화면명 하위 목록"
            items={activeFolderLeaves}
            itemLabelOf={(item) => itemLabel(activeFolder, item)}
            onOpen={() => setFilterSheetOpen(true)}
          />
        )}

        {/* 폴더·화면 WBS 테이블 (가로 스크롤·비고 모달 트리거) */}
        <PubTable
          ariaLabel="퍼블리시 화면 목록"
          showProgress={SHOW_PROGRESS_META}
          columns={visibleColumns}
          folders={displayFolders}
          emptyLabel="검색 결과가 없습니다."
          isOpen={isExpanded}
          collapseLabel="폴더 접기"
          expandLabel="폴더 펼치기"
          onToggle={toggleFolder}
          onRemark={openRemarkModal}
        />
      </>
    )
  }

  const skeletonMode = resolveSkeletonMode(PUB_SKELETON_ID)

  /**
   * 본문 분기
   * - manual: 로딩→스켈레톤 / 오류→재시도 / 완료→renderMain
   * - auto: AutoSkeleton 이 로딩 중 fallback, 완료 후 본문
   */
  function renderBody () {
    const errorView = (
      <PubError
        message={error}
        retryLabel="다시 시도"
        onRetry={() => loadTabData(activeTabMeta)}
      />
    )

    // skeleton.ts 에 'pub/index': 'manual' 이면 수동 분기
    if (skeletonMode === 'manual') {
      if (loading) {
        return (
          <PubIndexSkeleton
            columns={COLUMN_DEFS}
            showProgress={SHOW_PROGRESS_META}
            rowCount={SKELETON_ROW_COUNT}
          />
        )
      }
      if (error) return errorView
      return renderMain()
    }

    if (error && !loading) return errorView

    // 기본(auto): 로딩 중 스켈레톤, 끝나면 목록
    return (
      <AutoSkeleton
        id={PUB_SKELETON_ID + ':' + activeTab}
        loading={loading}
        fallback={(
          <PubIndexSkeleton
            columns={COLUMN_DEFS}
            showProgress={SHOW_PROGRESS_META}
            rowCount={SKELETON_ROW_COUNT}
          />
        )}
      >
        {!loading && renderMain()}
      </AutoSkeleton>
    )
  }

  return (
    <div ref={rootRef} className="wbs">
      {/* pub 전용 헤더 (일반 페이지는 PageHeader / Header) */}
      <PubHeader projectName={projectName} />

      {/* 로딩 / 오류 / 목록 */}
      {renderBody()}

      {/* 폴더 선택 바텀시트 */}
      {filterSheetOpen && (
        <FilterSheet
          title="화면명 필터"
          ariaLabel="화면명 목록"
          closeLabel="닫기"
          allLabel="전체"
          folders={folders}
          activeId={activeFolderId}
          countOf={(folder) => countLeaves(folder)}
          labelOf={(folder) => folderLabel(folder)}
          onClose={closeFilterSheet}
          onPick={pickFilterFolder}
          panelRef={filterSheetRef}
        />
      )}

      {/* depth 항목 비고 히스토리 모달 */}
      {remarkModal.open && (
        <RemarkModal
          itemName={remarkModal.itemName}
          itemId={remarkModal.itemId}
          items={remarkModal.items}
          historyLabel="비고 히스토리"
          detailLabel="상세"
          closeLabel="닫기"
          emptyLabel="등록된 비고 내역이 없습니다."
          onClose={closeRemarkModal}
          dialogRef={remarkDialogRef}
        />
      )}
    </div>
  )
}
