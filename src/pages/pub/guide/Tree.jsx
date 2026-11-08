'use client'

import {
  DemoBlock,
  GuideApiDocs,
  GuideLayout,
  Tag,
  Tree,
  TreeNode
} from '@/comp'
import { treeApiSections } from '@/pages/pub/data/guide/treeApiSections'

function Check ({ label, checked = false }) {
  return (
    <label className="tree_check">
      <input type="checkbox" defaultChecked={checked} aria-label={label} />
    </label>
  )
}

const FileIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
)

const ImageIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
)

const FolderIcon = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const SECTIONS = [
  {
    title: '기본',
    description: (
      <>
        <code>TreeNode</code>를 중첩하고 <code>expanded</code> · <code>selected</code>로 상태를 지정합니다.
      </>
    ),
    code: `<Tree bordered ariaLabel="파일 탐색기">
  <TreeNode label="src" expanded toggleLabel="src 폴더 접기">
    <TreeNode label="components" expanded>
      <TreeNode label="button.html" selected />
      <TreeNode label="card.html" />
    </TreeNode>
    <TreeNode label="index.html" />
  </TreeNode>
  <TreeNode label="public" expanded={false}>…</TreeNode>
</Tree>`,
    preview: (
      <Tree bordered ariaLabel="파일 탐색기">
        <TreeNode label="src" expanded toggleLabel="src 폴더 접기">
          <TreeNode label="components" expanded toggleLabel="components 폴더 접기">
            <TreeNode label="button.html" selected />
            <TreeNode label="card.html" />
          </TreeNode>
          <TreeNode label="index.html" />
        </TreeNode>
        <TreeNode label="public" expanded={false} toggleLabel="public 폴더 펼치기">
          <TreeNode label="favicon.ico" />
        </TreeNode>
      </Tree>
    )
  },
  {
    title: '간단',
    description: '테두리 없이 카테고리형 트리를 구성합니다.',
    code: `<Tree ariaLabel="카테고리">
  <TreeNode label="전자기기" expanded>
    <TreeNode label="노트북" />
    <TreeNode label="스마트폰" />
  </TreeNode>
  <TreeNode label="의류" />
</Tree>`,
    preview: (
      <Tree ariaLabel="카테고리">
        <TreeNode label="전자기기" expanded toggleLabel="전자기기 접기">
          <TreeNode label="노트북" />
          <TreeNode label="스마트폰" />
        </TreeNode>
        <TreeNode label="의류" />
      </Tree>
    )
  },
  {
    title: '연결선',
    description: (
      <>
        <code>lines</code>로 계층 연결선을 표시합니다.
      </>
    ),
    code: `<Tree lines bordered ariaLabel="조직도">
  <TreeNode label="개발본부" expanded>…</TreeNode>
</Tree>`,
    preview: (
      <Tree lines bordered ariaLabel="조직도">
        <TreeNode label="개발본부" expanded toggleLabel="개발본부 접기">
          <TreeNode label="프론트엔드팀" expanded toggleLabel="프론트엔드팀 접기">
            <TreeNode label="홍길동" />
            <TreeNode label="김철수" />
          </TreeNode>
          <TreeNode label="백엔드팀" expanded={false} toggleLabel="백엔드팀 펼치기">
            <TreeNode label="이영희" />
          </TreeNode>
        </TreeNode>
        <TreeNode label="디자인본부" />
      </Tree>
    )
  },
  {
    title: '컴팩트',
    description: (
      <>
        <code>compact</code>로 행 밀도를 줄입니다.
      </>
    ),
    code: `<Tree compact bordered ariaLabel="권한 목록">…</Tree>`,
    preview: (
      <Tree compact bordered ariaLabel="권한 목록">
        <TreeNode label="관리자" expanded toggleLabel="관리자 접기">
          <TreeNode label="사용자 관리" />
          <TreeNode label="설정 변경" />
          <TreeNode label="로그 조회" />
        </TreeNode>
        <TreeNode label="편집자" expanded={false} toggleLabel="편집자 펼치기">
          <TreeNode label="콘텐츠 작성" />
        </TreeNode>
        <TreeNode label="뷰어" />
      </Tree>
    )
  },
  {
    title: '+/− 토글',
    description: (
      <>
        <code>plusToggle</code>로 +/− 토글 스타일을 사용합니다.
      </>
    ),
    code: `<Tree bordered>
  <TreeNode label="가이드" expanded plusToggle>…</TreeNode>
</Tree>`,
    preview: (
      <Tree bordered ariaLabel="메뉴 구조">
        <TreeNode label="가이드" expanded plusToggle toggleLabel="가이드 접기">
          <TreeNode label="시작하기" expanded plusToggle toggleLabel="시작하기 접기">
            <TreeNode label="설치" />
            <TreeNode label="빠른 시작" />
          </TreeNode>
          <TreeNode label="컴포넌트" expanded={false} plusToggle toggleLabel="컴포넌트 펼치기">
            <TreeNode label="Button" />
          </TreeNode>
        </TreeNode>
      </Tree>
    )
  },
  {
    title: '체크박스',
    description: (
      <>
        <code>prefix</code>에 체크박스를 두고 <code>multiselectable</code>을 켭니다.
      </>
    ),
    code: `<Tree bordered multiselectable>
  <TreeNode label="대시보드" expanded prefix={<Check label="대시보드" checked />}>
    <TreeNode label="조회" prefix={<Check label="조회" checked />} />
  </TreeNode>
</Tree>`,
    preview: (
      <Tree bordered multiselectable ariaLabel="권한 선택">
        <TreeNode
          label="대시보드"
          expanded
          toggleLabel="대시보드 접기"
          prefix={<Check label="대시보드" checked />}
        >
          <TreeNode label="조회" prefix={<Check label="조회" checked />} />
          <TreeNode label="보내기" prefix={<Check label="보내기" />} />
        </TreeNode>
        <TreeNode
          label="설정"
          expanded={false}
          toggleLabel="설정 펼치기"
          prefix={<Check label="설정" />}
        >
          <TreeNode label="사용자 관리" prefix={<Check label="사용자 관리" />} />
          <TreeNode label="알림 설정" prefix={<Check label="알림 설정" />} />
        </TreeNode>
      </Tree>
    )
  },
  {
    title: '메타 · 배지',
    description: (
      <>
        <code>icon</code> · <code>meta</code> · <code>metaSlot</code>으로 보조 정보를 붙입니다.
      </>
    ),
    code: `<Tree bordered>
  <TreeNode label="assets" meta="3개" icon={FolderIcon} expanded>
    <TreeNode label="logo.png" meta="24 KB" icon={ImageIcon} />
  </TreeNode>
  <TreeNode label="package.json" icon={FileIcon} metaSlot={<Tag label="수정됨" />} />
</Tree>`,
    preview: (
      <Tree bordered ariaLabel="프로젝트 파일">
        <TreeNode
          label="assets"
          meta="3개"
          expanded
          toggleLabel="assets 접기"
          icon={FolderIcon}
        >
          <TreeNode label="logo.png" meta="24 KB" icon={ImageIcon} />
          <TreeNode label="hero.jpg" meta="1.2 MB" icon={ImageIcon} />
          <TreeNode label="styles.css" meta="8 KB" icon={FileIcon} />
        </TreeNode>
        <TreeNode
          label="package.json"
          icon={FileIcon}
          metaSlot={<Tag color="default" label="수정됨" />}
        />
      </Tree>
    )
  },
  {
    title: '비활성',
    description: (
      <>
        <code>disabled</code>로 노드·토글을 비활성화합니다.
      </>
    ),
    code: `<Tree bordered>
  <TreeNode label="기본 기능" expanded>
    <TreeNode label="고급 분석 (Pro)" disabled />
  </TreeNode>
  <TreeNode label="베타 기능" disabled expanded={false}>…</TreeNode>
</Tree>`,
    preview: (
      <Tree bordered ariaLabel="기능 목록">
        <TreeNode label="기본 기능" expanded toggleLabel="기본 기능 접기">
          <TreeNode label="대시보드" />
          <TreeNode label="고급 분석 (Pro)" disabled />
          <TreeNode label="API 연동 (Enterprise)" disabled />
        </TreeNode>
        <TreeNode label="베타 기능" disabled expanded={false} toggleLabel="베타 기능 펼치기">
          <TreeNode label="AI 어시스턴트" disabled />
        </TreeNode>
      </Tree>
    )
  },
  {
    title: '선택 가능',
    description: (
      <>
        <code>link</code>으로 클릭 가능한 라벨을 만들고 <code>selected</code>로 현재 항목을 표시합니다.
      </>
    ),
    code: `<Tree bordered>
  <TreeNode label="문서" expanded link>
    <TreeNode label="시작하기" selected link />
    <TreeNode label="컴포넌트" link />
  </TreeNode>
</Tree>`,
    preview: (
      <Tree bordered ariaLabel="네비게이션">
        <TreeNode label="문서" expanded link toggleLabel="문서 접기">
          <TreeNode label="시작하기" selected link />
          <TreeNode label="컴포넌트" link />
          <TreeNode label="디자인 토큰" link />
        </TreeNode>
        <TreeNode label="변경 이력" link />
      </Tree>
    )
  }
]

/**
 * Tree 가이드 화면.
 * docs와 동일한 스킨·토글·체크·메타 예시와 API 문서를 모은다.
 */
export default function TreeGuide () {
  return (
    <GuideLayout
      category="데이터 표시"
      title="Tree"
      description="Tree · TreeNode로 계층을 구성하고 bordered · lines · compact · plusToggle · link를 조합합니다."
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

      <GuideApiDocs sections={treeApiSections} />
    </GuideLayout>
  )
}
