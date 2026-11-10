'use client'

import { useEffect, useRef } from 'react'
import { Link } from '@/lib/router'
import { AppHeaderLink } from '@/comp'
import { GuideLayout } from '@/screens/pub/widgets/guide'
import { am5, am5xy, am5percent, am5themes_Animated } from '@/lib/charts'

/** 막대 차트 데이터. category 축 이름, value 값 */
const columnData = [
  { category: '1월', value: 120 },
  { category: '2월', value: 98 },
  { category: '3월', value: 145 },
  { category: '4월', value: 132 },
  { category: '5월', value: 168 },
  { category: '6월', value: 154 }
]

/** 라인 차트 데이터. category 축 이름, value 값 */
const lineData = [
  { category: '1월', value: 42 },
  { category: '2월', value: 55 },
  { category: '3월', value: 48 },
  { category: '4월', value: 67 },
  { category: '5월', value: 73 },
  { category: '6월', value: 81 }
]

/** 원형 차트 데이터. category 항목 이름, value 값 */
const pieData = [
  { category: '온라인', value: 45 },
  { category: '오프라인', value: 28 },
  { category: '혼합', value: 18 },
  { category: '기타', value: 9 }
]

/** 차트 루트가 남아 있으면 해제한다. 화면을 떠날 때 쓴다 */
function disposeRoot (root) {
  if (root && !root.isDisposed()) root.dispose()
}

/**
 * Chart (amCharts 5) 데모 화면.
 * 막대·원·라인 차트 예시를 한 페이지에서 확인한다.
 */
export default function ChartDemoPage () {
  const columnRef = useRef(null)
  const lineRef = useRef(null)
  const pieRef = useRef(null)

  useEffect(() => {
    if (!columnRef.current) return undefined

    const root = am5.Root.new(columnRef.current)
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0,
        layout: root.verticalLayout
      })
    )

    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 40,
      cellStartLocation: 0.15,
      cellEndLocation: 0.85
    })
    xRenderer.grid.template.setAll({ visible: false })

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    )
    xAxis.data.setAll(columnData)

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    )

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: '수강 신청',
        xAxis,
        yAxis,
        valueYField: 'value',
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{categoryX}: {valueY}'
        })
      })
    )
    series.columns.template.setAll({
      cornerRadiusTL: 4,
      cornerRadiusTR: 4,
      strokeOpacity: 0
    })
    series.data.setAll(columnData)

    chart.set('cursor', am5xy.XYCursor.new(root, { behavior: 'none' }))
    series.appear(800)
    chart.appear(800, 100)

    return () => disposeRoot(root)
  }, [])

  useEffect(() => {
    if (!lineRef.current) return undefined

    const root = am5.Root.new(lineRef.current)
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        paddingLeft: 0
      })
    )

    const xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 40 })
    xRenderer.grid.template.setAll({ visible: false })

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      })
    )
    xAxis.data.setAll(lineData)

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    )

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: '완료율',
        xAxis,
        yAxis,
        valueYField: 'value',
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{categoryX}: {valueY}%'
        })
      })
    )
    series.strokes.template.setAll({ strokeWidth: 2 })
    series.bullets.push(() =>
      am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 4,
          fill: series.get('fill')
        })
      })
    )
    series.data.setAll(lineData)

    chart.set('cursor', am5xy.XYCursor.new(root, { behavior: 'none' }))
    series.appear(800)
    chart.appear(800, 100)

    return () => disposeRoot(root)
  }, [])

  useEffect(() => {
    if (!pieRef.current) return undefined

    const root = am5.Root.new(pieRef.current)
    root.setThemes([am5themes_Animated.new(root)])

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(45)
      })
    )

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        alignLabels: false
      })
    )
    series.labels.template.setAll({
      textType: 'circular',
      centerX: 0,
      centerY: 0
    })
    series.slices.template.setAll({
      strokeWidth: 2,
      stroke: am5.color(0xffffff)
    })
    series.data.setAll(pieData)

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 12
      })
    )
    legend.data.setAll(series.dataItems)

    series.appear(800, 100)

    return () => disposeRoot(root)
  }, [])

  return (
    // Header 사용법 (GuideLayout header* props)
    // - 헤더 숨김: export const meta = { header: false }
    // - headerLayout="inline" : 한 줄 (스크롤 시 전체 숨김)
    // - headerLayout="stacked": 상단 브랜드 + 하단 네비 (스크롤 시 상단만 숨김)
    // - hideNavOnScroll       : stacked일 때 네비까지 함께 위로 올림
    // 예) <GuideLayout headerLayout="stacked" hideNavOnScroll ... />
    <GuideLayout
      category="데모"
      title="Chart (amCharts 5)"
      description="@amcharts/amcharts5 — Column / Line / Pie 샘플 (@/lib/charts)"
      headerLayout="stacked"
      showBack
      backTo="/pub"
      backLabel="← 목록으로"
      headerBrand={<Link className="app-header__brand" to="/demo/chart">Chart</Link>}
      headerNav={(
        <>
          <AppHeaderLink to="/pub">목록</AppHeaderLink>
          <AppHeaderLink to="/demo/chart">Chart</AppHeaderLink>
          <AppHeaderLink to="/guide">컴포넌트</AppHeaderLink>
        </>
      )}
    >
      <div className="demo-block">
        <h2 className="demo-block__title">Column Chart</h2>
        <div ref={columnRef} style={{ width: '100%', height: 320 }} />
      </div>

      <div className="demo-block">
        <h2 className="demo-block__title">Line Chart</h2>
        <div ref={lineRef} style={{ width: '100%', height: 320 }} />
      </div>

      <div className="demo-block">
        <h2 className="demo-block__title">Pie Chart (Donut)</h2>
        <div ref={pieRef} style={{ width: '100%', height: 360 }} />
      </div>
    </GuideLayout>
  )
}
