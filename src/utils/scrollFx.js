/**
 * 스크롤 인터랙션 유틸 (실무 기술 선택)
 * - 단순 페이드/슬라이드: IntersectionObserver + CSS
 * - 스크롤 비례 패럴랙스: requestAnimationFrame (GSAP 2.x에는 ScrollTrigger 없음)
 * - 숫자 카운트업: requestAnimationFrame
 */

/** 동작 줄이기를 켠 사용자. 스크롤 애니메이션을 생략한다 */
var REDUCE_MOTION = false
try {
  REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches
} catch (e) {}

/**
 * data-fx / .fx-reveal 요소 등장 관찰
 * @param {ParentNode} root
 * @returns {{ destroy: Function }}
 */
export function createScrollReveal (root) {
  var scope = root || document
  var nodes = scope.querySelectorAll('[data-fx], .fx-reveal')
  if (!nodes.length) {
    return { destroy: function () {} }
  }

  if (REDUCE_MOTION || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(nodes, function (el) {
      el.classList.add('is-in')
    })
    return { destroy: function () {} }
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return
      var el = entry.target
      var delay = parseInt(el.getAttribute('data-fx-delay') || '0', 10)
      if (delay > 0) {
        window.setTimeout(function () {
          el.classList.add('is-in')
        }, delay)
      } else {
        el.classList.add('is-in')
      }
      observer.unobserve(el)
    })
  }, {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12
  })

  Array.prototype.forEach.call(nodes, function (el) {
    observer.observe(el)
  })

  return {
    destroy: function () {
      observer.disconnect()
    }
  }
}

/**
 * data-parallax 요소: 스크롤 진행에 비례한 translateY
 * data-parallax="0.2" (양수=느린 배경, 음수=반대 방향)
 * @param {ParentNode} root
 * @returns {{ destroy: Function }}
 */
export function createScrollParallax (root) {
  var scope = root || document
  var nodes = Array.prototype.slice.call(scope.querySelectorAll('[data-parallax]'))
  if (!nodes.length || REDUCE_MOTION) {
    return { destroy: function () {} }
  }

  /** 다음 프레임에 패럴랙스를 다시 그릴지 */
  var ticking = false
  /** false 가 되면 해제된 뒤의 갱신을 무시 */
  var alive = true

  /** 보이는 요소의 translateY 를 스크롤 진행에 맞춰 다시 계산 */
  function update () {
    ticking = false
    if (!alive) return
    var vh = window.innerHeight || 1
    nodes.forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-parallax') || '0.2')
      var rect = el.getBoundingClientRect()
      /** 요소가 화면을 통과한 정도. 0.5 가 가운데 */
      var progress = (vh - rect.top) / (vh + rect.height)
      /** 가운데에서 벗어난 만큼의 이동 픽셀 */
      var offset = (progress - 0.5) * speed * 120
      el.style.transform = 'translate3d(0, ' + offset.toFixed(2) + 'px, 0)'
    })
  }

  /** 스크롤·리사이즈 때 한 프레임에 한 번만 update */
  function onScroll () {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(update)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  update()

  return {
    destroy: function () {
      alive = false
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      nodes.forEach(function (el) {
        el.style.transform = ''
      })
    }
  }
}

/**
 * sticky 섹션 내부 진행률 (0~1) 콜백
 * CSS sticky + 스크롤 진행으로 화면 전환에 사용
 * @param {Element} trackEl 높이 확보용 트랙
 * @param {Function} onProgress (progress:number) => void
 */
export function createStickyProgress (trackEl, onProgress) {
  if (!trackEl || REDUCE_MOTION) {
    if (typeof onProgress === 'function') onProgress(1)
    return { destroy: function () {} }
  }

  /** 다음 프레임에 진행률을 다시 계산할지 */
  var ticking = false
  /** false 가 되면 해제된 뒤의 갱신을 무시 */
  var alive = true

  /** 트랙을 얼마나 지나왔는지 0~1 로 알려 준다 */
  function update () {
    ticking = false
    if (!alive) return
    var rect = trackEl.getBoundingClientRect()
    var total = Math.max(1, trackEl.offsetHeight - window.innerHeight)
    var scrolled = Math.min(total, Math.max(0, -rect.top))
    onProgress(scrolled / total)
  }

  /** 스크롤·리사이즈 때 한 프레임에 한 번만 update */
  function onScroll () {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(update)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  update()

  return {
    destroy: function () {
      alive = false
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }
}

/**
 * 페이지 공통 초기화
 * @param {Element|null|undefined} root
 */
export function bindHomeScrollFx (root) {
  if (!root || !root.querySelectorAll) {
    return function () {}
  }
  var reveal = createScrollReveal(root)
  var parallax = createScrollParallax(root)
  return function () {
    reveal.destroy()
    parallax.destroy()
  }
}
