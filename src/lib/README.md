# lib — Vue 의존성 → React 대체 맵

| 이전 (Vue) | 현재 |
|------------|------|
| `vue` / `vue-router` / `react-router-dom` | `next` + `@/lib/router` (`Link`/`to` 호환) |
| `vuex` / `vuex-map-fields` | `zustand` (`@/lib/store`) |
| `vue-i18n` | `i18next` + `react-i18next` (`@/lib/i18n`, `src/locales/`) |
| `@fullcalendar/vue` | `@fullcalendar/react` (`@/lib/calendar`) |
| `vue-awesome-swiper` / `vue-carousel` | `swiper` (`@/lib/swiper`) |
| `vue-lottie` | `lottie-react` (`@/lib/lottie`) |
| `vue-clipboard2` | `clipboard-copy` (`@/lib/clipboard`) |
| `vuedraggable` / `vue-drag-drop` | `@dnd-kit/*` (`@/lib/dnd`) |
| `v-viewer` | `viewerjs` (`@/lib/viewer`) |
| `vue-slimscroll` / `vuebar` | `simplebar-react` (`@/lib/scroll`) |
| `v-click-outside` | `@/hooks/useClickOutside` |
| `youtube-iframe` | `react-youtube` (`@/lib/youtube`) |
| `@amcharts/amcharts4` | `@amcharts/amcharts5` (`@/lib/charts`) |
| `moment` / `moment-timezone` | `dayjs` (`@/lib/dayjs`) |
| `lodash` | `lodash-es` |
| `gsap` 2 | `gsap` 3 |
| `hls.js` 0.8 | `hls.js` 1.x |
| `babel-polyfill` / `smoothscroll-polyfill` | 모던 브라우저 + Vite 대상이라 제거 |
| `node-sass` | `sass` (devDependency) |
| `open-graph-scraper` | 브라우저 번들 부적합 → 제외 (필요 시 Node 스크립트에서 설치) |
