'use client'

import {
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Tag,
  Timeline,
  TimelineItem
} from '@/comp'
import { timelineApiSections } from '@/pages/pub/data/guide/timelineApiSections'

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>TimelineItem</code>의 time · title · description과 color로 이벤트를 나열합니다.
      </>
    ),
    code: `<Timeline>
  <TimelineItem
    color="primary"
    time="2024-06-01 10:00"
    datetime="2024-06-01"
    title="프로젝트 킥오프"
    description="팀 미팅을 통해 프로젝트 범위와 일정을 확정했습니다."
  />
  …
</Timeline>`,
    preview: (
      <Timeline>
        <TimelineItem
          color="primary"
          time="2024-06-01 10:00"
          datetime="2024-06-01"
          title="프로젝트 킥오프"
          description="팀 미팅을 통해 프로젝트 범위와 일정을 확정했습니다."
        />
        <TimelineItem
          color="success"
          time="2024-06-10 14:30"
          datetime="2024-06-10"
          title="1차 릴리스 완료"
          description="MVP 기능이 프로덕션에 배포되었습니다."
        />
        <TimelineItem
          color="warning"
          time="2024-06-15 09:00"
          datetime="2024-06-15"
          title="성능 이슈 발견"
          description="대시보드 로딩 시간이 기준을 초과하여 조사를 시작했습니다."
        />
        <TimelineItem
          color="danger"
          time="2024-06-18 16:00"
          datetime="2024-06-18"
          title="긴급 패치 배포"
          description="인증 관련 보안 취약점을 수정하는 핫픽스를 배포했습니다."
        />
      </Timeline>
    )
  },
  {
    title: '간단',
    description: '제목과 시간만으로 짧은 단계를 표시합니다.',
    code: `<Timeline>
  <TimelineItem color="primary" title="주문 접수" time="오전 9:12" datetime="2024-06-20" />
  …
</Timeline>`,
    preview: (
      <Timeline>
        <TimelineItem color="primary" title="주문 접수" time="오전 9:12" datetime="2024-06-20" />
        <TimelineItem color="primary" title="배송 준비 중" time="오전 11:45" datetime="2024-06-20" />
        <TimelineItem color="success" title="배송 완료" time="오후 2:30" datetime="2024-06-21" />
      </Timeline>
    )
  },
  {
    title: '아웃라인 도트',
    description: (
      <>
        <code>outline</code> · <code>active</code> · <code>pending</code>으로 진행 상태를 표현합니다.
      </>
    ),
    code: `<Timeline>
  <TimelineItem outline color="primary" title="기획 단계" description="…" />
  <TimelineItem outline color="primary" title="개발 단계" … active />
  <TimelineItem outline title="배포 단계" … pending />
</Timeline>`,
    preview: (
      <Timeline>
        <TimelineItem outline color="primary" title="기획 단계" description="요구사항 정의 및 와이어프레임 작성" />
        <TimelineItem outline color="primary" title="디자인 단계" description="UI 키트 및 프로토타입 제작" />
        <TimelineItem
          outline
          color="primary"
          title="개발 단계"
          description="컴포넌트 구현 및 통합 테스트 진행 중"
          active
        />
        <TimelineItem outline title="배포 단계" description="스테이징 검증 후 프로덕션 릴리스 예정" pending />
      </Timeline>
    )
  },
  {
    title: '아이콘 도트',
    description: (
      <>
        <code>icon</code> · <code>iconSize</code>로 도트를 아이콘형으로 키웁니다.
      </>
    ),
    code: `<Timeline icon iconSize="sm">
  <TimelineItem color="primary" time="2024-06-01" … />
  …
</Timeline>`,
    preview: (
      <Timeline icon iconSize="sm">
        <TimelineItem
          color="primary"
          time="2024-06-01"
          datetime="2024-06-01"
          title="팀원 합류"
          description="프론트엔드 개발자 2명이 프로젝트에 참여했습니다."
        />
        <TimelineItem
          color="success"
          time="2024-06-10"
          datetime="2024-06-10"
          title="QA 통과"
          description="회귀 테스트 142건 모두 통과했습니다."
        />
        <TimelineItem
          color="warning"
          time="2024-06-15"
          datetime="2024-06-15"
          title="일정 지연 알림"
          description="외부 API 연동 이슈로 1주일 일정이 조정되었습니다."
        />
        <TimelineItem
          color="danger"
          time="2024-06-18"
          datetime="2024-06-18"
          title="배포 롤백"
          description="결제 모듈 오류로 이전 버전으로 롤백했습니다."
        />
      </Timeline>
    )
  },
  {
    title: '카드형',
    description: (
      <>
        <code>card</code>와 <code>meta</code>(Tag 등)로 카드형 이벤트를 구성합니다.
      </>
    ),
    code: `<Timeline card>
  <TimelineItem
    color="primary"
    title="디자인 시스템 v2.0 릴리스"
    description="…"
    meta={<><Tag color="primary" label="Release" /><Tag color="default" label="Design" /></>}
  />
</Timeline>`,
    preview: (
      <Timeline card>
        <TimelineItem
          color="primary"
          time="2024-06-20 09:00"
          datetime="2024-06-20"
          title="디자인 시스템 v2.0 릴리스"
          description="타이포그래피·컬러 토큰이 업데이트되었습니다. 기존 컴포넌트와 하위 호환됩니다."
          meta={(
            <>
              <Tag color="primary" label="Release" />
              <Tag color="default" label="Design" />
            </>
          )}
        />
        <TimelineItem
          color="success"
          time="2024-06-22 14:00"
          datetime="2024-06-22"
          title="접근성 감사 완료"
          description="WCAG 2.2 AA 기준 47개 항목 검토를 마쳤습니다."
          meta={(
            <>
              <Tag color="success" label="Passed" />
              <Tag color="default" label="A11y" />
            </>
          )}
        />
        <TimelineItem
          color="info"
          time="2024-06-25 11:30"
          datetime="2024-06-25"
          title="문서 업데이트 예정"
          description="Button · Timeline 컴포넌트 가이드가 추가됩니다."
          meta={<Tag color="info" label="Docs" />}
        />
      </Timeline>
    )
  },
  {
    title: '날짜 레이블',
    description: (
      <>
        <code>labelCol</code>과 item <code>label</code>로 왼쪽 날짜 열을 둡니다.
      </>
    ),
    code: `<Timeline labelCol>
  <TimelineItem label="2024 Q1" labelDatetime="2024-01" color="primary" title="알파 버전 출시" … />
  …
</Timeline>`,
    preview: (
      <Timeline labelCol>
        <TimelineItem
          label="2024 Q1"
          labelDatetime="2024-01"
          color="primary"
          title="알파 버전 출시"
          description="내부 테스트용 알파 빌드를 배포했습니다."
        />
        <TimelineItem
          label="2024 Q2"
          labelDatetime="2024-04"
          color="primary"
          title="베타 공개"
          description="선택 파트너사 대상 베타 프로그램을 시작했습니다."
        />
        <TimelineItem
          label="2024 Q3"
          labelDatetime="2024-07"
          color="success"
          title="정식 출시"
          description="GA 버전이 프로덕션에 배포되었습니다."
        />
        <TimelineItem
          label="2024 Q4"
          labelDatetime="2024-10"
          color="primary"
          title="엔터프라이즈 기능"
          description="SSO · 감사 로그 · 역할 기반 접근 제어를 추가합니다."
        />
      </Timeline>
    )
  },
  {
    title: '좌우 교차',
    description: (
      <>
        <code>alternate</code>로 항목을 좌우로 교차 배치합니다.
      </>
    ),
    code: `<Timeline alternate>
  <TimelineItem color="primary" time="2024년 3월" title="회사 설립" … />
  …
</Timeline>`,
    preview: (
      <Timeline alternate>
        <TimelineItem
          color="primary"
          time="2024년 3월"
          datetime="2024-03"
          title="회사 설립"
          description="UXKM 팀이 공식적으로 출범했습니다."
        />
        <TimelineItem
          color="primary"
          time="2024년 6월"
          datetime="2024-06"
          title="컴포넌트 가이드 오픈"
          description="HTML 컴포넌트 라이브러리 문서를 공개했습니다."
        />
        <TimelineItem
          color="success"
          time="2024년 9월"
          datetime="2024-09"
          title="1,000 스타 달성"
          description="GitHub 저장소가 1,000 스타를 돌파했습니다."
        />
        <TimelineItem
          color="info"
          time="2025년 1월"
          datetime="2025-01"
          title="v2 로드맵 공개"
          description="다크 모드 · RTL · 접근성 강화 계획을 발표했습니다."
        />
      </Timeline>
    )
  },
  {
    title: '가로형',
    description: (
      <>
        <code>horizontal</code>로 프로세스형 가로 배치를 만듭니다.
      </>
    ),
    code: `<Timeline horizontal>
  <TimelineItem color="success" title="신청" time="6/20" />
  <TimelineItem color="primary" title="승인" time="진행 중" active />
  <TimelineItem title="완료" time="예정" pending />
</Timeline>`,
    preview: (
      <Timeline horizontal>
        <TimelineItem color="success" title="신청" time="6/20" datetime="2024-06-20" />
        <TimelineItem color="success" title="심사" time="6/21" datetime="2024-06-21" />
        <TimelineItem color="primary" title="승인" time="진행 중" datetime="2024-06-22" active />
        <TimelineItem title="완료" time="예정" pending />
      </Timeline>
    )
  },
  {
    title: '크기',
    description: (
      <>
        <code>size</code>는 sm · md · lg입니다.
      </>
    ),
    code: `<Timeline size="sm">…</Timeline>
<Timeline size="lg">…</Timeline>`,
    preview: (
      <div className="typo_stack">
        <div>
          <p className="demo-label">Small</p>
          <Timeline size="sm">
            <TimelineItem color="primary" title="알림 발송" time="10:30" />
            <TimelineItem color="success" title="수신 확인" time="10:31" />
          </Timeline>
        </div>
        <div>
          <p className="demo-label">Large</p>
          <Timeline size="lg">
            <TimelineItem
              color="primary"
              title="연간 컨퍼런스"
              description="2024 UX 디자인 서밋 참가"
              time="2024-11-15"
              datetime="2024-11-15"
            />
            <TimelineItem
              color="success"
              title="워크숍 진행"
              description="디자인 토큰 실습 세션"
              time="2024-11-16"
              datetime="2024-11-16"
            />
          </Timeline>
        </div>
      </div>
    )
  },
  {
    title: '상태',
    description: (
      <>
        완료 · 진행(<code>active</code>) · 대기(<code>pending</code>) 상태를 조합합니다.
      </>
    ),
    code: `<Timeline>
  <TimelineItem color="success" title="계정 생성" time="완료" />
  <TimelineItem color="primary" title="팀 초대" time="진행 중" active />
  <TimelineItem title="첫 프로젝트 생성" time="대기" pending />
</Timeline>`,
    preview: (
      <Timeline>
        <TimelineItem color="success" title="계정 생성" time="완료" />
        <TimelineItem color="success" title="프로필 설정" time="완료" />
        <TimelineItem color="primary" title="팀 초대" time="진행 중" active />
        <TimelineItem title="첫 프로젝트 생성" time="대기" pending />
      </Timeline>
    )
  }
]

/**
 * Timeline 가이드 화면.
 * docs와 동일한 레이아웃·상태 예시와 API 문서를 모은다.
 */
export default function TimelineGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Timeline"
      description="Timeline · TimelineItem으로 시간순 이벤트를 구성하고 card · alternate · horizontal · labelCol · icon을 조합합니다."
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

      <GuideApiDocs sections={timelineApiSections} />
    </GuideLayout>
  )
}
