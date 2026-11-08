/**
 * Skel
 * - PubIndexSkeleton용 스켈레톤 뼈대 한 조각 (`wbs-skel--{mod}`)
 */
export default function Skel ({ mod, style }) {
  return <span className={'wbs-skel wbs-skel--' + mod} style={style} />
}
