'use strict'

/**
 * SCSS에서 webpack 알리아스를 ~ 없이 쓸 수 있게 변환
 * @import '@/styles/...'  →  @import '~@/styles/...'
 * (vue-loader가 sass-loader options를 JSON 직렬화해서 importer 함수를 쓸 수 없음)
 */
module.exports = function sassAliasLoader (source) {
  this && this.cacheable && this.cacheable()
  if (!source || typeof source !== 'string') return source

  return source.replace(
    /@(?:import|use|forward)\s+(?:url\()?(['"])(@(?:components|pages)?\/)/g,
    function (match, quote, alias) {
      // 이미 ~ 가 있으면 유지
      if (match.indexOf(quote + '~' + alias) !== -1) return match
      return match.replace(quote + alias, quote + '~' + alias)
    }
  )
}
