import { Swiper, SwiperSlide } from 'swiper/react'
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  EffectFade,
  FreeMode,
  Grid,
  Keyboard,
  Navigation,
  Pagination,
  Thumbs
} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/effect-coverflow'
import 'swiper/css/grid'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

export {
  Swiper,
  SwiperSlide,
  A11y,
  Autoplay,
  EffectCoverflow,
  EffectFade,
  FreeMode,
  Grid,
  Keyboard,
  Navigation,
  Pagination,
  Thumbs
}

/** 슬라이더에서 기본으로 켜 두는 모듈 */
export const defaultSwiperModules = [Navigation, Pagination, Autoplay, A11y, Keyboard]

/** Carousel 컴포넌트용 전체 모듈 */
export const carouselSwiperModules = [
  Navigation,
  Pagination,
  Autoplay,
  A11y,
  Keyboard,
  EffectFade,
  EffectCoverflow,
  Grid,
  Thumbs,
  FreeMode
]
