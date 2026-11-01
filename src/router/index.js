import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
import ButtonPage from '@/pages/components/ButtonPage.vue'
import TypographyPage from '@/pages/components/TypographyPage.vue'
import LinkPage from '@/pages/components/LinkPage.vue'
import IconPage from '@/pages/components/IconPage.vue'
import ContainerPage from '@/pages/components/ContainerPage.vue'
import SpacePage from '@/pages/components/SpacePage.vue'
import DividerPage from '@/pages/components/DividerPage.vue'
import FlexPage from '@/pages/components/FlexPage.vue'
import GridPage from '@/pages/components/GridPage.vue'
import BadgePage from '@/pages/components/BadgePage.vue'
import TagPage from '@/pages/components/TagPage.vue'
import CardPage from '@/pages/components/CardPage.vue'
import InputPage from '@/pages/components/InputPage.vue'
import SelectPage from '@/pages/components/SelectPage.vue'
import AlertPage from '@/pages/components/AlertPage.vue'
import ProgressPage from '@/pages/components/ProgressPage.vue'
import EmptyPage from '@/pages/components/EmptyPage.vue'
import BreadcrumbPage from '@/pages/components/BreadcrumbPage.vue'
import TabsPage from '@/pages/components/TabsPage.vue'
import SortingMenuTestPage from '@/pages/test/SortingMenuTestPage.vue'
import SortingMenuBasicTestPage from '@/pages/test/SortingMenuBasicTestPage.vue'
import FilterScrollTestPage from '@/pages/test/FilterScrollTestPage.vue'

/**
 * 메뉴 index.vue → 서브페이지 메인
 * 예: src/pages/pc/login/index.vue → #/pc/login
 */
function buildDeviceIndexRoutes (device, modules) {
  return Object.keys(modules)
    .filter(function (key) {
      return /\/index\.vue$/.test(key)
    })
    .map(function (key) {
      var menuId = key
        .replace(new RegExp('^\\.\\./pages/' + device + '/'), '')
        .replace(/\/index\.vue$/, '')
      var mod = modules[key]
      return {
        path: '/' + device + '/' + menuId,
        name: device + '-' + menuId,
        component: mod.default || mod,
        meta: { device: device, menuId: menuId, screenNo: 'index' }
      }
    })
}

/**
 * pc / mobile 화면 파일 → 라우트
 * 예: src/pages/pc/login/01.vue → #/pc/login/01
 */
function buildDeviceScreenRoutes (device, modules) {
  return Object.keys(modules)
    .filter(function (key) {
      return /\/\d+\.vue$/.test(key)
    })
    .map(function (key) {
      var relative = key.replace(new RegExp('^\\.\\./pages/' + device + '/'), '')
      var parts = relative.replace(/\.vue$/, '').split('/')
      var menuId = parts[0]
      var screenNo = parts[1]
      var mod = modules[key]
      return {
        path: '/' + device + '/' + menuId + '/' + screenNo,
        name: device + '-' + menuId + '-' + screenNo,
        component: mod.default || mod,
        meta: { device: device, menuId: menuId, screenNo: screenNo }
      }
    })
}

var pcModules = import.meta.glob('../pages/pc/**/*.vue', { eager: true })
var mobileModules = import.meta.glob('../pages/mobile/**/*.vue', { eager: true })

var pcIndexRoutes = buildDeviceIndexRoutes('pc', pcModules)
var mobileIndexRoutes = buildDeviceIndexRoutes('mobile', mobileModules)
var pcScreenRoutes = buildDeviceScreenRoutes('pc', pcModules)
var mobileScreenRoutes = buildDeviceScreenRoutes('mobile', mobileModules)

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Home }
  ].concat(
    pcIndexRoutes,
    mobileIndexRoutes,
    pcScreenRoutes,
    mobileScreenRoutes,
    [
      { path: '/components/button', name: 'button', component: ButtonPage },
      { path: '/components/typography', name: 'typography', component: TypographyPage },
      { path: '/components/link', name: 'link', component: LinkPage },
      { path: '/components/icon', name: 'icon', component: IconPage },
      { path: '/components/container', name: 'container', component: ContainerPage },
      { path: '/components/space', name: 'space', component: SpacePage },
      { path: '/components/divider', name: 'divider', component: DividerPage },
      { path: '/components/flex', name: 'flex', component: FlexPage },
      { path: '/components/grid', name: 'grid', component: GridPage },
      { path: '/components/badge', name: 'badge', component: BadgePage },
      { path: '/components/tag', name: 'tag', component: TagPage },
      { path: '/components/card', name: 'card', component: CardPage },
      { path: '/components/input', name: 'input', component: InputPage },
      { path: '/components/select', name: 'select', component: SelectPage },
      { path: '/components/alert', name: 'alert', component: AlertPage },
      { path: '/components/progress', name: 'progress', component: ProgressPage },
      { path: '/components/empty', name: 'empty', component: EmptyPage },
      { path: '/components/breadcrumb', name: 'breadcrumb', component: BreadcrumbPage },
      { path: '/components/tabs', name: 'tabs', component: TabsPage },
      {
        path: '/test/sorting-menu',
        name: 'sorting-menu-test',
        component: SortingMenuTestPage
      },
      {
        path: '/test/sorting-menu-basic',
        name: 'sorting-menu-basic-test',
        component: SortingMenuBasicTestPage
      },
      {
        path: '/test/filter-scroll',
        name: 'filter-scroll-test',
        component: FilterScrollTestPage
      },
      { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
  )
})

export default router
