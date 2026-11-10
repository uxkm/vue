import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default defineConfig([
  {
    files: ['app/**/*.{js,jsx,ts,tsx}', 'src/**/*.{js,jsx,ts,tsx}'],
    // 권장 접근성 규칙을 오류로 적용한다. 비활성·폐기 규칙과 옵션은 원본을 유지한다.
    // 라우팅용 링크와 디자인 시스템의 다형성 Link를 구분한다.
    rules: {
      ...Object.fromEntries(Object.entries(jsxA11y.flatConfigs.recommended.rules).map(([rule, setting]) => {
        const [severity, ...options] = Array.isArray(setting) ? setting : [setting]
        return [rule, [severity === 'off' || severity === 0 ? 'off' : 'error', ...options]]
      })),
      // 이름을 제공한 스크롤 영역은 키보드 스크롤을 위해 초점을 받을 수 있다.
      'jsx-a11y/no-noninteractive-tabindex': ['error', {
        roles: ['tabpanel', 'region'],
        allowExpressionValues: true
      }],
      'jsx-a11y/anchor-is-valid': ['error', {
        components: ['NavLink', 'NextLink'],
        specialLink: ['to', 'href'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }]
    },
    settings: {
      'jsx-a11y': {
        polymorphicPropName: 'as',
        components: { NavLink: 'a', NextLink: 'a' }
      }
    }
  },
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'src/generated/**', 'reports/**', 'test-results/**', 'next-env.d.ts']),
  {
    rules: {
      '@next/next/no-img-element': 'off'
    }
  }
])
