'use client'

import { useCallback, useState } from 'react'

/**
 * value 가 주어지면 controlled, 없으면(undefined) 내부 state 로 동작
 */
export function useControllable<T> (
  value: T | undefined,
  defaultValue: T
): [T, (next: T) => void] {
  const [inner, setInner] = useState<T>(defaultValue)
  const isControlled = value !== undefined
  const set = useCallback((next: T) => {
    if (!isControlled) setInner(next)
  }, [isControlled])
  return [isControlled ? (value as T) : inner, set]
}
