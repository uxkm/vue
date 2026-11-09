'use client'

/**
 * PageHeader
 * - 일반 페이지용 헤더 슬롯 등록 (가이드·데모·서비스 화면 등)
 * - /pub 퍼블리시 목록은 `@/pages/pub/widgets/list` 의 PubHeader 사용
 *
 * Header 와 동일 API. 역할만 페이지/퍼블로 구분해 관리한다.
 */
export {
  Header as PageHeader,
  Header as default,
  type HeaderProps as PageHeaderProps
} from './Header'
