'use client'

import { Avatar, Button, Icon, List, ListItem } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/pages/pub/widgets/guide'
import { listApiSections } from '@/pages/pub/data/guide/listApiSections'

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        기본 목록은 <code>ListItem</code>의 title · meta · prefix로 구성합니다.
      </>
    ),
    code: wrapPageExample(`<List>
  <ListItem
    title="홍길동"
    meta="프론트엔드 개발자"
    prefix={<Avatar color="primary" initials="홍" ariaHidden />}
  />
  …
</List>`, {
      name: 'ListExample',
      reactImports: [],
      compImports: ['Avatar', 'List', 'ListItem']
    }),
    preview: (
      <List>
        <ListItem
          title="홍길동"
          meta="프론트엔드 개발자"
          prefix={<Avatar color="primary" initials="홍" ariaHidden />}
        />
        <ListItem
          title="김철수"
          meta="백엔드 개발자"
          prefix={<Avatar color="success" initials="김" ariaHidden />}
        />
        <ListItem
          title="이영희"
          meta="UI/UX 디자이너"
          prefix={<Avatar color="warning" initials="이" ariaHidden />}
        />
      </List>
    )
  },
  {
    title: '불릿',
    description: (
      <>
        <code>variant=&quot;bullet&quot;</code>로 점 목록을 만듭니다.
      </>
    ),
    code: wrapPageExample(`<List variant="bullet">
  <ListItem>디자인 토큰 정의</ListItem>
  <ListItem>컴포넌트 문서화</ListItem>
  <ListItem>접근성 검토</ListItem>
</List>`, {
      name: 'ListBulletExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <List variant="bullet">
        <ListItem>디자인 토큰 정의</ListItem>
        <ListItem>컴포넌트 문서화</ListItem>
        <ListItem>접근성 검토</ListItem>
      </List>
    )
  },
  {
    title: '불릿 · 설명',
    description: 'title · description으로 설명형 불릿을 구성합니다.',
    code: wrapPageExample(`<List variant="bullet">
  <ListItem title="HTML 마크업" description="시맨틱 태그와 ARIA 속성을 사용합니다." />
  …
</List>`, {
      name: 'ListBulletDescExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <List variant="bullet">
        <ListItem title="HTML 마크업" description="시맨틱 태그와 ARIA 속성을 사용합니다." />
        <ListItem title="SCSS 스타일" description="OOCSS 패턴으로 구조와 스킨을 분리합니다." />
        <ListItem title="접근성" description="WCAG 2.2 AA 기준을 준수합니다." />
      </List>
    )
  },
  {
    title: '불릿 변형',
    description: (
      <>
        <code>list_bullet-circle</code> · <code>list_bullet-square</code> 클래스로 마커를 바꿉니다.
      </>
    ),
    code: wrapPageExample(`<List variant="bullet" className="list_bullet-circle">…</List>
<List variant="bullet" className="list_bullet-square">…</List>`, {
      name: 'ListBulletVariantExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <>
        <List variant="bullet" className="list_bullet-circle">
          <ListItem>원형 마커 항목 A</ListItem>
          <ListItem>원형 마커 항목 B</ListItem>
        </List>
        <List variant="bullet" className="list_bullet-square">
          <ListItem>사각 마커 항목 A</ListItem>
          <ListItem>사각 마커 항목 B</ListItem>
        </List>
      </>
    )
  },
  {
    title: '번호',
    description: (
      <>
        <code>variant=&quot;ordered&quot;</code>로 번호 목록을 만듭니다.
      </>
    ),
    code: wrapPageExample(`<List variant="ordered">
  <ListItem>요구사항 분석</ListItem>
  …
</List>`, {
      name: 'ListOrderedExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <List variant="ordered">
        <ListItem>요구사항 분석</ListItem>
        <ListItem>와이어프레임 작성</ListItem>
        <ListItem>프로토타입 검증</ListItem>
        <ListItem>개발 및 배포</ListItem>
      </List>
    )
  },
  {
    title: '번호 변형',
    description: (
      <>
        <code>list_ordered-alpha</code> · <code>list_ordered-roman</code> 클래스로 번호 형식을 바꿉니다.
      </>
    ),
    code: wrapPageExample(`<List variant="ordered" className="list_ordered-alpha">…</List>
<List variant="ordered" className="list_ordered-roman">…</List>`, {
      name: 'ListOrderedVariantExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <>
        <List variant="ordered" className="list_ordered-alpha">
          <ListItem>첫 번째 옵션</ListItem>
          <ListItem>두 번째 옵션</ListItem>
        </List>
        <List variant="ordered" className="list_ordered-roman">
          <ListItem>서론</ListItem>
          <ListItem>본론</ListItem>
          <ListItem>결론</ListItem>
        </List>
      </>
    )
  },
  {
    title: '계층 번호',
    description: (
      <>
        <code>list_ordered-outline</code>과 중첩 List로 계층 번호를 표시합니다.
      </>
    ),
    code: wrapPageExample(`<List variant="ordered" className="list_ordered-outline">
  <ListItem>요구사항 정의</ListItem>
  <ListItem>
    설계
    <List variant="ordered" className="list_ordered-outline">
      <ListItem>정보 구조</ListItem>
      <ListItem>UI 설계</ListItem>
    </List>
  </ListItem>
  …
</List>`, {
      name: 'ListOutlineExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <List variant="ordered" className="list_ordered-outline">
        <ListItem>요구사항 정의</ListItem>
        <ListItem>
          설계
          <List variant="ordered" className="list_ordered-outline">
            <ListItem>정보 구조</ListItem>
            <ListItem>UI 설계</ListItem>
          </List>
        </ListItem>
        <ListItem>개발 및 배포</ListItem>
      </List>
    )
  },
  {
    title: '테두리',
    description: (
      <>
        <code>bordered</code>로 카드형 테두리 목록을 만듭니다.
      </>
    ),
    code: wrapPageExample(`<List bordered>
  <ListItem title="알림 설정" description="이메일 및 푸시 알림을 관리합니다." />
  …
</List>`, {
      name: 'ListBorderedExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <List bordered>
        <ListItem title="알림 설정" description="이메일 및 푸시 알림을 관리합니다." />
        <ListItem title="프로필 편집" description="이름, 사진, 소개를 변경합니다." />
        <ListItem title="보안" description="비밀번호 및 2단계 인증을 설정합니다." />
      </List>
    )
  },
  {
    title: '링크',
    description: (
      <>
        <code>split</code>과 <code>list_link</code>로 이동형 항목을 만듭니다.
      </>
    ),
    code: wrapPageExample(`<List split>
  <ListItem>
    <a className="list_link" href="#">
      <span className="list_title">홈</span>
      <Icon className="list_action" name="chevron" />
    </a>
  </ListItem>
</List>`, {
      name: 'ListLinkExample',
      reactImports: [],
      compImports: ['Icon', 'List', 'ListItem']
    }),
    preview: (
      <List split>
        {['홈', '프로젝트', '설정'].map((label) => (
          <ListItem key={label}>
            <a className="list_link" href="#guide-list-link">
              <span className="list_title">{label}</span>
              <Icon className="list_action" name="chevron" />
            </a>
          </ListItem>
        ))}
      </List>
    )
  },
  {
    title: '버튼 항목',
    description: (
      <>
        <code>button.list_link</code>으로 선택형 항목을 구성합니다.
      </>
    ),
    code: wrapPageExample(`<List bordered>
  <ListItem>
    <button className="list_link" type="button">
      <Avatar … />
      <span className="list_content">…</span>
    </button>
  </ListItem>
</List>`, {
      name: 'ListButtonExample',
      reactImports: [],
      compImports: ['Avatar', 'List', 'ListItem']
    }),
    preview: (
      <List bordered>
        {['홍길동', '김철수'].map((name, index) => (
          <ListItem key={name}>
            <button className="list_link" type="button">
              <Avatar color={index ? 'success' : 'primary'} initials={name[0]} ariaHidden />
              <span className="list_content">
                <span className="list_title">{name}</span>
                <span className="list_meta">멤버 선택</span>
              </span>
            </button>
          </ListItem>
        ))}
      </List>
    )
  },
  {
    title: '액션',
    description: (
      <>
        <code>actions</code>로 우측 버튼을 붙입니다.
      </>
    ),
    code: wrapPageExample(`<List bordered>
  <ListItem
    title="디자인 시스템"
    description="마지막 수정 2시간 전"
    actions={<Button variant="text" size="sm" label="열기" />}
  />
</List>`, {
      name: 'ListActionsExample',
      reactImports: [],
      compImports: ['Button', 'List', 'ListItem']
    }),
    preview: (
      <List bordered>
        <ListItem
          title="디자인 시스템"
          description="마지막 수정 2시간 전"
          actions={<Button variant="text" size="sm" label="열기" />}
        />
        <ListItem
          title="컴포넌트 가이드"
          description="마지막 수정 어제"
          actions={<Button variant="text" size="sm" label="열기" />}
        />
      </List>
    )
  },
  {
    title: '정의 목록',
    description: (
      <>
        <code>variant=&quot;definition&quot;</code>은 title · description을 dt · dd로 렌더합니다.
      </>
    ),
    code: wrapPageExample(`<List variant="definition" style={{ maxWidth: '34rem' }}>
  <ListItem title="OOCSS" description="구조와 스킨을 분리해…" />
  …
</List>`, {
      name: 'ListDefinitionExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <List variant="definition" style={{ maxWidth: '34rem' }}>
        <ListItem title="OOCSS" description="구조와 스킨을 분리해 클래스를 조합하는 CSS 방법론입니다." />
        <ListItem title="Design Token" description="색상·간격·타이포 값을 변수로 정의한 것입니다." />
        <ListItem title="WCAG" description="웹 콘텐츠 접근성 지침입니다." />
      </List>
    )
  },
  {
    title: '정의 목록 · 인라인',
    description: (
      <>
        <code>layout=&quot;inline&quot;</code>과 <code>inlineLabelWidth</code>로 가로 배치합니다.
      </>
    ),
    code: wrapPageExample(`<List variant="definition" layout="inline" inlineLabelWidth="8rem">
  <ListItem title="OOCSS" description="구조와 스킨 분리" />
  …
</List>`, {
      name: 'ListDefinitionInlineExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <List variant="definition" layout="inline" inlineLabelWidth="8rem">
        <ListItem title="OOCSS" description="구조와 스킨 분리" />
        <ListItem title="Design Token" description="디자인 값 변수화" />
        <ListItem title="WCAG" description="웹 접근성 지침" />
      </List>
    )
  },
  {
    title: '정의 목록 · 우측 정렬',
    description: (
      <>
        <code>descAlign=&quot;right&quot;</code> · <code>block</code>으로 설명 정렬과 너비를 맞춥니다.
      </>
    ),
    code: wrapPageExample(`<List variant="definition" layout="inline" descAlign="right" block>
  <ListItem title="주문번호" description="ORD-2024-0815" />
  …
</List>`, {
      name: 'ListDefinitionAlignExample',
      reactImports: [],
      compImports: ['List', 'ListItem']
    }),
    preview: (
      <List variant="definition" layout="inline" descAlign="right" block>
        <ListItem title="주문번호" description="ORD-2024-0815" />
        <ListItem title="결제금액" description="₩42,000" />
        <ListItem title="배송지" description="서울특별시 강남구" />
      </List>
    )
  }
]

/**
 * List 가이드 화면.
 * docs와 동일한 변형·정의 목록·액션 예시와 API 문서를 모은다.
 */
export default function ListGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="List"
      description="List · ListItem으로 기본·불릿·번호·정의 목록을 구성하고 bordered · split · layout 옵션을 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="ListExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={listApiSections} />
    </GuideLayout>
  )
}
