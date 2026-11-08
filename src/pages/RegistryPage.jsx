'use client'

import { notFound } from 'next/navigation'
import { PageChrome, RouteLoading } from '@/comp'
import { useRegistryView } from '@/hooks/useRegistryView'

/**
 * 공통 레지스트리 라우트.
 * 화면 파일을 불러오기 전과 후에 같은 meta 로 헤더·푸터를 맞춘다.
 * true 표시, false 숨김. meta 가 없으면 공통 헤더·푸터를 표시한다.
 *
 * @param {Record<string, () => Promise<unknown>>} loaders 필수. 라우트 키에서 화면 모듈을 찾는다.
 * @param {Record<string, { header?: boolean, footer?: boolean }>} metaMap 필수. registry 가 뽑아 둔 meta. 로딩 중에도 쓴다.
 * @param {string} routeKey 필수. 현재 주소의 화면 키.
 */
export function RegistryPage ({ loaders, metaMap, routeKey }) {
  const { Comp, missing } = useRegistryView(loaders, routeKey)
  if (missing) notFound()

  // 이 주소의 크롬. 맵에 없으면 공통 기본(헤더·푸터 표시)
  const meta = metaMap?.[routeKey]

  // 화면 파일 도착 전. meta 를 먼저 적용해 크롬이 깜빡이지 않게 한다
  if (!Comp) return <RouteLoading meta={meta} />
  return (
    <>
      {/* 본문과 같은 meta. false 인 헤더·푸터만 숨긴다 */}
      <PageChrome meta={meta} />
      <Comp />
    </>
  )
}

export default RegistryPage
