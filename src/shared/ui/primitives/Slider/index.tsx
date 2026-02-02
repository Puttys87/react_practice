/**
 * Radix UI Slider wrapper.
 * 앱/기능에서는 이 wrapper만 사용, @radix-ui/react-slider 직접 import 금지.
 */
import * as RadixSlider from '@radix-ui/react-slider'
import { forwardRef } from 'react'
import './Slider.css'

export interface SliderProps {
  value?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  /** a11y: aria-label or aria-labelledby */
  'aria-label'?: string
  'aria-labelledby'?: string
}

export const Slider = forwardRef<
  React.ComponentRef<typeof RadixSlider.Root>,
  SliderProps
>(
  (
    {
      value = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      className = '',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    },
    ref,
  ) => (
    <RadixSlider.Root
      ref={ref}
      value={[value]}
      onValueChange={(v) => onValueChange?.(v[0] ?? min)}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className={`primitive-slider ${className}`.trim()}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      <RadixSlider.Track className="primitive-slider__track">
        <RadixSlider.Range className="primitive-slider__range" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="primitive-slider__thumb" />
    </RadixSlider.Root>
  ),
)
Slider.displayName = 'Slider'
