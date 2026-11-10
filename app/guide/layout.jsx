import '@/styles/demo.scss'
import { PageChrome } from '@/comp/widget/PageChrome'

/**
 * /guide · /guide/:name 공통.
 * 퍼블리싱 가이드는 공통 AppFooter 숨김.
 * 좌측 메뉴·본문은 각 화면 GuideLayout → GuideMenu.
 */
export default function GuideLayoutRoute ({ children }) {
  return (
    <>
      <PageChrome meta={{ footer: false }} />
      {children}
    </>
  )
}
