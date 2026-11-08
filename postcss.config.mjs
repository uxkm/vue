/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // SCSS → CSS 이후 벤더 프리픽스 자동 부여 (Next 빌드/dev 공통)
    autoprefixer: {
      flexbox: 'no-2009'
    }
  }
}

export default config
