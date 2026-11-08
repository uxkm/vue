/**
 * Highcharts 차트 캔버스.
 * Chart 에 engine="highcharts" 를 고정해 넘긴다.
 */
import { Chart, type ChartProps } from './Chart'

/** Highcharts 캔버스가 받는 값 */
export type ChartHighchartsProps = Omit<ChartProps, 'engine'>

/** Highcharts 를 올릴 캔버스 */
export function ChartHighcharts (props: ChartHighchartsProps) {
  return <Chart {...props} engine="highcharts" />
}

export default ChartHighcharts
