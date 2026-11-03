/**
 * PC/MOBILE(및 가이드) 하위를 화면명(메뉴)별 JSON으로 분리 생성
 *
 * 구조:
 *   public/data/publish/index.json
 *   public/data/publish/pc/index.json
 *   public/data/publish/pc/login.json
 *   public/data/publish/mobile/...
 *
 * - count 필드 없음 (목록에서 screens.length)
 * - 화면 파일: src/pages/{pc|mobile}/{menuId}/숫자.vue
 * - 메뉴 메인: src/pages/{pc|mobile}/{menuId}/index.vue → #/{pc|mobile}/{menuId}
 *
 * 사용: node scripts/generate-publish-menus.js
 */
var fs = require('fs')
var path = require('path')

var menus = [
  { id: 'login', code: '0', name: '로그인' },
  { id: 'home', code: '1', name: 'Home' },
  { id: 'feed', code: '2', name: 'Feed' },
  { id: 'content', code: '3', name: 'Content' },
  { id: 'campus', code: '4', name: 'Campus' },
  { id: 'my-learning', code: '5', name: 'My Learning' },
  { id: 'feed-create', code: '6', name: '피드생성' },
  { id: 'learning-resource', code: '7', name: '학습자원' },
  { id: 'search', code: '8', name: '통합검색' },
  { id: 'course-apply', code: '', name: '수강신청' },
  { id: 'user-page', code: '9', name: '사용자 페이지' },
  { id: 'library-package', code: '10', name: '라이브러리패키지' },
  { id: 'payment', code: '13', name: '온라인결제' },
  { id: 'class', code: '15', name: 'Class' },
  { id: 'crowd-class', code: '16', name: 'Crowd Class' },
  { id: 'certification', code: '18', name: '자격인증' },
  { id: 'learning-materials', code: '19', name: '학습자료 전체보기' },
  { id: 'comment', code: '20', name: '댓글' },
  { id: 'college', code: '21', name: 'College' },
  { id: 'language', code: '26', name: 'Language' },
  { id: 'personal-home', code: '27', name: '개인화홈' },
  { id: 'common', code: '99', name: 'Common' },
  { id: 'board', code: '99', name: '게시판' },
  { id: 'customer-center', code: '99', name: '고객센터' },
  { id: 'dream-fund', code: '200', name: '꿈금고' },
  { id: 'consulting', code: '200', name: '상담시스템' }
]

var guideFolders = [
  {
    id: 'layout',
    name: '0. 레이아웃',
    screens: [
      { screenName: 'Container', screenId: 'G-LAY-001', pageUrl: '#/components/container', filePath: '@/pages/components/container.vue' },
      { screenName: 'Space', screenId: 'G-LAY-002', pageUrl: '#/components/space', filePath: '@/pages/components/space.vue' },
      { screenName: 'Divider', screenId: 'G-LAY-003', pageUrl: '#/components/divider', filePath: '@/pages/components/divider.vue' },
      { screenName: 'Flex', screenId: 'G-LAY-004', pageUrl: '#/components/flex', filePath: '@/pages/components/flex.vue' },
      { screenName: 'Grid', screenId: 'G-LAY-005', pageUrl: '#/components/grid', filePath: '@/pages/components/grid.vue' }
    ]
  },
  {
    id: 'basic',
    name: '1. 기본 요소',
    screens: [
      { screenName: 'Button', screenId: 'G-BAS-001', pageUrl: '#/components/button', filePath: '@/pages/components/button.vue' },
      { screenName: 'Typography', screenId: 'G-BAS-002', pageUrl: '#/components/typography', filePath: '@/pages/components/typography.vue' },
      { screenName: 'Link', screenId: 'G-BAS-003', pageUrl: '#/components/link', filePath: '@/pages/components/link.vue' },
      { screenName: 'Icon', screenId: 'G-BAS-004', pageUrl: '#/components/icon', filePath: '@/pages/components/icon.vue' }
    ]
  },
  {
    id: 'data',
    name: '2. 데이터 표시',
    screens: [
      { screenName: 'Badge', screenId: 'G-DAT-001', pageUrl: '#/components/badge', filePath: '@/pages/components/badge.vue' },
      { screenName: 'Tag', screenId: 'G-DAT-002', pageUrl: '#/components/tag', filePath: '@/pages/components/tag.vue' },
      { screenName: 'Card', screenId: 'G-DAT-003', pageUrl: '#/components/card', filePath: '@/pages/components/card.vue' }
    ]
  },
  {
    id: 'form',
    name: '3. 폼',
    screens: [
      { screenName: 'Input', screenId: 'G-FRM-001', pageUrl: '#/components/input', filePath: '@/pages/components/input.vue' },
      { screenName: 'Select', screenId: 'G-FRM-002', pageUrl: '#/components/select', filePath: '@/pages/components/select.vue' }
    ]
  },
  {
    id: 'feedback',
    name: '4. 피드백',
    screens: [
      { screenName: 'Alert', screenId: 'G-FBK-001', pageUrl: '#/components/alert', filePath: '@/pages/components/alert.vue' },
      { screenName: 'Progress', screenId: 'G-FBK-002', pageUrl: '#/components/progress', filePath: '@/pages/components/progress.vue' },
      { screenName: 'Empty', screenId: 'G-FBK-003', pageUrl: '#/components/empty', filePath: '@/pages/components/empty.vue' }
    ]
  },
  {
    id: 'navigation',
    name: '5. 네비게이션',
    screens: [
      { screenName: 'Breadcrumb', screenId: 'G-NAV-001', pageUrl: '#/components/breadcrumb', filePath: '@/pages/components/breadcrumb.vue' },
      { screenName: 'Tabs', screenId: 'G-NAV-002', pageUrl: '#/components/tabs', filePath: '@/pages/components/tabs.vue' }
    ]
  }
]

function mkdirp (dir) {
  var parts = path.resolve(dir).split(path.sep)
  var cur = parts[0] === '' ? path.sep : parts[0]
  for (var i = 1; i < parts.length; i++) {
    cur = path.join(cur, parts[i])
    if (!fs.existsSync(cur)) fs.mkdirSync(cur)
  }
}

function writeJson (filePath, data) {
  mkdirp(path.dirname(filePath))
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

function folderLabel (menu) {
  return menu.code ? (menu.code + '. ' + menu.name) : menu.name
}

function toPascal (id) {
  return id.split('-').map(function (p) {
    return p.charAt(0).toUpperCase() + p.slice(1)
  }).join('')
}

function pad (n, size) {
  var s = String(n)
  while (s.length < size) s = '0' + s
  return s
}

function listScreenFiles (device, menuId) {
  var dir = path.join(process.cwd(), 'src/pages', device, menuId)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(function (name) {
      return /^\d+\.vue$/.test(name)
    })
    .sort(function (a, b) {
      return parseInt(a, 10) - parseInt(b, 10)
    })
}

function escHtml (s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function menuShortName (folderName) {
  return String(folderName || '').replace(/^\d+\.\s*/, '')
}

/** skeleton/01Skeleton.vue 등 — 화면별 스켈레톤 (태그명은 Skeleton01) */
function stubScreenSkeletonContent (device, menu, fileName) {
  var devicePrefix = device === 'pc' ? 'Pc' : 'Mobile'
  var name = devicePrefix + toPascal(menu.id) + 'Skeleton' + fileName
  return (
    '<template>\n' +
    '  <div class="page-skeleton">\n' +
    '    <Skeleton variant="eyebrow" />\n' +
    '    <Skeleton variant="title" />\n' +
    '    <Skeleton variant="meta" />\n' +
    '    <Skeleton variant="text" />\n' +
    '    <Skeleton variant="text-sm" />\n' +
    '  </div>\n' +
    '</template>\n\n' +
    '<script>\n' +
    "import { Skeleton } from '@/components'\n\n" +
    'export default {\n' +
    "  name: '" + name + "',\n" +
    '  components: { Skeleton: Skeleton }\n' +
    '}\n' +
    '</script>\n'
  )
}

/** skeleton/indexSkeleton.vue */
function stubIndexSkeletonContent (device, menu) {
  var devicePrefix = device === 'pc' ? 'Pc' : 'Mobile'
  var name = devicePrefix + toPascal(menu.id) + 'IndexSkeleton'
  return (
    '<template>\n' +
    '  <div class="page-skeleton">\n' +
    '    <Skeleton variant="eyebrow" />\n' +
    '    <Skeleton variant="title" />\n' +
    '    <Skeleton variant="text" />\n' +
    '    <Skeleton variant="chip" :width="96" />\n' +
    '    <Skeleton variant="chip" :width="88" />\n' +
    '  </div>\n' +
    '</template>\n\n' +
    '<script>\n' +
    "import { Skeleton } from '@/components'\n\n" +
    'export default {\n' +
    "  name: '" + name + "',\n" +
    '  components: { Skeleton: Skeleton }\n' +
    '}\n' +
    '</script>\n'
  )
}

/** 화면(숫자.vue) 골격 — 메뉴/스크린 메타를 파일에 맞게 채움 */
function stubScreenPageContent (device, menu, screen, fileName) {
  var devicePrefix = device === 'pc' ? 'Pc' : 'Mobile'
  var base = devicePrefix + toPascal(menu.id)
  var compName = base + 'Screen' + fileName
  var skelComp = 'Skeleton' + fileName
  var menuLabel = folderLabel(menu)
  var short = menuShortName(menuLabel)
  var screenName = (screen && screen.screenName) || (short + ' ' + fileName)
  var screenType = (screen && screen.screenType) || 'Page'
  var screenId = (screen && screen.screenId) || '-'
  var pageUrl = (screen && screen.pageUrl) || ('#/' + device + '/' + menu.id + '/' + fileName)

  return (
    '<template>\n' +
    '  <div class="' + menu.id + '">\n' +
    '    <PageLoading :loading="loading">\n' +
    '      <template #skeleton>\n' +
    '        <' + skelComp + ' />\n' +
    '      </template>\n' +
    '      <div class="page">\n' +
    '        <p>' + escHtml(menuLabel) + '</p>\n' +
    '        <h1>' + escHtml(screenName) + '</h1>\n' +
    '        <dl>\n' +
    '          <div>\n' +
    '            <dt>Screen Type</dt>\n' +
    '            <dd>' + escHtml(screenType) + '</dd>\n' +
    '          </div>\n' +
    '          <div>\n' +
    '            <dt>Screen ID</dt>\n' +
    '            <dd>' + escHtml(screenId) + '</dd>\n' +
    '          </div>\n' +
    '          <div>\n' +
    '            <dt>PageUrl</dt>\n' +
    '            <dd>' + escHtml(pageUrl) + '</dd>\n' +
    '          </div>\n' +
    '        </dl>\n' +
    '        <p>\n' +
    '          ' + escHtml(short) + ' 메뉴 퍼블리시 화면입니다. 시안·마크업을 이 페이지에 연결해 작업하세요.\n' +
    '        </p>\n' +
    '      </div>\n' +
    '    </PageLoading>\n' +
    '  </div>\n' +
    '</template>\n\n' +
    '<script>\n' +
    "import { PageLoading } from '@/components'\n" +
    'import ' + skelComp + " from './skeleton/" + fileName + "Skeleton'\n\n" +
    'export default {\n' +
    "  name: '" + compName + "',\n" +
    '  components: {\n' +
    '    PageLoading: PageLoading,\n' +
    '    ' + skelComp + ': ' + skelComp + '\n' +
    '  },\n' +
    '  data: function () {\n' +
    '    return {\n' +
    '      loading: true\n' +
    '    }\n' +
    '  },\n' +
    '  mounted: function () {\n' +
    '    var self = this\n' +
    '    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)\n' +
    '    this._loadingTimer = window.setTimeout(function () {\n' +
    '      self._loadingTimer = null\n' +
    '      self.loading = false\n' +
    '    }, 700)\n' +
    '  },\n' +
    '  beforeUnmount: function () {\n' +
    '    if (this._loadingTimer) {\n' +
    '      window.clearTimeout(this._loadingTimer)\n' +
    '      this._loadingTimer = null\n' +
    '    }\n' +
    '  }\n' +
    '}\n' +
    '</script>\n'
  )
}

/** 메뉴 index(메인) 화면 메타 */
function buildIndexScreen (device, menu) {
  var prefix = device === 'pc' ? 'PC' : 'MO'
  var base = device === 'pc' ? '#/pc' : '#/mobile'
  var idKey = menu.id.toUpperCase().replace(/-/g, '').slice(0, 6)
  var menuLabel = folderLabel(menu)
  return {
    screenName: menuShortName(menuLabel) + ' 메인',
    screenType: 'Index',
    screenId: prefix + '-' + idKey + '-000',
    pageUrl: base + '/' + menu.id,
    filePath: '@/pages/' + device + '/' + menu.id + '/index.vue',
    owner: '',
    start: '',
    expected: '',
    end: '',
    status: 'pending',
    progress: 0,
    planning: '',
    design: '',
    remark: []
  }
}

/** 메뉴 index.vue 골격 — 서브페이지 목록 메인 */
function stubIndexPageContent (device, menu, screens) {
  var devicePrefix = device === 'pc' ? 'Pc' : 'Mobile'
  var deviceLabel = device === 'pc' ? 'PC' : 'MOBILE'
  var base = devicePrefix + toPascal(menu.id)
  var compName = base + 'Page'
  var menuLabel = folderLabel(menu)
  var short = menuShortName(menuLabel)
  var list = (screens || []).filter(function (s) {
    return s && s.screenType !== 'Index'
  })
  if (!list.length) {
    list = [{
      screenName: short + ' 01',
      pageUrl: '#/' + device + '/' + menu.id + '/01'
    }]
  }
  var links = list.map(function (s) {
    var no = String((s.pageUrl || '').split('/').pop() || '01')
    var toPath = '/' + device + '/' + menu.id + '/' + no
    return (
      '        <li>\n' +
      '          <router-link :to="\'' + toPath + '\'">' + escHtml(s.screenName || (short + ' ' + no)) + '</router-link>\n' +
      '        </li>'
    )
  }).join('\n')

  // index 링크 들여쓰기 (PageLoading 안)
  var nestedLinks = links.replace(/^        /gm, '          ')

  return (
    '<template>\n' +
    '  <div class="' + menu.id + '">\n' +
    '    <PageLoading :loading="loading">\n' +
    '      <template #skeleton>\n' +
    '        <IndexSkeleton />\n' +
    '      </template>\n' +
    '      <div class="page">\n' +
    '        <p>' + deviceLabel + ' 메뉴</p>\n' +
    '        <h1>' + escHtml(menuLabel) + '</h1>\n' +
    '        <p>\n' +
    '          ' + escHtml(short) + ' 메뉴 메인입니다. 하위 화면을 선택하세요.\n' +
    '        </p>\n' +
    '        <ul>\n' +
    nestedLinks + '\n' +
    '        </ul>\n' +
    '      </div>\n' +
    '    </PageLoading>\n' +
    '  </div>\n' +
    '</template>\n\n' +
    '<script>\n' +
    "import { PageLoading } from '@/components'\n" +
    "import IndexSkeleton from './skeleton/indexSkeleton'\n\n" +
    'export default {\n' +
    "  name: '" + compName + "',\n" +
    '  components: {\n' +
    '    PageLoading: PageLoading,\n' +
    '    IndexSkeleton: IndexSkeleton\n' +
    '  },\n' +
    '  data: function () {\n' +
    '    return {\n' +
    '      loading: true\n' +
    '    }\n' +
    '  },\n' +
    '  mounted: function () {\n' +
    '    var self = this\n' +
    '    // 페이지 진입 로딩 예시 (실제 API 연동 시 교체)\n' +
    '    this._loadingTimer = window.setTimeout(function () {\n' +
    '      self._loadingTimer = null\n' +
    '      self.loading = false\n' +
    '    }, 700)\n' +
    '  },\n' +
    '  beforeUnmount: function () {\n' +
    '    if (this._loadingTimer) {\n' +
    '      window.clearTimeout(this._loadingTimer)\n' +
    '      this._loadingTimer = null\n' +
    '    }\n' +
    '  }\n' +
    '}\n' +
    '</script>\n'
  )
}

function ensureStubPage (device, menu) {
  var dir = path.join(process.cwd(), 'src/pages', device, menu.id)
  mkdirp(dir)

  var prefix = device === 'pc' ? 'PC' : 'MO'
  var baseUrl = device === 'pc' ? '#/pc' : '#/mobile'
  var idKey = menu.id.toUpperCase().replace(/-/g, '').slice(0, 6)
  var defaultScreen = {
    screenName: menu.name + ' 01',
    screenType: 'Page',
    screenId: prefix + '-' + idKey + '-001',
    pageUrl: baseUrl + '/' + menu.id + '/01'
  }

  var skelDir = path.join(dir, 'skeleton')
  mkdirp(skelDir)

  var firstPath = path.join(dir, '01.vue')
  if (!fs.existsSync(firstPath)) {
    fs.writeFileSync(firstPath, stubScreenPageContent(device, menu, defaultScreen, '01'))
  }

  // 화면별 스켈레톤 파일 보장
  var files = listScreenFiles(device, menu.id)
  files.forEach(function (file) {
    var no = file.replace(/\.vue$/, '')
    var skelPath = path.join(skelDir, no + 'Skeleton.vue')
    if (!fs.existsSync(skelPath)) {
      fs.writeFileSync(skelPath, stubScreenSkeletonContent(device, menu, no))
    }
  })
  fs.writeFileSync(
    path.join(skelDir, 'indexSkeleton.vue'),
    stubIndexSkeletonContent(device, menu)
  )

  // index.vue 는 서브페이지 메인 — 항상 현재 화면 목록으로 갱신
  var childScreens = files.map(function (file) {
    var no = file.replace(/\.vue$/, '')
    return {
      screenName: menu.name + ' ' + no,
      pageUrl: baseUrl + '/' + menu.id + '/' + no
    }
  })
  if (!childScreens.length) childScreens = [defaultScreen]
  fs.writeFileSync(
    path.join(dir, 'index.vue'),
    stubIndexPageContent(device, menu, childScreens)
  )
}

function buildScreens (device, menu) {
  var prefix = device === 'pc' ? 'PC' : 'MO'
  var base = device === 'pc' ? '#/pc' : '#/mobile'
  var files = listScreenFiles(device, menu.id)
  var idKey = menu.id.toUpperCase().replace(/-/g, '').slice(0, 6)

  var children = files.map(function (file) {
    var no = file.replace(/\.vue$/, '')
    var num = parseInt(no, 10) || 1
    return {
      screenName: menu.name + ' ' + no,
      screenType: 'Page',
      screenId: prefix + '-' + idKey + '-' + pad(num, 3),
      pageUrl: base + '/' + menu.id + '/' + no,
      filePath: '@/pages/' + device + '/' + menu.id + '/' + file,
      owner: '',
      start: '',
      expected: '',
      end: '',
      status: 'pending',
      progress: 0,
      planning: '',
      design: '',
      remark: []
    }
  })

  return [buildIndexScreen(device, menu)].concat(children)
}

function buildDeviceBundle (device) {
  var outDir = path.join(process.cwd(), 'public/data/publish', device)
  mkdirp(outDir)

  var indexFolders = []
  var totalScreens = 0

  menus.forEach(function (menu) {
    ensureStubPage(device, menu)
    var screens = buildScreens(device, menu)
    totalScreens += screens.length

    var fileName = menu.id + '.json'
    writeJson(path.join(outDir, fileName), {
      id: menu.id,
      name: folderLabel(menu),
      filePath: '@/pages/' + device + '/' + menu.id,
      screens: screens
    })

    indexFolders.push({
      id: menu.id,
      name: folderLabel(menu),
      file: fileName
    })
  })

  writeJson(path.join(outDir, 'index.json'), {
    folders: indexFolders
  })

  return { folders: indexFolders.length, screens: totalScreens }
}

function mapGuideScreens (screens, prefix) {
  return (screens || []).map(function (screen) {
    return {
      screenName: screen.screenName,
      screenType: 'Guide',
      screenId: prefix ? String(screen.screenId || '').replace(/^G-/, prefix + '-') : screen.screenId,
      pageUrl: screen.pageUrl,
      filePath: screen.filePath,
      owner: '',
      start: '',
      expected: '',
      end: '',
      status: 'done',
      progress: 100,
      planning: '',
      design: '',
      remark: []
    }
  })
}

function buildGuideBundle (dirName, idPrefix) {
  var outDir = path.join(process.cwd(), 'public/data/publish', dirName)
  mkdirp(outDir)

  var indexFolders = []
  var totalScreens = 0

  guideFolders.forEach(function (folder) {
    var screens = mapGuideScreens(folder.screens, idPrefix)
    totalScreens += screens.length
    var fileName = folder.id + '.json'

    writeJson(path.join(outDir, fileName), {
      id: folder.id,
      name: folder.name,
      filePath: '@/pages/components',
      screens: screens
    })

    indexFolders.push({
      id: folder.id,
      name: folder.name,
      file: fileName
    })
  })

  writeJson(path.join(outDir, 'index.json'), {
    folders: indexFolders
  })

  return { folders: indexFolders.length, screens: totalScreens }
}

function removeLegacyFiles () {
  var root = path.join(process.cwd(), 'public/data/publish')
  ;['pc.json', 'mobile.json', 'pc-guide.json', 'mobile-guide.json', 'menus.json'].forEach(function (name) {
    var full = path.join(root, name)
    if (fs.existsSync(full)) fs.unlinkSync(full)
  })
}

var root = path.join(process.cwd(), 'public/data/publish')
mkdirp(root)

writeJson(path.join(root, 'index.json'), {
  project: {
    name: 'Publish List',
    description: 'PC / MOBILE 화면 퍼블리시 목록과 컴포넌트 가이드를 확인합니다.'
  },
  tabs: [
    { id: 'pc', label: 'PC', base: 'pc/' },
    { id: 'mobile', label: 'MOBILE', base: 'mobile/' },
    { id: 'pc-guide', label: 'PC 컴포넌트 가이드', base: 'pc-guide/' },
    { id: 'mobile-guide', label: 'Mobile 컴포넌트 가이드', base: 'mobile-guide/' }
  ]
})

var pc = buildDeviceBundle('pc')
var mobile = buildDeviceBundle('mobile')
var pcGuide = buildGuideBundle('pc-guide', 'G')
var moGuide = buildGuideBundle('mobile-guide', 'MG')

removeLegacyFiles()

console.log('publish data split by screen/menu name')
console.log('pc:', pc.folders, 'folders,', pc.screens, 'screens')
console.log('mobile:', mobile.folders, 'folders,', mobile.screens, 'screens')
console.log('pc-guide:', pcGuide.folders, 'folders,', pcGuide.screens, 'screens')
console.log('mobile-guide:', moGuide.folders, 'folders,', moGuide.screens, 'screens')
