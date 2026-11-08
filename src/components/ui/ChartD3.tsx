/**
 * D3 차트 캔버스.
 * Chart 에 engine="d3" 를 고정해 넘긴다.
 */
import { Chart, type ChartProps } from './Chart'

/** D3 캔버스가 받는 값 */
export type ChartD3Props = Omit<ChartProps, 'engine'>

/** D3 를 올릴 캔버스 */
export function ChartD3 (props: ChartD3Props) {
  return <Chart {...props} engine="d3" />
}

export default ChartD3
