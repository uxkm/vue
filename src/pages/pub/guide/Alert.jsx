'use client'

import {
  Alert,
  Button,
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Icon
} from '@/comp'
import { alertApiSections } from '@/pages/pub/data/guide/alertApiSections'

const SECTIONS = [
  {
    title: '유형',
    description: (
      <>
        <code>color</code>로 info · success · warning · danger를 지정합니다.
        기본은 <code>info</code>입니다.
      </>
    ),
    code: `<Alert color="info">정보 알림입니다.</Alert>
<Alert color="success">성공 알림입니다.</Alert>
<Alert color="warning">경고 알림입니다.</Alert>
<Alert color="danger">위험 알림입니다.</Alert>`,
    preview: (
      <div className="demo-stack">
        <Alert color="info">정보 알림입니다.</Alert>
        <Alert color="success">성공 알림입니다.</Alert>
        <Alert color="warning">경고 알림입니다.</Alert>
        <Alert color="danger">위험 알림입니다.</Alert>
      </div>
    )
  },
  {
    title: '제목과 본문',
    description: (
      <>
        <code>title</code>은 굵게 표시되고, 본문은 <code>children</code> 또는 <code>description</code>으로 전달합니다.
      </>
    ),
    code: `<Alert color="info" title="정보">변경 사항이 저장되었습니다.</Alert>
<Alert color="success" title="완료" description="결제가 정상적으로 처리되었습니다." />
<Alert color="warning" title="제목만 있는 알림" />`,
    preview: (
      <div className="demo-stack">
        <Alert color="info" title="정보">변경 사항이 저장되었습니다.</Alert>
        <Alert color="success" title="완료" description="결제가 정상적으로 처리되었습니다." />
        <Alert color="warning" title="제목만 있는 알림" />
      </div>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다. 기본은 <code>md</code>입니다.
      </>
    ),
    code: `<Alert size="sm" title="Small — alert_sm">작은 알림입니다.</Alert>
<Alert title="Medium — 기본">기본 크기 알림입니다.</Alert>
<Alert size="lg" title="Large — alert_lg">큰 알림입니다.</Alert>`,
    preview: (
      <div className="demo-stack">
        <Alert size="sm" title="Small — alert_sm">작은 알림입니다.</Alert>
        <Alert title="Medium — 기본">기본 크기 알림입니다.</Alert>
        <Alert size="lg" title="Large — alert_lg">큰 알림입니다.</Alert>
      </div>
    )
  },
  {
    title: '아이콘',
    description: (
      <>
        기본은 색별 <code>Icon</code>(info · check-circle · warning · x-circle)입니다.
        <code>showIcon={'{false}'}</code>로 숨기거나 <code>icon</code>으로 바꿉니다.
      </>
    ),
    code: `<Alert color="danger" showIcon={false}>아이콘 없는 위험 알림</Alert>
<Alert color="success" icon={<Icon name="star" size="100%" />}>사용자 정의 아이콘</Alert>`,
    preview: (
      <div className="demo-stack">
        <Alert color="danger" showIcon={false}>아이콘 없는 위험 알림</Alert>
        <Alert color="success" icon={<Icon name="star" size="100%" />}>사용자 정의 아이콘</Alert>
      </div>
    )
  },
  {
    title: '닫기',
    description: (
      <>
        <code>closable</code>이면 닫기 버튼이 표시되고, 누르면 알림이 숨겨집니다.
        <code>onClose</code>로 닫힘 이후 동작을 처리합니다.
      </>
    ),
    code: `<Alert color="warning" closable>경고 알림입니다.</Alert>
<Alert color="info" title="공지" closable onClose={() => console.log('closed')}>
  닫으면 onClose가 호출됩니다.
</Alert>`,
    preview: (
      <div className="demo-stack">
        <Alert color="warning" closable>경고 알림입니다.</Alert>
        <Alert color="info" title="공지" closable onClose={() => {}}>
          닫으면 onClose가 호출됩니다.
        </Alert>
      </div>
    )
  },
  {
    title: '액션',
    description: (
      <>
        <code>actions</code>로 본문 아래에 버튼을 배치합니다.
      </>
    ),
    code: `<Alert
  color="warning"
  title="세션 만료 예정"
  actions={(
    <>
      <Button size="sm" label="연장" />
      <Button size="sm" variant="outline" color="default" label="닫기" />
    </>
  )}
>
  5분 후 로그아웃됩니다.
</Alert>`,
    preview: (
      <div className="demo-stack">
        <Alert
          color="warning"
          title="세션 만료 예정"
          actions={(
            <>
              <Button size="sm" label="연장" />
              <Button size="sm" variant="outline" color="default" label="닫기" />
            </>
          )}
        >
          5분 후 로그아웃됩니다.
        </Alert>
      </div>
    )
  },
  {
    title: '배너',
    description: (
      <>
        <code>banner</code>는 모서리와 좌우 테두리를 없애 페이지 상단 공지로 사용합니다.
      </>
    ),
    code: `<Alert banner color="info" title="점검 안내">오늘 02:00~04:00 서비스 점검이 있습니다.</Alert>`,
    preview: (
      <div className="demo-stack">
        <Alert banner color="info" title="점검 안내">
          오늘 02:00~04:00 서비스 점검이 있습니다.
        </Alert>
      </div>
    )
  },
  {
    title: '접근성',
    description: (
      <>
        기본 <code>role</code>은 <code>alert</code>(즉시 읽힘)입니다.
        덜 긴급한 안내는 <code>role="status"</code>로 바꿉니다.
      </>
    ),
    code: `<Alert color="danger" title="오류">필수 항목을 입력해 주세요.</Alert>
<Alert role="status" color="info" title="안내">자동 저장되었습니다.</Alert>`,
    preview: (
      <div className="demo-stack">
        <Alert color="danger" title="오류">필수 항목을 입력해 주세요.</Alert>
        <Alert role="status" color="info" title="안내">자동 저장되었습니다.</Alert>
      </div>
    )
  }
]

/**
 * Alert 가이드 화면.
 * 유형·크기·아이콘·닫기·액션·배너 예시와 API 문서를 모은다.
 */
export default function AlertGuide () {
  return (
    <GuideLayout
      category="피드백"
      title="Alert"
      description="인라인 알림 배너. color · size · closable · actions · banner를 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={alertApiSections} />
    </GuideLayout>
  )
}
