'use client'

import { useState } from 'react'
import { Button, Icon } from '@/comp'
import { DemoBlock, GuideApiDocs, GuideLayout, wrapPageExample } from '@/screens/pub/widgets/guide'
import { buttonApiSections } from '@/screens/pub/data/guide/buttonApiSections'

const icon = (name) => <Icon name={name} />

/** onClick 으로 페이지 상태를 갱신하는 예시 */
function ClickDemo () {
  const [count, setCount] = useState(0)

  return (
    <div className="demo-stack">
      <div className="btn_row btn_row-wrap">
        <Button label="클릭" onClick={() => setCount((prev) => prev + 1)} />
        <Button variant="outline" label="초기화" onClick={() => setCount(0)} />
      </div>
      <p className="color_muted size_sm">클릭 횟수: {count}</p>
    </div>
  )
}

const SECTIONS = [
  {
    title: '기본 유형',
    description: (
      <>
        <code>btn_filled</code> · <code>btn_outline</code> · <code>btn_ghost</code> · <code>btn_text</code> 네 가지 기본 스킨을 제공합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button variant="filled" color="primary" label="Filled Primary" />
  <Button variant="filled" color="default" label="Filled Default" />
  <Button variant="outline" color="primary" label="Outline" />
  <Button variant="ghost" label="Ghost" />
  <Button variant="text" color="primary" label="Text" />
</div>
<div className="btn_row btn_row-wrap">
  <Button color="success" label="Success" />
  <Button color="warning" label="Warning" />
  <Button color="danger" label="Danger" />
  <Button variant="text" color="muted" label="Text Muted" />
  <Button variant="text" color="danger" label="Text Danger" />
</div>`, {
  name: 'ButtonBasicExample',
  reactImports: [],
  compImports: ['Button']
}),
    preview: (
      <div className="demo-stack">
        <div className="btn_row btn_row-wrap">
          <Button variant="filled" color="primary" label="Filled Primary" />
          <Button variant="filled" color="default" label="Filled Default" />
          <Button variant="outline" color="primary" label="Outline" />
          <Button variant="ghost" label="Ghost" />
          <Button variant="text" color="primary" label="Text" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button color="success" label="Success" />
          <Button color="warning" label="Warning" />
          <Button color="danger" label="Danger" />
          <Button variant="text" color="muted" label="Text Muted" />
          <Button variant="text" color="danger" label="Text Danger" />
        </div>
      </div>
    )
  },
  {
    title: '셀렉트 박스형',
    description: (
      <>
        <code>btn_select</code>로 셀렉트 박스처럼 표시합니다. <code>btn_select-text</code>는 배경·테두리 없는 텍스트 형태입니다.
        드롭다운·팝오버 트리거로 사용하며 <code>aria-haspopup</code>과 <code>aria-expanded</code>를 지정합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button variant="select" label="서울특별시" haspopup="listbox" />
  <Button variant="select" placeholder label="옵션을 선택하세요" haspopup="listbox" />
  <Button variant="select" open label="카테고리" haspopup="listbox" />
</div>
<div className="btn_row btn_row-wrap">
  <Button variant="select" size="sm" label="Small" />
  <Button variant="select" label="Medium" />
  <Button variant="select" size="lg" label="Large" />
  <Button variant="select" disabled label="비활성" />
  <Button variant="select" error invalid label="필수 선택" />
</div>
<Button variant="select" block label="전체 너비 셀렉트 트리거" />
<div className="btn_row btn_row-wrap">
  <Button variant="select" selectText label="최신순" />
  <Button variant="select" selectText placeholder label="정렬 기준" />
  <Button variant="select" selectText open label="필터" />
  <Button variant="select" selectText size="sm" label="Small" />
  <Button variant="select" selectText disabled label="비활성" />
</div>`, {
  name: 'ButtonSelectExample',
  reactImports: [],
  compImports: ['Button']
}),
    preview: (
      <div className="demo-stack">
        <div className="btn_row btn_row-wrap">
          <Button variant="select" label="서울특별시" haspopup="listbox" />
          <Button variant="select" placeholder label="옵션을 선택하세요" haspopup="listbox" />
          <Button variant="select" open label="카테고리" haspopup="listbox" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button variant="select" size="sm" label="Small" />
          <Button variant="select" label="Medium" />
          <Button variant="select" size="lg" label="Large" />
          <Button variant="select" disabled label="비활성" />
          <Button variant="select" error invalid label="필수 선택" />
        </div>
        <Button variant="select" block label="전체 너비 셀렉트 트리거" />
        <div className="btn_row btn_row-wrap">
          <Button variant="select" selectText label="최신순" />
          <Button variant="select" selectText placeholder label="정렬 기준" />
          <Button variant="select" selectText open label="필터" />
          <Button variant="select" selectText size="sm" label="Small" />
          <Button variant="select" selectText disabled label="비활성" />
        </div>
      </div>
    )
  },
  {
    title: '텍스트 버튼',
    description: (
      <>
        <code>btn_text</code> 계열 스킨으로 배경·테두리 없이 표시합니다.
        primary, muted, danger 등 색상 변형과 아이콘·크기·상태 조합을 지원합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button variant="text" label="Primary" />
  <Button variant="text" color="muted" label="Muted" />
  <Button variant="text" color="danger" label="Danger" />
  <Button variant="text" color="success" label="Success" />
  <Button variant="text" color="warning" label="Warning" />
</div>
<div className="btn_row btn_row-wrap">
  <Button variant="text" color="danger" label="삭제" iconBefore={<Icon name="trash" />} />
  <Button variant="text" color="success" label="완료" iconBefore={<Icon name="check" />} />
  <Button variant="text" color="warning" label="주의" iconAfter={<Icon name="warning" />} />
  <Button variant="text" color="muted" label="자세히" iconAfter={<Icon name="chevron" />} />
</div>
<div className="btn_row btn_row-wrap">
  <Button variant="text" label="더 보기" />
  <Button variant="text" label="링크 복사" />
  <Button variant="text" label="취소" />
  <Button variant="text" label="건너뛰기" />
</div>
<div className="btn_row btn_row-wrap">
  <Button variant="text" label="추가" iconBefore={<Icon name="plus" />} />
  <Button variant="text" label="다운로드" iconBefore={<Icon name="download" />} />
  <Button variant="text" label="링크 열기" iconBefore={<Icon name="external" />} />
  <Button variant="text" label="설정" iconBefore={<Icon name="settings" />} />
</div>
<div className="btn_row btn_row-wrap">
  <Button variant="text" label="다음" iconAfter={<Icon name="chevron" />} />
  <Button variant="text" label="전체 보기" iconAfter={<Icon name="chevron" />} />
  <Button variant="text" label="삭제" iconAfter={<Icon name="trash" />} />
  <Button variant="text" label="새로고침" iconAfter={<Icon name="refresh" />} />
</div>
<div className="btn_row btn_row-wrap">
  <Button variant="text" size="sm" label="Small" />
  <Button variant="text" label="Medium" />
  <Button variant="text" size="lg" label="Large" />
  <Button variant="text" size="sm" label="추가" iconBefore={<Icon name="plus" />} />
  <Button variant="text" size="lg" label="다음" iconAfter={<Icon name="chevron" />} />
</div>
<div className="btn_row btn_row-wrap">
  <Button variant="text" iconOnly ariaLabel="검색" iconBefore={<Icon name="search" />} />
  <Button variant="text" iconOnly ariaLabel="편집" iconBefore={<Icon name="edit" />} />
  <Button variant="text" iconOnly size="sm" ariaLabel="닫기" iconBefore={<Icon name="close" />} />
  <Button variant="text" disabled label="비활성" />
  <Button variant="text" ariaDisabled label="is-disabled" iconAfter={<Icon name="chevron" />} />
</div>
<Button variant="text" block label="전체 너비 텍스트 버튼" />`, {
  name: 'ButtonTextExample',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="demo-stack">
        <div className="btn_row btn_row-wrap">
          <Button variant="text" label="Primary" />
          <Button variant="text" color="muted" label="Muted" />
          <Button variant="text" color="danger" label="Danger" />
          <Button variant="text" color="success" label="Success" />
          <Button variant="text" color="warning" label="Warning" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button variant="text" color="danger" label="삭제" iconBefore={icon('trash')} />
          <Button variant="text" color="success" label="완료" iconBefore={icon('check')} />
          <Button variant="text" color="warning" label="주의" iconAfter={icon('warning')} />
          <Button variant="text" color="muted" label="자세히" iconAfter={icon('chevron')} />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button variant="text" label="더 보기" />
          <Button variant="text" label="링크 복사" />
          <Button variant="text" label="취소" />
          <Button variant="text" label="건너뛰기" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button variant="text" label="추가" iconBefore={icon('plus')} />
          <Button variant="text" label="다운로드" iconBefore={icon('download')} />
          <Button variant="text" label="링크 열기" iconBefore={icon('external')} />
          <Button variant="text" label="설정" iconBefore={icon('settings')} />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button variant="text" label="다음" iconAfter={icon('chevron')} />
          <Button variant="text" label="전체 보기" iconAfter={icon('chevron')} />
          <Button variant="text" label="삭제" iconAfter={icon('trash')} />
          <Button variant="text" label="새로고침" iconAfter={icon('refresh')} />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button variant="text" size="sm" label="Small" />
          <Button variant="text" label="Medium" />
          <Button variant="text" size="lg" label="Large" />
          <Button variant="text" size="sm" label="추가" iconBefore={icon('plus')} />
          <Button variant="text" size="lg" label="다음" iconAfter={icon('chevron')} />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button variant="text" iconOnly ariaLabel="검색" iconBefore={icon('search')} />
          <Button variant="text" iconOnly ariaLabel="편집" iconBefore={icon('edit')} />
          <Button variant="text" iconOnly size="sm" ariaLabel="닫기" iconBefore={icon('close')} />
          <Button variant="text" disabled label="비활성" />
          <Button variant="text" ariaDisabled label="is-disabled" iconAfter={icon('chevron')} />
        </div>
        <Button variant="text" block label="전체 너비 텍스트 버튼" />
      </div>
    )
  },
  {
    title: '아이콘 + 텍스트',
    description: (
      <>
        아이콘과 함께 사용하는 텍스트도 <code>btn_label</code> 클래스로 감쌉니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button label="추가" iconBefore={<Icon name="plus" />} />
  <Button color="default" label="다운로드" iconBefore={<Icon name="download" />} />
  <Button variant="outline" label="새 항목" iconBefore={<Icon name="plus" />} />
</div>`, {
  name: 'ButtonIconExample',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="btn_row btn_row-wrap">
        <Button label="추가" iconBefore={icon('plus')} />
        <Button color="default" label="다운로드" iconBefore={icon('download')} />
        <Button variant="outline" label="새 항목" iconBefore={icon('plus')} />
      </div>
    )
  },
  {
    title: '아이콘 + 텍스트 (세로)',
    description: (
      <>
        <code>btn_vertical</code>로 아이콘을 위·텍스트를 아래에 배치합니다. 하단 탭·퀵 액션 등에 사용합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button vertical label="홈" iconBefore={<Icon name="home" />} />
  <Button color="default" vertical label="검색" iconBefore={<Icon name="search" />} />
  <Button variant="ghost" vertical label="마이" iconBefore={<Icon name="user" />} />
  <Button variant="text" vertical label="추가" iconBefore={<Icon name="plus" />} />
  <Button variant="outline" vertical label="다운로드" iconBefore={<Icon name="download" />} />
</div>
<div className="btn_row btn_row-wrap">
  <Button vertical size="sm" label="추가" iconBefore={<Icon name="plus" />} />
  <Button vertical label="추가" iconBefore={<Icon name="plus" />} />
  <Button vertical size="lg" label="추가" iconBefore={<Icon name="plus" />} />
</div>
<div className="btn_row btn_row-wrap">
  <Button color="default" vertical round label="가이드" iconBefore={<Icon name="book" />} />
  <Button vertical round label="즐겨찾기" iconBefore={<Icon name="star" />} />
  <Button variant="ghost" vertical disabled label="삭제" iconBefore={<Icon name="trash" />} />
  <Button vertical loading label="저장 중" />
</div>`, {
  name: 'ButtonIconExample2',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="demo-stack">
        <div className="btn_row btn_row-wrap">
          <Button vertical label="홈" iconBefore={icon('home')} />
          <Button color="default" vertical label="검색" iconBefore={icon('search')} />
          <Button variant="ghost" vertical label="마이" iconBefore={icon('user')} />
          <Button variant="text" vertical label="추가" iconBefore={icon('plus')} />
          <Button variant="outline" vertical label="다운로드" iconBefore={icon('download')} />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button vertical size="sm" label="추가" iconBefore={icon('plus')} />
          <Button vertical label="추가" iconBefore={icon('plus')} />
          <Button vertical size="lg" label="추가" iconBefore={icon('plus')} />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button color="default" vertical round label="가이드" iconBefore={icon('book')} />
          <Button vertical round label="즐겨찾기" iconBefore={icon('star')} />
          <Button variant="ghost" vertical disabled label="삭제" iconBefore={icon('trash')} />
          <Button vertical loading label="저장 중" />
        </div>
      </div>
    )
  },
  {
    title: '아이콘 + 텍스트 (세로) · 균등 배분',
    description: (
      <>
        <code>btn_vertical</code>과 <code>btn_row-equal</code>을 함께 사용하면 부모 100% 너비에서 버튼을 균등 분배합니다.
        하단 탭 바 등에 사용합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row-equal">
  <Button variant="text" vertical label="홈" iconBefore={<Icon name="home" />} />
  <Button variant="text" vertical label="카테고리" iconBefore={<Icon name="grid" />} />
  <Button vertical label="장바구니" iconBefore={<Icon name="cart" />} />
  <Button variant="text" vertical label="마이" iconBefore={<Icon name="user" />} />
</div>`, {
  name: 'ButtonIconExample3',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="btn_row-equal">
        <Button variant="text" vertical label="홈" iconBefore={icon('home')} />
        <Button variant="text" vertical label="카테고리" iconBefore={icon('grid')} />
        <Button vertical label="장바구니" iconBefore={icon('cart')} />
        <Button variant="text" vertical label="마이" iconBefore={icon('user')} />
      </div>
    )
  },
  {
    title: '텍스트 + 아이콘',
    description: (
      <>
        텍스트를 앞에 두고 아이콘을 뒤에 배치합니다. 텍스트는 <code>btn_label</code>로 감쌉니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button label="다음" iconAfter={<Icon name="chevron" />} />
  <Button color="default" label="자세히 보기" iconAfter={<Icon name="external" />} />
  <Button variant="text" label="링크 이동" iconAfter={<Icon name="chevron" />} />
</div>`, {
  name: 'ButtonIconExample4',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="btn_row btn_row-wrap">
        <Button label="다음" iconAfter={icon('chevron')} />
        <Button color="default" label="자세히 보기" iconAfter={icon('external')} />
        <Button variant="text" label="링크 이동" iconAfter={icon('chevron')} />
      </div>
    )
  },
  {
    title: '아이콘 버튼',
    description: (
      <>
        텍스트 없이 아이콘만 표시합니다. <code>btn_icon-only</code>와 함께 사용하며, 접근성을 위해 <code>aria-label</code>을 반드시 지정합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button iconOnly ariaLabel="추가" iconBefore={<Icon name="plus" />} />
  <Button color="default" iconOnly ariaLabel="설정" iconBefore={<Icon name="settings" />} />
  <Button variant="ghost" iconOnly ariaLabel="검색" iconBefore={<Icon name="search" />} />
  <Button variant="outline" iconOnly ariaLabel="편집" iconBefore={<Icon name="edit" />} />
  <Button color="danger" iconOnly ariaLabel="삭제" iconBefore={<Icon name="trash" />} />
  <Button iconOnly disabled ariaLabel="추가" iconBefore={<Icon name="plus" />} />
</div>`, {
  name: 'ButtonIconExample5',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="btn_row btn_row-wrap">
        <Button iconOnly ariaLabel="추가" iconBefore={icon('plus')} />
        <Button color="default" iconOnly ariaLabel="설정" iconBefore={icon('settings')} />
        <Button variant="ghost" iconOnly ariaLabel="검색" iconBefore={icon('search')} />
        <Button variant="outline" iconOnly ariaLabel="편집" iconBefore={icon('edit')} />
        <Button color="danger" iconOnly ariaLabel="삭제" iconBefore={icon('trash')} />
        <Button iconOnly disabled ariaLabel="추가" iconBefore={icon('plus')} />
      </div>
    )
  },
  {
    title: '아이콘 버튼 크기',
    description: (
      <>
        <code>btn_sm</code>, medium, <code>btn_lg</code> 세 가지 크기를 지원합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button iconOnly size="sm" ariaLabel="추가 (small)" iconBefore={<Icon name="plus" />} />
  <Button iconOnly ariaLabel="추가 (medium)" iconBefore={<Icon name="plus" />} />
  <Button iconOnly size="lg" ariaLabel="추가 (large)" iconBefore={<Icon name="plus" />} />
  <Button color="default" iconOnly size="sm" ariaLabel="다운로드 (small)" iconBefore={<Icon name="download" />} />
  <Button color="default" iconOnly ariaLabel="다운로드 (medium)" iconBefore={<Icon name="download" />} />
  <Button color="default" iconOnly size="lg" ariaLabel="다운로드 (large)" iconBefore={<Icon name="download" />} />
</div>`, {
  name: 'ButtonSizeExample',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="btn_row btn_row-wrap">
        <Button iconOnly size="sm" ariaLabel="추가 (small)" iconBefore={icon('plus')} />
        <Button iconOnly ariaLabel="추가 (medium)" iconBefore={icon('plus')} />
        <Button iconOnly size="lg" ariaLabel="추가 (large)" iconBefore={icon('plus')} />
        <Button color="default" iconOnly size="sm" ariaLabel="다운로드 (small)" iconBefore={icon('download')} />
        <Button color="default" iconOnly ariaLabel="다운로드 (medium)" iconBefore={icon('download')} />
        <Button color="default" iconOnly size="lg" ariaLabel="다운로드 (large)" iconBefore={icon('download')} />
      </div>
    )
  },
  {
    title: '색상 변형',
    description: <>상황에 맞는 색상 변형을 사용합니다.</>,
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button color="success" label="Success" />
  <Button color="danger" label="Danger" />
  <Button color="warning" label="Warning" />
  <Button variant="outline" label="Outline" />
</div>`, {
  name: 'ButtonColorExample',
  reactImports: [],
  compImports: ['Button']
}),
    preview: (
      <div className="btn_row btn_row-wrap">
        <Button color="success" label="Success" />
        <Button color="danger" label="Danger" />
        <Button color="warning" label="Warning" />
        <Button variant="outline" label="Outline" />
      </div>
    )
  },
  {
    title: '크기',
    description: <>small, medium, large 세 가지 크기를 지원합니다.</>,
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button size="sm" label="Small" />
  <Button size="md" label="Medium" />
  <Button size="lg" label="Large" />
</div>`, {
  name: 'ButtonSizeExample2',
  reactImports: [],
  compImports: ['Button']
}),
    preview: (
      <div className="btn_row btn_row-wrap">
        <Button size="sm" label="Small" />
        <Button size="md" label="Medium" />
        <Button size="lg" label="Large" />
      </div>
    )
  },
  {
    title: '라운드',
    description: (
      <>
        <code>btn_round</code>로 pill(캡슐) 형태의 둥근 모서리를 적용합니다.
        <code>btn_icon-only</code>와 조합하면 원형 아이콘 버튼이 됩니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button round label="Primary" />
  <Button color="default" round label="Default" />
  <Button variant="ghost" round label="Ghost" />
  <Button variant="outline" round label="Outline" />
  <Button color="success" round label="Success" />
  <Button color="danger" round label="Danger" />
</div>
<div className="btn_row btn_row-wrap">
  <Button round size="sm" label="Small" />
  <Button round label="Medium" />
  <Button round size="lg" label="Large" />
</div>
<div className="btn_row btn_row-wrap">
  <Button round label="추가" iconBefore={<Icon name="plus" />} />
  <Button color="default" round label="다음" iconAfter={<Icon name="chevron" />} />
  <Button variant="text" round label="더 보기" />
</div>
<div className="btn_row btn_row-wrap">
  <Button round iconOnly ariaLabel="추가" iconBefore={<Icon name="plus" />} />
  <Button color="default" round iconOnly ariaLabel="설정" iconBefore={<Icon name="settings" />} />
  <Button variant="outline" round iconOnly size="sm" ariaLabel="검색" iconBefore={<Icon name="search" />} />
  <Button color="danger" round iconOnly size="lg" ariaLabel="삭제" iconBefore={<Icon name="trash" />} />
</div>
<div className="btn_group btn_group-round btn_group-fit">
  <Button color="default" label="일" />
  <Button color="default" label="주" />
  <Button label="월" />
  <Button color="default" label="년" />
</div>`, {
  name: 'ButtonExample12',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="demo-stack">
        <div className="btn_row btn_row-wrap">
          <Button round label="Primary" />
          <Button color="default" round label="Default" />
          <Button variant="ghost" round label="Ghost" />
          <Button variant="outline" round label="Outline" />
          <Button color="success" round label="Success" />
          <Button color="danger" round label="Danger" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button round size="sm" label="Small" />
          <Button round label="Medium" />
          <Button round size="lg" label="Large" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button round label="추가" iconBefore={icon('plus')} />
          <Button color="default" round label="다음" iconAfter={icon('chevron')} />
          <Button variant="text" round label="더 보기" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button round iconOnly ariaLabel="추가" iconBefore={icon('plus')} />
          <Button color="default" round iconOnly ariaLabel="설정" iconBefore={icon('settings')} />
          <Button variant="outline" round iconOnly size="sm" ariaLabel="검색" iconBefore={icon('search')} />
          <Button color="danger" round iconOnly size="lg" ariaLabel="삭제" iconBefore={icon('trash')} />
        </div>
        <div className="btn_group btn_group-round btn_group-fit">
          <Button color="default" label="일" />
          <Button color="default" label="주" />
          <Button label="월" />
          <Button color="default" label="년" />
        </div>
      </div>
    )
  },
  {
    title: '너비',
    description: (
      <>
        부모 영역 기준으로 너비를 조절합니다. <code>btn_block</code>은 가로 전체,
        <code>btn_row-equal</code>은 균등 분배, <code>btn_grow</code>는 비율 분배,
        <code>btn_fit</code>은 콘텐츠 너비를 유지합니다.
      </>
    ),
    code: wrapPageExample(`<Button block label="전체 너비 버튼" />
<div className="btn_row-equal">
  <Button color="default" label="취소" />
  <Button label="확인" />
</div>
<div className="btn_row btn_row-wrap">
  <Button color="default" grow label="취소" />
  <Button grow label="확인" />
</div>
<div className="btn_row btn_row-wrap">
  <Button color="default" grow label="옵션 A" />
  <Button color="default" grow label="옵션 B" />
  <Button grow label="옵션 C" />
</div>
<div className="btn_row btn_row-wrap btn_row-start">
  <Button variant="ghost" fit label="뒤로" />
  <Button color="default" fit label="취소" />
  <Button fit label="저장" />
</div>
<div className="btn_row btn_row-wrap btn_row-end">
  <Button variant="ghost" fit label="뒤로" />
  <Button color="default" fit label="취소" />
  <Button fit label="저장" />
</div>
<div className="btn_row btn_row-wrap">
  <Button variant="ghost" fit label="뒤로" />
  <Button color="default" grow label="임시 저장" />
  <Button grow label="제출" />
</div>
<div className="btn_row btn_row-wrap">
  <Button color="default" grow label="본문 영역" />
  <Button fit label="확인" />
</div>
<div className="btn_row btn_row-wrap">
  <Button color="default" grow={2} label="2배 너비" />
  <Button grow label="1배 너비" />
</div>
<Button block label="전체 너비 다운로드" iconBefore={<Icon name="download" />} />`, {
  name: 'ButtonExample13',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="demo-stack">
        <Button block label="전체 너비 버튼" />
        <div className="btn_row-equal">
          <Button color="default" label="취소" />
          <Button label="확인" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button color="default" grow label="취소" />
          <Button grow label="확인" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button color="default" grow label="옵션 A" />
          <Button color="default" grow label="옵션 B" />
          <Button grow label="옵션 C" />
        </div>
        <div className="btn_row btn_row-wrap btn_row-start">
          <Button variant="ghost" fit label="뒤로" />
          <Button color="default" fit label="취소" />
          <Button fit label="저장" />
        </div>
        <div className="btn_row btn_row-wrap btn_row-end">
          <Button variant="ghost" fit label="뒤로" />
          <Button color="default" fit label="취소" />
          <Button fit label="저장" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button variant="ghost" fit label="뒤로" />
          <Button color="default" grow label="임시 저장" />
          <Button grow label="제출" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button color="default" grow label="본문 영역" />
          <Button fit label="확인" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button color="default" grow={2} label="2배 너비" />
          <Button grow label="1배 너비" />
        </div>
        <Button block label="전체 너비 다운로드" iconBefore={icon('download')} />
      </div>
    )
  },
  {
    title: '상태',
    description: (
      <>
        disabled, <code>is-disabled</code>, <code>is-loading</code> 상태를 표현합니다.
        비활성은 스킨별로, 로딩은 텍스트·아이콘 버튼 모두 적용할 수 있습니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button disabled label="Primary" />
  <Button color="default" disabled label="Default" />
  <Button variant="outline" disabled label="Outline" />
  <Button variant="ghost" disabled label="Ghost" />
  <Button variant="text" disabled label="Text" />
  <Button color="danger" disabled label="Danger" />
</div>
<div className="btn_row btn_row-wrap">
  <Button ariaDisabled label="is-disabled" />
  <Button color="default" ariaDisabled label="is-disabled" />
  <Button variant="outline" ariaDisabled label="is-disabled" />
</div>
<div className="btn_row btn_row-wrap">
  <Button loading label="저장 중" />
  <Button color="default" loading label="처리 중" />
  <Button variant="outline" loading label="업로드 중" />
  <Button iconOnly loading ariaLabel="저장 중" />
</div>
<Button block loading label="전체 너비 로딩" />`, {
  name: 'ButtonStateExample',
  reactImports: [],
  compImports: ['Button']
}),
    preview: (
      <div className="demo-stack">
        <div className="btn_row btn_row-wrap">
          <Button disabled label="Primary" />
          <Button color="default" disabled label="Default" />
          <Button variant="outline" disabled label="Outline" />
          <Button variant="ghost" disabled label="Ghost" />
          <Button variant="text" disabled label="Text" />
          <Button color="danger" disabled label="Danger" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button ariaDisabled label="is-disabled" />
          <Button color="default" ariaDisabled label="is-disabled" />
          <Button variant="outline" ariaDisabled label="is-disabled" />
        </div>
        <div className="btn_row btn_row-wrap">
          <Button loading label="저장 중" />
          <Button color="default" loading label="처리 중" />
          <Button variant="outline" loading label="업로드 중" />
          <Button iconOnly loading ariaLabel="저장 중" />
        </div>
        <Button block loading label="전체 너비 로딩" />
      </div>
    )
  },
  {
    title: '버튼 그룹',
    description: (
      <>
        가로·세로 방향으로 버튼을 묶습니다. <code>btn_group-fit</code>은 콘텐츠 크기 맞춤,
        <code>btn_group-block</code>은 전체 너비 균등 분배,
        <code>btn_group-align-start</code> · <code>center</code> · <code>end</code>로 그룹 정렬을 지정합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_group btn_group-fit btn_group-align-start">
  <Button color="default" size="sm" label="Left" />
  <Button color="default" size="sm" label="Middle" />
  <Button color="default" size="sm" label="Right" />
</div>
<div className="btn_group btn_group-fit btn_group-align-start">
  <Button color="default" label="Left" />
  <Button color="default" label="Middle" />
  <Button color="default" label="Right" />
</div>
<div className="btn_group btn_group-fit btn_group-align-start">
  <Button color="default" size="lg" label="Left" />
  <Button color="default" size="lg" label="Middle" />
  <Button color="default" size="lg" label="Right" />
</div>
<div className="btn_group btn_group-fit btn_group-align-center">
  <Button color="default" label="Left" />
  <Button color="default" label="Middle" />
  <Button color="default" label="Right" />
</div>
<div className="btn_group btn_group-fit btn_group-align-end">
  <Button color="default" label="Left" />
  <Button color="default" label="Middle" />
  <Button color="default" label="Right" />
</div>
<div className="btn_group btn_group-block">
  <Button color="default" label="Left" />
  <Button label="Middle" />
  <Button color="default" label="Right" />
</div>
<div className="btn_group btn_group-vertical btn_group-fit btn_group-align-start">
  <Button color="default" label="상단" />
  <Button color="default" label="중간" />
  <Button color="default" label="하단" />
</div>
<div className="btn_group btn_group-vertical btn_group-fit btn_group-align-center">
  <Button color="default" label="상단" />
  <Button color="default" label="중간" />
  <Button color="default" label="하단" />
</div>
<div className="btn_group btn_group-vertical btn_group-fit btn_group-align-end">
  <Button color="default" label="상단" />
  <Button color="default" label="중간" />
  <Button color="default" label="하단" />
</div>
<div className="btn_group btn_group-vertical btn_group-block">
  <Button color="default" label="상단" />
  <Button color="default" label="중간" />
  <Button color="default" label="하단" />
</div>
<div className="btn_stack">
  <Button block label="로그인" />
  <Button color="default" block label="회원가입" />
</div>
<div className="btn_stack">
  <Button block label="결제하기" />
  <Button variant="text" label="쿠폰 적용" />
</div>
<div className="btn_stack">
  <Button block label="다운로드" iconBefore={<Icon name="download" />} />
  <p className="btn_stack-text">
    최신 버전 v2.0 · <a href="#release">릴리스 노트</a>
  </p>
</div>`, {
  name: 'ButtonGroupExample',
  reactImports: [],
  compImports: ['Button', 'Icon']
}),
    preview: (
      <div className="demo-stack">
        <div className="btn_group btn_group-fit btn_group-align-start">
          <Button color="default" size="sm" label="Left" />
          <Button color="default" size="sm" label="Middle" />
          <Button color="default" size="sm" label="Right" />
        </div>
        <div className="btn_group btn_group-fit btn_group-align-start">
          <Button color="default" label="Left" />
          <Button color="default" label="Middle" />
          <Button color="default" label="Right" />
        </div>
        <div className="btn_group btn_group-fit btn_group-align-start">
          <Button color="default" size="lg" label="Left" />
          <Button color="default" size="lg" label="Middle" />
          <Button color="default" size="lg" label="Right" />
        </div>
        <div className="btn_group btn_group-fit btn_group-align-center">
          <Button color="default" label="Left" />
          <Button color="default" label="Middle" />
          <Button color="default" label="Right" />
        </div>
        <div className="btn_group btn_group-fit btn_group-align-end">
          <Button color="default" label="Left" />
          <Button color="default" label="Middle" />
          <Button color="default" label="Right" />
        </div>
        <div className="btn_group btn_group-block">
          <Button color="default" label="Left" />
          <Button label="Middle" />
          <Button color="default" label="Right" />
        </div>
        <div className="btn_group btn_group-vertical btn_group-fit btn_group-align-start">
          <Button color="default" label="상단" />
          <Button color="default" label="중간" />
          <Button color="default" label="하단" />
        </div>
        <div className="btn_group btn_group-vertical btn_group-fit btn_group-align-center">
          <Button color="default" label="상단" />
          <Button color="default" label="중간" />
          <Button color="default" label="하단" />
        </div>
        <div className="btn_group btn_group-vertical btn_group-fit btn_group-align-end">
          <Button color="default" label="상단" />
          <Button color="default" label="중간" />
          <Button color="default" label="하단" />
        </div>
        <div className="btn_group btn_group-vertical btn_group-block">
          <Button color="default" label="상단" />
          <Button color="default" label="중간" />
          <Button color="default" label="하단" />
        </div>
        <div className="btn_stack">
          <Button block label="로그인" />
          <Button color="default" block label="회원가입" />
        </div>
        <div className="btn_stack">
          <Button block label="결제하기" />
          <Button variant="text" label="쿠폰 적용" />
        </div>
        <div className="btn_stack">
          <Button block label="다운로드" iconBefore={icon('download')} />
          <p className="btn_stack-text">
            최신 버전 v2.0 · <a href="#release">릴리스 노트</a>
          </p>
        </div>
      </div>
    )
  },
  {
    title: '루트 태그',
    description: (
      <>
        <code>tag</code> prop으로 <code>button</code> · <code>a</code> · <code>div</code>를 선택합니다.
        <code>div</code>와 <code>href</code> 없는 <code>a</code>에는 키보드 접근을 위해 <code>role</code>과 <code>tabindex=0</code>을 자동 적용합니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button label="button" />
  <Button tag="a" href="#button" variant="outline" label="a + href" />
  <Button tag="div" variant="ghost" label="div → role=button" />
  <Button tag="a" role="link" variant="text" label="a, role=link" />
</div>`, {
  name: 'ButtonTagExample',
  reactImports: [],
  compImports: ['Button']
}),
    preview: (
      <div className="btn_row btn_row-wrap">
        <Button label="button" />
        <Button tag="a" href="#button" variant="outline" label="a + href" />
        <Button tag="div" variant="ghost" label="div → role=button" />
        <Button tag="a" role="link" variant="text" label="a, role=link" />
      </div>
    )
  },
  {
    title: '클릭 · 상태',
    description: (
      <>
        <code>onClick</code>으로 페이지 상태를 갱신합니다. 비활성이면 클릭이 무시됩니다.
      </>
    ),
    code: wrapPageExample(`const [count, setCount] = useState(0)

<Button label="클릭" onClick={() => setCount((prev) => prev + 1)} />
<Button variant="outline" label="초기화" onClick={() => setCount(0)} />
{/* 클릭 횟수: {count} */}`, {
      name: 'ButtonExample',
      reactImports: ['useState'],
      compImports: ['Button']
    }),
    preview: <ClickDemo />
  },
  {
    title: 'Ripple',
    description: (
      <>
        기본은 꺼져 있습니다. <code>ripple</code>을 지정하면 클릭 파장이 보입니다.
      </>
    ),
    code: wrapPageExample(`<div className="btn_row btn_row-wrap">
  <Button label="ripple on" ripple />
  <Button label="ripple off" />
</div>`, {
  name: 'ButtonExample17',
  reactImports: [],
  compImports: ['Button']
}),
    preview: (
      <div className="btn_row btn_row-wrap">
        <Button label="ripple on" ripple />
        <Button label="ripple off" />
      </div>
    )
  }
]

/**
 * Button 가이드 화면.
 * Storybook 기본 요소 Button docs의 예시 유형을 그대로 제공합니다.
 */
export default function ButtonGuide () {
  return (
    <GuideLayout
      category="기본 요소"
      title="Button"
      description="클릭·키보드 입력으로 사용자 액션이나 링크 이동을 실행합니다. 스킨·색상·크기·아이콘·상태를 props와 유틸리티 클래스로 조합합니다."
    >
      {SECTIONS.map((section) => (
        <DemoBlock
          key={section.title}
          title={section.title}
          description={section.description}
          code={section.code}
          fileName="ButtonExample.jsx"
        >
          {section.preview}
        </DemoBlock>
      ))}

      <GuideApiDocs sections={buttonApiSections} />
    </GuideLayout>
  )
}
