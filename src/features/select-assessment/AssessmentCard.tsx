import type { Assessment } from '@domains/assessment/types'
import { Card } from '@shared/ui/primitives/Card'

export interface AssessmentCardProps {
  assessment: Assessment
  selected: boolean
  onToggle: () => void
}

export function AssessmentCard({ assessment, selected, onToggle }: AssessmentCardProps) {
  return (
    <Card
      variant={selected ? 'selected' : 'default'}
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      aria-pressed={selected}
      aria-label={`${assessment.title}, ${selected ? '선택됨' : '선택 안 됨'}`}
      className="assessment-card"
    >
      <div className="assessment-card__header">
        <span className="assessment-card__icon" aria-hidden>
          {assessment.id === 'eq5d5l' ? '📋' : '📊'}
        </span>
        <h3 className="assessment-card__title">{assessment.title}</h3>
        {selected && (
          <span className="assessment-card__check" aria-hidden>
            ✓
          </span>
        )}
      </div>
      <p className="assessment-card__description">{assessment.description}</p>
      <p className="assessment-card__time">⏱ {assessment.estimatedMinutes}</p>
    </Card>
  )
}
