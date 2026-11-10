'use client'

import { useLayoutEffect, useRef } from 'react'

/** 이벤트·외부 라이브러리 콜백에서 마지막으로 커밋된 값을 읽는다. */
export function useLatestRef<T> (value: T) {
  const ref = useRef(value)
  useLayoutEffect(() => { ref.current = value }, [value])
  return ref
}
