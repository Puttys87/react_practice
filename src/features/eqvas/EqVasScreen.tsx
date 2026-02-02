/**
 * EQ-VAS 설문 화면: Step 1 of 1, 안내 2줄, Slider(0–100), 범례, Submit → review.
 */
import { ScreenLayout, ScreenLayoutFooterButton } from '@shared/layout/ScreenLayout'
import { Slider } from '@shared/ui/primitives/Slider'
import { useEqVas } from './useEqVas'
import './EqVasScreen.css'

const EQVAS_INSTRUCTION_1 =
  'We would like to know how good or bad your health is TODAY.'
const EQVAS_INSTRUCTION_2 = 'Please indicate on the scale how your health is today.'
const EQVAS_LEGEND_TOP = '100 = Best health you can imagine'
const EQVAS_LEGEND_BOTTOM = '0 = Worst health you can imagine'

export interface EqVasScreenProps {
  onSubmit?: (score: number) => void
  onBack?: () => void
}

export function EqVasScreen({ onSubmit, onBack }: EqVasScreenProps) {
  const { value, setValue, canSubmit, min, max, step } = useEqVas()

  return (
    <ScreenLayout
      title="EQ-VAS"
      subtitle="Step 1 of 1"
      onBack={onBack}
      footer={
        <ScreenLayoutFooterButton
          label="Submit"
          onClick={() => value !== undefined && onSubmit?.(value)}
          disabled={!canSubmit}
        />
      }
    >
      <p className="eqvas-instruction">{EQVAS_INSTRUCTION_1}</p>
      <p className="eqvas-instruction">{EQVAS_INSTRUCTION_2}</p>

      <div className="eqvas-slider-wrap">
        <Slider
          value={value ?? 0}
          onValueChange={(v) => setValue(v)}
          min={min}
          max={max}
          step={step}
          aria-label="EQ-VAS health scale 0 to 100"
        />
        <p className="eqvas-value" aria-live="polite">
          {value !== undefined ? value : '—'}
        </p>
      </div>

      <div className="eqvas-legend" role="status">
        <p>{EQVAS_LEGEND_TOP}</p>
        <p>{EQVAS_LEGEND_BOTTOM}</p>
      </div>
    </ScreenLayout>
  )
}
