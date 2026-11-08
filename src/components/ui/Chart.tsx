/**
 * 차트 캔버스 자리.
 * engine(amcharts/us/echarts/highcharts/d3) 이름과 높이·제목을 둔다.
 */
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'

/** 차트 캔버스가 받는 값. 엔진 이름과 높이, 제목 */
export interface ChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** amcharts · us · echarts · highcharts · d3 */
  engine?: string
  title?: ReactNode
  height?: number | string
  children?: ReactNode
}

/**
 * 차트 그릴 자리.
 * 라이브러리 인스턴스는 화면에서 만들고, 이 컴포넌트는 캔버스만 연다.
 * engine 으로 어떤 차트 구현인지 남긴다.
 */
export function Chart ({
  engine = 'amcharts',
  title,
  height = 280,
  className,
  style,
  children,
  ...rest
}: ChartProps) {
  return (
    <figure {...rest} className={cx('chart', className)} data-engine={engine}>
      {hasNodes(title) && <figcaption className="chart_title">{title}</figcaption>}
      <div className="chart_canvas" style={{ height, ...style }}>
        {children}
      </div>
    </figure>
  )
}

export default Chart
