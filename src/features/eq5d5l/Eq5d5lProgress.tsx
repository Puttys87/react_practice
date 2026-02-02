import { EQ5D5L_TOTAL_STEPS } from '@domains/assessment/constants'
import './Eq5d5lProgress.css'

export interface Eq5d5lProgressProps {
  stepIndex: number
  totalSteps?: number
}

export function Eq5d5lProgress({
  stepIndex,
  totalSteps = EQ5D5L_TOTAL_STEPS,
}: Eq5d5lProgressProps) {
  const current = stepIndex + 1
  const filled = Math.min(current, totalSteps)

  return (
    <div className="eq5d5l-progress" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Step ${current} of ${totalSteps}`}>
      <div className="eq5d5l-progress__bar">
        {Array.from({ length: totalSteps }, (_, i) => (
          <span
            key={i}
            className={`eq5d5l-progress__segment ${i < filled ? 'eq5d5l-progress__segment--filled' : ''}`}
          />
        ))}
      </div>
      <p className="eq5d5l-progress__text">
        Step {current} of {totalSteps}
      </p>
    </div>
  )
}
