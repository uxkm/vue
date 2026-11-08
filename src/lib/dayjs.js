/** 날짜·시간 라이브러리. 한국어, UTC, 상대 시간, 형식 파싱을 켠다 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/ko'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)
dayjs.locale('ko')

export { dayjs }
export default dayjs
