import {
  EQ5D5L_DIMENSION_LABELS,
  EQ5D5L_DIMENSION_LEVEL_PHRASES,
} from '@domains/assessment/constants'
import type { Eq5d5lLevel, Eq5d5lAnswers } from '@domains/assessment/types'
import { ScreenLayout, ScreenLayoutFooterButton } from '@shared/layout/ScreenLayout'
import { RadioGroup } from '@shared/ui/primitives/RadioGroup'
import { Eq5d5lProgress } from './Eq5d5lProgress'
import { useEq5d5lStep } from './useEq5d5lStep'
import './Eq5d5lStepScreen.css'

const EQ5D5L_INSTRUCTION =
  'We would like to know how good or bad your health is TODAY.'

export interface Eq5d5lStepScreenProps {
  stepIndex: number
  initialAnswers?: Partial<Record<string, number>>
  onNext?: (nextStepIndex: number, nextAnswers: Eq5d5lAnswers) => void
  onBack?: () => void
  onComplete?: (answers: Record<string, number>) => void
}

export function Eq5d5lStepScreen({
  stepIndex,
  initialAnswers = {},
  onNext,
  onBack,
  onComplete,
}: Eq5d5lStepScreenProps) {
  const {
    stepIndex: currentStep,
    dimensionId,
    value,
    setAnswer,
    canGoNext,
    goNext,
    isLastStep,
    answers,
    totalSteps,
  } = useEq5d5lStep(stepIndex, {
    initialAnswers: initialAnswers as Record<string, Eq5d5lLevel>,
    onComplete: (a) => onComplete?.(a as Record<string, number>),
  })

  const dimensionLabel = EQ5D5L_DIMENSION_LABELS[dimensionId]
  const phrases = EQ5D5L_DIMENSION_LEVEL_PHRASES[dimensionId]
  const radioItems = [1, 2, 3, 4, 5].map((level) => ({
    value: String(level),
    label: phrases[(level - 1) as 0 | 1 | 2 | 3 | 4],
  }))

  const handleNext = () => {
    goNext()
    if (!isLastStep && value !== undefined) {
      const nextAnswers: Eq5d5lAnswers = { ...answers, [dimensionId]: value }
      onNext?.(currentStep + 1, nextAnswers)
    }
  }

  return (
    <ScreenLayout
      title="EQ-5D-5L"
      subtitle={`Step ${currentStep + 1} of ${totalSteps}`}
      onBack={onBack}
      footer={
        <ScreenLayoutFooterButton
          label={isLastStep ? 'Complete' : 'Next'}
          onClick={handleNext}
          disabled={!canGoNext}
        />
      }
    >
      <Eq5d5lProgress stepIndex={currentStep} totalSteps={totalSteps} />

      <p className="eq5d5l-step-instruction">{EQ5D5L_INSTRUCTION}</p>
      <h2 className="eq5d5l-step-dimension">{dimensionLabel}</h2>

      <RadioGroup
        value={value !== undefined ? String(value) : ''}
        onValueChange={(v) => setAnswer(Number(v) as Eq5d5lLevel)}
        items={radioItems}
        name={`eq5d5l-${dimensionId}`}
        className="eq5d5l-step-radios"
      />
    </ScreenLayout>
  )
}
