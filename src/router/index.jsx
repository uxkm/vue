import { Navigate, useRoutes } from 'react-router-dom'
import Home from '@/pages/Home.jsx'
import ButtonPage from '@/pages/components/ButtonPage.jsx'
import TypographyPage from '@/pages/components/TypographyPage.jsx'
import LinkPage from '@/pages/components/LinkPage.jsx'
import IconPage from '@/pages/components/IconPage.jsx'
import ContainerPage from '@/pages/components/ContainerPage.jsx'
import SpacePage from '@/pages/components/SpacePage.jsx'
import DividerPage from '@/pages/components/DividerPage.jsx'
import FlexPage from '@/pages/components/FlexPage.jsx'
import GridPage from '@/pages/components/GridPage.jsx'
import BadgePage from '@/pages/components/BadgePage.jsx'
import TagPage from '@/pages/components/TagPage.jsx'
import CardPage from '@/pages/components/CardPage.jsx'
import InputPage from '@/pages/components/InputPage.jsx'
import SelectPage from '@/pages/components/SelectPage.jsx'
import AlertPage from '@/pages/components/AlertPage.jsx'
import ProgressPage from '@/pages/components/ProgressPage.jsx'
import EmptyPage from '@/pages/components/EmptyPage.jsx'
import BreadcrumbPage from '@/pages/components/BreadcrumbPage.jsx'
import TabsPage from '@/pages/components/TabsPage.jsx'
import SortingMenuTestPage from '@/pages/test/SortingMenuTestPage.jsx'
import SortingMenuBasicTestPage from '@/pages/test/SortingMenuBasicTestPage.jsx'
import FilterScrollTestPage from '@/pages/test/FilterScrollTestPage.jsx'

const pcModules = import.meta.glob('../pages/pc/**/*.{jsx,tsx}', { eager: true })
const mobileModules = import.meta.glob('../pages/mobile/**/*.{jsx,tsx}', { eager: true })

function buildDeviceRoutes (device, modules) {
  const routes = []
  Object.keys(modules).forEach((key) => {
    const mod = modules[key]
    const Component = mod && (mod.default || mod)
    if (!Component) return

    // ../pages/pc/login/index.jsx → login
    // ../pages/pc/login/01.jsx → login/01
    const rel = key
      .replace(new RegExp(`^\\.\\./pages/${device}/`), '')
      .replace(/\.(jsx|tsx)$/, '')

    if (/\/index$/.test(rel) || rel === 'index') {
      const menuId = rel.replace(/\/?index$/, '')
      if (!menuId) return
      routes.push({
        path: `/${device}/${menuId}`,
        element: <Component />
      })
      return
    }

    const m = rel.match(/^([^/]+)\/(\d+)$/)
    if (m) {
      routes.push({
        path: `/${device}/${m[1]}/${m[2]}`,
        element: <Component />
      })
    }
  })
  return routes
}

const staticRoutes = [
  { path: '/', element: <Home /> },
  { path: '/components/button', element: <ButtonPage /> },
  { path: '/components/typography', element: <TypographyPage /> },
  { path: '/components/link', element: <LinkPage /> },
  { path: '/components/icon', element: <IconPage /> },
  { path: '/components/container', element: <ContainerPage /> },
  { path: '/components/space', element: <SpacePage /> },
  { path: '/components/divider', element: <DividerPage /> },
  { path: '/components/flex', element: <FlexPage /> },
  { path: '/components/grid', element: <GridPage /> },
  { path: '/components/badge', element: <BadgePage /> },
  { path: '/components/tag', element: <TagPage /> },
  { path: '/components/card', element: <CardPage /> },
  { path: '/components/input', element: <InputPage /> },
  { path: '/components/select', element: <SelectPage /> },
  { path: '/components/alert', element: <AlertPage /> },
  { path: '/components/progress', element: <ProgressPage /> },
  { path: '/components/empty', element: <EmptyPage /> },
  { path: '/components/breadcrumb', element: <BreadcrumbPage /> },
  { path: '/components/tabs', element: <TabsPage /> },
  { path: '/test/sorting-menu', element: <SortingMenuTestPage /> },
  { path: '/test/sorting-menu-basic', element: <SortingMenuBasicTestPage /> },
  { path: '/test/filter-scroll', element: <FilterScrollTestPage /> },
  { path: '*', element: <Navigate to="/" replace /> }
]

export function AppRoutes () {
  const routes = [
    ...staticRoutes.slice(0, 1),
    ...buildDeviceRoutes('pc', pcModules),
    ...buildDeviceRoutes('mobile', mobileModules),
    ...staticRoutes.slice(1)
  ]
  return useRoutes(routes)
}

export default AppRoutes
