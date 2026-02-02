import { useQuery } from '@tanstack/react-query'
import { getAssessments, getCurrentUser } from '@domains/assessment/api'
import { ScreenLayout, ScreenLayoutFooterButton } from '@shared/layout/ScreenLayout'
import { Card } from '@shared/ui/primitives/Card'
import { AssessmentCard } from './AssessmentCard'
import { useSelectAssessment } from './useSelectAssessment'
import './SelectAssessmentScreen.css'

export interface SelectAssessmentScreenProps {
  onStart?: (selectedIds: string[]) => void
}

export function SelectAssessmentScreen({ onStart }: SelectAssessmentScreenProps) {
  const { data: assessments = [], isLoading: loadingAssessments } = useQuery({
    queryKey: ['assessments'],
    queryFn: getAssessments,
  })
  const { data: user = null, isLoading: loadingUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  })
  const { selectedIds, toggle, start, canStart, selectedCount } = useSelectAssessment()
  const isLoading = loadingAssessments || loadingUser

  const handleStart = () => {
    const ids = start()
    onStart?.(ids)
  }

  if (isLoading) {
    return (
      <ScreenLayout title="Select Assessment">
        <p className="select-assessment-intro">Loading...</p>
      </ScreenLayout>
    )
  }

  return (
    <ScreenLayout
      title="Select Assessment"
      footer={
        <ScreenLayoutFooterButton
          label={`Start Selected Assessment (${selectedCount})`}
          onClick={handleStart}
          disabled={!canStart}
        />
      }
    >
      <p className="select-assessment-intro">
        Please choose the assessments you wish to take today.
      </p>

      {user && (
        <Card variant="default" className="select-assessment-user-card">
          <div className="select-assessment-user-card__avatar" aria-hidden>
            👤
          </div>
          <div className="select-assessment-user-card__info">
            <p className="select-assessment-user-card__name">{user.name}</p>
            <p className="select-assessment-user-card__subline">
              {user.displaySubline ?? `${user.birthDate} • ${user.gender} | ID: ${user.id}`}
            </p>
          </div>
        </Card>
      )}

      <p className="select-assessment-instruction">
        Please select the assessments you wish to complete. Each assessment is used to
        evaluate health status.
      </p>

      <div className="select-assessment-list" role="list">
        {assessments.map((assessment) => (
          <div key={assessment.id} role="listitem" className="select-assessment-list-item">
            <AssessmentCard
              assessment={assessment}
              selected={selectedIds.includes(assessment.id)}
              onToggle={() => toggle(assessment.id)}
            />
          </div>
        ))}
      </div>
    </ScreenLayout>
  )
}
