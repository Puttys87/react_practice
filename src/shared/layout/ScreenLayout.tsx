/**
 * 공통 화면 레이아웃: Header(뒤로가기·제목·서브텍스트) / Content / Footer(CTA 1개).
 * 단일 컬럼, 모바일 친화.
 */
import type { ReactNode } from 'react'
import { Button } from '@shared/ui/primitives/Button'
import './ScreenLayout.css'

export interface ScreenLayoutProps {
  title: string
  subtitle?: string
  onBack?: () => void
  children: ReactNode
  footer?: ReactNode
}

export function ScreenLayout({
  title,
  subtitle,
  onBack,
  children,
  footer,
}: ScreenLayoutProps) {
  return (
    <div className="screen-layout">
      <header className="screen-layout__header">
        {onBack && (
          <button
            type="button"
            className="screen-layout__back"
            onClick={onBack}
            aria-label="뒤로 가기"
          >
            ←
          </button>
        )}
        <h1 className="screen-layout__title">{title}</h1>
        {subtitle && <p className="screen-layout__subtitle">{subtitle}</p>}
      </header>
      <main className="screen-layout__content">{children}</main>
      {footer && <footer className="screen-layout__footer">{footer}</footer>}
    </div>
  )
}

export interface ScreenLayoutFooterButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function ScreenLayoutFooterButton({
  label,
  onClick,
  disabled,
}: ScreenLayoutFooterButtonProps) {
  return (
    <Button fullWidth variant="primary" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  )
}
