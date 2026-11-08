/**
 * ECharts 차트 캔버스.
 * Chart 에 engine="echarts" 를 고정해 넘긴다.
 */
import { Chart, type ChartProps } from './Chart'

/** ECharts 캔버스가 받는 값 */
export type ChartEchartsProps = Omit<ChartProps, 'engine'>

/** ECharts 를 올릴 캔버스 */
export function ChartEcharts (props: ChartEchartsProps) {
  return <Chart {...props} engine="echarts" />
}

export default ChartEcharts
