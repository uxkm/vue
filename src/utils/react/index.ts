import { useCallback, useState, type ReactNode } from 'react'

/** children / 슬롯 노드에 렌더할 내용이 있는지 */
export function hasNodes (node: unknown): boolean {
  if (node == null || node === false || node === true || node === '') return false
  if (Array.isArray(node)) return node.some(hasNodes)
  return true
}

/** children / named prop 중 내용이 있는 첫 값을 반환 */
export function firstNodes (...nodes: ReactNode[]): ReactNode {
  for (const n of nodes) {
    if (hasNodes(n)) return n
  }
  return null
}

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
