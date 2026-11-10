import NotFoundView from '@/screens/error/NotFound'

/** 404 탭 제목 */
export const metadata = {
  title: '404 · Publish List'
}

/** 없는 주소. NotFoundView 를 보여 준다 */
export default function NotFoundPage () {
  return <NotFoundView />
}
