/**
 * EQ-VAS 완료 화면: Thank you + 점수 요약 + Back to Select Assessment.
 */
import { ScreenLayout, ScreenLayoutFooterButton } from '@shared/layout/ScreenLayout'
import type { EqVasScore } from '@domains/assessment/types'
import './EqVasCompleteScreen.css'

export interface EqVasCompleteScreenProps {
  score: EqVasScore
  onBackToAssessment?: () => void
}

export function EqVasCompleteScreen({
  score,
  onBackToAssessment,
}: EqVasCompleteScreenProps) {
  return (
    <ScreenLayout
      title="EQ-VAS"
      subtitle="Complete"
      onBack={onBackToAssessment}
      footer={
        onBackToAssessment ? (
          <ScreenLayoutFooterButton
            label="Back to Select Assessment"
            onClick={onBackToAssessment}
          />
        ) : undefined
      }
    >
      <div className="eqvas-complete">
        <p className="eqvas-complete__message">
          Thank you. Your responses have been recorded.
        </p>
        <div className="eqvas-complete__summary" role="status">
          <p className="eqvas-complete__summary-title">EQ-VAS Score</p>
          <p className="eqvas-complete__score">{score}</p>
        </div>
      </div>
    </ScreenLayout>
  )
}
