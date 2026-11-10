import { routeTitles } from '@/generated/registry-ids'

/** 루트 layout의 title.template과 조합해 초기 HTML 제목을 만든다. */
export function routeMetadata (pathname) {
  const title = routeTitles[pathname]
  return title ? { title } : {}
}
