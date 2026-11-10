/**
 * tree
 * - Depth1(folder).depth2[] > Depth2(group).depth3[] | Depth2(leaf)
 * - 그룹: depth3[] 배열을 가진 노드 / 리프: 화면 필드만 있는 노드
 */

/** Depth2 그룹 노드 여부 (하위에 depth3[]) */
export function isGroupNode (node) {
  return !!(node && Array.isArray(node.depth3))
}

/** 그룹 표시명 */
export function groupLabel (group) {
  if (!group) return ''
  return group.name || group.id || ''
}

/** 폴더 안 그룹 펼침 키 */
export function groupExpandKey (folderId, group) {
  return String(folderId) + '/' + String(group.id || group.name || '')
}

/** depth2 트리를 깊이 우선으로 돌며 리프만 visit */
export function walkLeaves (nodes, visit) {
  ;(nodes || []).forEach((node) => {
    if (isGroupNode(node)) walkLeaves(node.depth3, visit)
    else visit(node)
  })
}

/** 폴더(depth2) 또는 그룹(depth3)의 최종 리프 목록 */
export function collectLeaves (node) {
  const out = []
  if (!node) return out
  const children = Array.isArray(node.depth2)
    ? node.depth2
    : Array.isArray(node.depth3)
      ? node.depth3
      : null
  walkLeaves(children, (item) => out.push(item))
  return out
}

/** 폴더/그룹의 최종 리프 수 (뱃지·통계용) */
export function countLeaves (node) {
  return collectLeaves(node).length
}

/**
 * 검색용 depth2 트리 필터
 * - folderHit: 폴더명 매칭 → 하위 전부 유지
 * - 그룹명 매칭 → 해당 그룹 하위 전부
 * - 아니면 매칭 리프만 남기고, 빈 그룹은 제거
 */
export function filterDepthTree (nodes, folder, q, category, folderHit, itemMatches) {
  if (folderHit) return nodes || []
  if (!nodes || !nodes.length) return []

  return nodes
    .map((node) => {
      if (isGroupNode(node)) {
        const name = groupLabel(node)
        const groupHit = category === 'all' || category === 'name'
          ? String(name).toLowerCase().indexOf(q) !== -1
          : false
        if (groupHit) return node
        const depth3 = filterDepthTree(
          node.depth3,
          folder,
          q,
          category,
          false,
          itemMatches
        )
        if (!depth3.length) return null
        return { ...node, depth3 }
      }
      return itemMatches(folder, node, q, category) ? node : null
    })
    .filter(Boolean)
}

/** 모두 펼치기용: 폴더 id + 하위 그룹 키 */
export function collectExpandKeys (folders) {
  const keys = []
  ;(folders || []).forEach((folder) => {
    keys.push(folder.id)
    ;(folder.depth2 || []).forEach((node) => {
      if (isGroupNode(node)) keys.push(groupExpandKey(folder.id, node))
    })
  })
  return keys
}
