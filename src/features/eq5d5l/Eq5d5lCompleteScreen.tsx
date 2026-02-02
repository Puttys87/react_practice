import { ScreenLayout, ScreenLayoutFooterButton } from '@shared/layout/ScreenLayout'
import type { Eq5d5lAnswers } from '@domains/assessment/types'
import './Eq5d5lCompleteScreen.css'

export interface Eq5d5lCompleteScreenProps {
  answers: Eq5d5lAnswers
  onBackToAssessment?: () => void
}

export function Eq5d5lCompleteScreen({
  answers,
  onBackToAssessment,
}: Eq5d5lCompleteScreenProps) {
  return (
    <ScreenLayout
      title="EQ-5D-5L"
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
      <div className="eq5d5l-complete">
        <p className="eq5d5l-complete__message">
          Thank you. Your responses have been recorded.
        </p>
        {Object.keys(answers).length > 0 && (
          <div className="eq5d5l-complete__summary" role="status">
            <p className="eq5d5l-complete__summary-title">Summary</p>
            <ul className="eq5d5l-complete__list">
              {Object.entries(answers).map(([dim, level]) => (
                <li key={dim}>
                  {dim}: Level {level}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ScreenLayout>
  )
}
