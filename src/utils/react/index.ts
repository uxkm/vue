import type { ReactNode } from 'react'

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

// 기존 import 경로를 유지하면서 훅의 클라이언트 경계를 분리한다.
export { useControllable } from '@/hooks/useControllable'
