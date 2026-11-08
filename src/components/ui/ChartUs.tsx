/**
 * US 차트 캔버스.
 * Chart 에 engine="us" 를 고정해 넘긴다. 실제 그리기는 화면에서 수행.
 */
import { Chart, type ChartProps } from './Chart'

/** ChartUs 가 받는 값. engine 은 us 로 고정 */
export type ChartUsProps = Omit<ChartProps, 'engine'>

/** US 차트 캔버스. 그리기는 화면에서 한다 */
export function ChartUs (props: ChartUsProps) {
  return <Chart {...props} engine="us" />
}

export default ChartUs
