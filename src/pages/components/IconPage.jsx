import DemoShell from '@/pages/DemoShell'
import { Icon } from '@/components'

export default function IconPage() {
  return (
    <DemoShell
      category="기본 요소"
      title="Icon"
      description="React · Icon — size · color · spin · circle · button 조합을 확인합니다."
    >
      <div className="demo-block">
        <h2 className="demo-block__title">크기</h2>
        <div className="demo-row">
          <Icon name="★" size="sm" />
          <Icon name="★" size="md" />
          <Icon name="★" size="lg" />
          <Icon name="★" size="xl" />
        </div>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">색상</h2>
        <div className="demo-row">
          <Icon name="●" color="primary" size="lg" />
          <Icon name="●" color="success" size="lg" />
          <Icon name="●" color="warning" size="lg" />
          <Icon name="●" color="danger" size="lg" />
          <Icon name="●" color="muted" size="lg" />
        </div>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">변형</h2>
        <div className="demo-row">
          <Icon name="↻" spin size="lg" ariaLabel="로딩" />
          <Icon name="★" circle color="primary" />
          <Icon name="★" square color="muted" />
          <Icon name="♥" circle pulse color="danger" ariaLabel="알림" />
          <Icon name="☰" button ariaLabel="메뉴" />
        </div>
      </div>
      <div className="demo-block">
        <h2 className="demo-block__title">인라인</h2>
        <p>
          텍스트와{' '}
          <Icon name="→" inline color="primary" ariaLabel="다음" />{' '}
          함께 사용합니다.
        </p>
      </div>
    </DemoShell>
  )
}
