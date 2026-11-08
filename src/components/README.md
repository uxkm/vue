# 컴포넌트 구조

57개 컴포넌트 분류(레이아웃 · 기본 요소 · 데이터 표시 · 폼 · 피드백 · 네비게이션 · 기타)를 Vue 2 프로젝트에 맞춰 폴더로 구성합니다.  
본 저장소는 **Vue 2.6** 기준으로 컴포넌트 API/클래스 계약을 맞춥니다.

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

```vue
<Button variant="filled" color="primary" size="md" label="확인" />
```

Button API는 `variant` · `color` · `size` · `round` · `block` · `loading` 계약을 따릅니다.
