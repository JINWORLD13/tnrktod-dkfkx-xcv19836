// module.exports = {
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:react/jsx-runtime',
//     'plugin:react-hooks/recommended',
//   ],
//   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
//   settings: { react: { version: '18.3' } },
//   plugins: ['react-refresh'],
//   rules: {
//     "no-unused-vars": "never"
//   },
// }

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended', // react-hooks 규칙 포함
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.3' } },
  plugins: ['react-refresh', 'react-hooks'], // react-hooks 플러그인 추가
  rules: {
    'no-unused-vars': 'warn', // 'never' 대신 'warn', 'error', 또는 'off' 사용
    'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 위반 감지
    'react-hooks/exhaustive-deps': 'warn', // useEffect 의존성 배열 문제 감지
  },
};