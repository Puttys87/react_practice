/**
 * Radix UI Radio Group wrapper.
 * 앱/기능에서는 이 wrapper만 사용, @radix-ui/react-radio-group 직접 import 금지.
 */
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { forwardRef } from 'react'
import './RadioGroup.css'

export const Root = RadixRadioGroup.Root
export const Item = RadixRadioGroup.Item
export const Indicator = RadixRadioGroup.Indicator

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> {
  value: string
  label: string
}

const RadioGroupItemComponent = forwardRef<
  React.ComponentRef<typeof RadixRadioGroup.Item>,
  RadioGroupItemProps
>(({ value, label, className = '', ...props }, ref) => (
  <RadixRadioGroup.Item
    ref={ref}
    value={value}
    className={`primitive-radiogroup-item ${className}`.trim()}
    {...props}
  >
    <span className="primitive-radiogroup-indicator-wrapper">
      <RadixRadioGroup.Indicator className="primitive-radiogroup-indicator" />
    </span>
    <span className="primitive-radiogroup-label">{label}</span>
  </RadixRadioGroup.Item>
))
RadioGroupItemComponent.displayName = 'RadioGroupItem'

export const RadioGroupItem = RadioGroupItemComponent

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> {
  value?: string
  onValueChange?: (value: string) => void
  items: { value: string; label: string }[]
  name?: string
}

export const RadioGroup = forwardRef<
  React.ComponentRef<typeof RadixRadioGroup.Root>,
  RadioGroupProps
>(({ value, onValueChange, items, name, className = '', ...props }, ref) => (
  <RadixRadioGroup.Root
    ref={ref}
    value={value}
    onValueChange={onValueChange}
    className={`primitive-radiogroup ${className}`.trim()}
    {...props}
  >
    {items.map((item) => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        name={name}
      />
    ))}
  </RadixRadioGroup.Root>
))
RadioGroup.displayName = 'RadioGroup'
