# 컴포넌트 구조

디자인 시스템 컴포넌트를 역할별로 나눕니다. React(`.tsx`) + 공개 입구 `index.js` 기준입니다.

```
src/components/
  ui/           기본·레이아웃·폼·피드백·데이터·내비게이션·기타
  widget/       AppHeader, AppFooter, AppLayout, PageChrome
  module/       Header, Footer, Page, LayoutSlot, LayoutContext
  providers/    AppProviders
  shared/       컴포넌트가 공유하는 계약 (.ts 만)
  index.js      공개 export
```

## 사용

```js
import { Button, Container, Input } from '@/comp'
```

```jsx
<Button variant="filled" color="primary" size="md" label="확인" />
```

Button API는 `variant` · `color` · `size` · `round` · `block` · `loading` 계약을 따릅니다.
