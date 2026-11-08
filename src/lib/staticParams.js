/**
 * 정적 export(output: 'export') 용 generateStaticParams 헬퍼
 * registry-ids 만 사용 (loader/뷰 import 금지 — 서버 컴포넌트 경계 유지)
 */
import {
  webMenuIds,
  mobileMenuIds,
  b2bMenuIds,
  webScreenKeys,
  mobileScreenKeys,
  b2bScreenKeys,
  componentNames,
  demoNames
} from '@/generated/registry-ids'

/** WEB 메뉴 주소(/web/:menuId)를 빌드 때 미리 만든다 */
export function webMenuStaticParams () {
  return webMenuIds.map((menuId) => ({ menuId }))
}

/** 모바일 메뉴 주소(/mobile/:menuId)를 빌드 때 미리 만든다 */
export function mobileMenuStaticParams () {
  return mobileMenuIds.map((menuId) => ({ menuId }))
}

/** B2B 메뉴 주소(/b2b/:menuId)를 빌드 때 미리 만든다 */
export function b2bMenuStaticParams () {
  return b2bMenuIds.map((menuId) => ({ menuId }))
}

/** WEB 하위 화면 주소(/web/:menuId/:screen)를 빌드 때 미리 만든다 */
export function webScreenStaticParams () {
  return webScreenKeys.map((key) => {
    const [menuId, screen] = key.split('/')
    return { menuId, screen }
  })
}

/** 모바일 하위 화면 주소를 빌드 때 미리 만든다 */
export function mobileScreenStaticParams () {
  return mobileScreenKeys.map((key) => {
    const [menuId, screen] = key.split('/')
    return { menuId, screen }
  })
}

/** B2B 하위 화면 주소(/b2b/:menuId/:screen)를 빌드 때 미리 만든다 */
export function b2bScreenStaticParams () {
  return b2bScreenKeys.map((key) => {
    const [menuId, screen] = key.split('/')
    return { menuId, screen }
  })
}

/** 가이드 주소(/guide/:name, 예: button)를 빌드 때 미리 만든다 */
export function componentStaticParams () {
  return componentNames.map((name) => ({ name }))
}

/** 데모 화면 주소(/demo/:name)를 빌드 때 미리 만든다 */
export function demoStaticParams () {
  return demoNames.map((name) => ({ name }))
}
