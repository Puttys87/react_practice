/**
 * Card primitive: 배경/radius/패딩은 테마 토큰만 사용.
 * 평가 카드·사용자 카드 등에 사용.
 */
import { forwardRef } from 'react'
import './Card.css'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'selected'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', ...props }, ref) => (
    <div
      ref={ref}
      data-variant={variant}
      className={`primitive-card primitive-card--${variant} ${className}`.trim()}
      {...props}
    />
  ),
)
Card.displayName = 'Card'
