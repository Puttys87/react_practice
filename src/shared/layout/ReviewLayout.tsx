/**
 * Review and Submit 공통 레이아웃.
 * 제목 "Review and Submit", 안내 2줄(prop), children(카드 영역), Footer "Submit Assessment".
 * EQ-5D-5L Review·EQ-VAS Review에서 재사용.
 */
import type { ReactNode } from 'react'
import {
  ScreenLayout,
  ScreenLayoutFooterButton,
} from '@shared/layout/ScreenLayout'
import './ReviewLayout.css'

export interface ReviewLayoutProps {
  /** 안내 문단 (2줄 권장). EQ-5D-5L / EQ-VAS 문구 다름 */
  introLines: ReactNode
  children: ReactNode
  onSubmit: () => void
  onBack?: () => void
  submitDisabled?: boolean
}

export function ReviewLayout({
  introLines,
  children,
  onSubmit,
  onBack,
  submitDisabled,
}: ReviewLayoutProps) {
  return (
    <ScreenLayout
      title="Review and Submit"
      onBack={onBack}
      footer={
        <ScreenLayoutFooterButton
          label="Submit Assessment"
          onClick={onSubmit}
          disabled={submitDisabled}
        />
      }
    >
      <div className="review-layout">
        <div className="review-layout__intro" role="status">
          {introLines}
        </div>
        <div className="review-layout__content">{children}</div>
      </div>
    </ScreenLayout>
  )
}
