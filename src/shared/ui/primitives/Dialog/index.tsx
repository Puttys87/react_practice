/**
 * Radix UI Dialog를 감싼 프로젝트 전용 Dialog 프리미티브.
 * 앱/기능 레이어에서는 이 wrapper만 사용하고, @radix-ui/react-dialog를 직접 import하지 않습니다.
 */
import * as RadixDialog from '@radix-ui/react-dialog'
import { forwardRef } from 'react'
import './Dialog.css'

export const Dialog = RadixDialog.Root
export const DialogTrigger = RadixDialog.Trigger
export const DialogPortal = RadixDialog.Portal
export const DialogOverlay = RadixDialog.Overlay
export const DialogClose = RadixDialog.Close

export const DialogContent = forwardRef<
  React.ComponentRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className = '', children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="primitive-dialog-overlay" />
    <RadixDialog.Content
      ref={ref}
      className={`primitive-dialog-content ${className}`.trim()}
      {...props}
    >
      {children}
    </RadixDialog.Content>
  </RadixDialog.Portal>
))
DialogContent.displayName = 'DialogContent'

export const DialogTitle = forwardRef<
  React.ComponentRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className = '', ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={`primitive-dialog-title ${className}`.trim()} {...props} />
))
DialogTitle.displayName = 'DialogTitle'
