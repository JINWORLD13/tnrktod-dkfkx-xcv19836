// postcss.config.mjs
import postcssTailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    postcssTailwind(),   // ← ‘@tailwindcss/postcss’ 플러그인 호출
    autoprefixer()
  ]
}
