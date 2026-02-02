import { Slot } from '@radix-ui/react-slot'
import './Button.css'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, variant = 'primary', fullWidth = false, className = '', ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const fullWidthClass = fullWidth ? ' primitive-button--fullWidth' : ''
    return (
      <Comp
        ref={ref}
        data-variant={variant}
        className={`primitive-button primitive-button--${variant}${fullWidthClass} ${className}`.trim()}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'
