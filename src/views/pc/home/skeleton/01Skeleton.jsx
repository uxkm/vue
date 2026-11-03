import './01Skeleton.scss'

export default function PcHomeSkeleton01() {
  return (
    <div className="mc-skel">
      <div className="mc-skel__hero">
        <span className="mc-skel__bar mc-skel__bar--tag"></span>
        <span className="mc-skel__bar mc-skel__bar--title"></span>
        <span className="mc-skel__bar mc-skel__bar--title-sm"></span>
        <span className="mc-skel__bar mc-skel__bar--desc"></span>
        <span className="mc-skel__bar mc-skel__bar--cta"></span>
        <span className="mc-skel__blob"></span>
      </div>
      <div className="mc-skel__content">
        <div className="mc-skel__side">
          <span className="mc-skel__bar" style={{ width: '72%' }}></span>
          <span className="mc-skel__bar" style={{ width: '64%' }}></span>
          <span className="mc-skel__bar" style={{ width: '70%' }}></span>
          <span className="mc-skel__bar" style={{ width: '58%' }}></span>
        </div>
        <div className="mc-skel__main">
          <span className="mc-skel__bar mc-skel__bar--eyebrow"></span>
          <span className="mc-skel__bar mc-skel__bar--heading"></span>
          <div className="mc-skel__cards">
            <span className="mc-skel__card"></span>
            <span className="mc-skel__card"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
