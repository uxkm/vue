/**
 * 모달 대화상자.
 * open 시 오버레이와 제목·본문·푸터를 중앙에 띄운다. 닫기 버튼은 Icon 을 쓴다.
 */
import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { hasNodes } from '@/utils/react'
import { Icon } from './Icon'

/** 모달이 받는 값. open 일 때만 보인다 */
export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  open?: boolean
  title?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  staticDemo?: boolean
  onClose?: () => void
}

/**
 * 화면 가운데 대화상자.
 * open 이 참일 때 보여 준다. title 제목, footer 아래 버튼, size 로 너비를 고른다.
 * 오버레이나 닫기 버튼(Icon close)을 누르면 onClose 가 호출된다.
 */
export function Modal ({
  open = false,
  title,
  footer,
  size = 'md',
  staticDemo = false,
  className,
  children,
  onClose,
  ...rest
}: ModalProps) {
  if (!open) return null

  return (
    <div {...rest} className={cx('modal', 'is-open', staticDemo && 'modal_demo-static', size === 'sm' && 'modal_sm', size === 'lg' && 'modal_lg', className)} role="dialog" aria-modal="true">
      <div className="modal_backdrop" onClick={onClose} />
      <div className="modal_dialog">
        <div className="modal_header">
          {hasNodes(title)
            ? <strong className="modal_title">{title}</strong>
            : <span className="modal_title" />}
          <button type="button" className="modal_close" aria-label="닫기" onClick={onClose}>
            <Icon name="close" size="var(--modal-close-icon-size)" />
          </button>
        </div>
        <div className="modal_body">{children}</div>
        {hasNodes(footer) && <div className="modal_footer modal_footer-end">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
