import { Link } from 'react-router-dom'
import { Container } from '@/components'

export default function DemoShell({ category = '', title, description = '', children }) {
  return (
    <div className="demo-page">
      <Container>
        <header className="demo-page__header">
          <Link className="demo-page__back" to="/">← 퍼블리시 목록으로</Link>
          <p className="demo-page__cat">{category}</p>
          <h1 className="demo-page__title">{title}</h1>
          {description && <p className="demo-page__desc">{description}</p>}
        </header>
        <section className="demo-page__body">{children}</section>
      </Container>
    </div>
  )
}
