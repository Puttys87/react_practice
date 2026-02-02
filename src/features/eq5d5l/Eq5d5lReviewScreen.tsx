/**
 * EQ-5D-5L Review and Submit 화면.
 * Review 레이아웃 + 안내 2줄 + 5개 Eq5d5lReviewCard, onSubmit → complete, onBack → Step 5.
 */
import type { Eq5d5lAnswers } from '@domains/assessment/types'
import { EQ5D5L_DIMENSION_ORDER } from '@domains/assessment/constants'
import { ReviewLayout } from '@shared/layout/ReviewLayout'
import { Eq5d5lReviewCard } from './Eq5d5lReviewCard'
import './Eq5d5lReviewScreen.css'

const EQ5D5L_REVIEW_INTRO = (
  <>
    <p>Please review your answers and submit.</p>
    <p>You have completed the EQ-5D-5L assessment.</p>
  </>
)

export interface Eq5d5lReviewScreenProps {
  answers: Eq5d5lAnswers
  onSubmit: () => void
  onBack?: () => void
}

export function Eq5d5lReviewScreen({
  answers,
  onSubmit,
  onBack,
}: Eq5d5lReviewScreenProps) {
  return (
    <ReviewLayout
      introLines={EQ5D5L_REVIEW_INTRO}
      onSubmit={onSubmit}
      onBack={onBack}
      submitDisabled={Object.keys(answers).length < 5}
    >
      <div className="eq5d5l-review-screen__cards" role="list">
        {EQ5D5L_DIMENSION_ORDER.map((dimensionId) => {
          const level = answers[dimensionId]
          if (level === undefined) return null
          return (
            <div key={dimensionId} role="listitem">
              <Eq5d5lReviewCard dimensionId={dimensionId} level={level} />
            </div>
          )
        })}
      </div>
    </ReviewLayout>
  )
}
