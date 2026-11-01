# 컴포넌트 구조

57개 컴포넌트 분류(레이아웃 · 기본 요소 · 데이터 표시 · 폼 · 피드백 · 네비게이션 · 기타)를 Vue 3 프로젝트에 맞춰 폴더로 구성합니다.  
본 저장소는 **Vue 3** 기준으로 컴포넌트 API/클래스 계약을 맞춥니다.

```
src/components/
  layout/       Container, Divider, Flex, Grid, Space, AppShell, Header, Footer …
  basic/        Button, Icon, Link, Typography
  data/         Badge, Card, Tag
  form/         Input, Select, Switch
  feedback/     Alert, Empty, Progress, Skeleton, PageLoading …
  navigation/   Breadcrumb, Tabs
  misc/
  index.js      공개 export
```

## Vue 3 계약

- `v-model` → `modelValue` + `update:modelValue`
- 이벤트는 `emits` 로 선언 (attrs 폴스루 방지)
- 슬롯 존재 여부는 `$slots.xxx` truthy 체크 (함수형 슬롯)

## 사용

```js
import { Button, Container, Input } from '@/components'
```

```vue
<Button variant="filled" color="primary" size="md" label="확인" />
<Input v-model="text" placeholder="입력" />
```
