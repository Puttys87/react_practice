import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { RadioGroup } from './index'

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof RadioGroup>

const items = [
  { value: '1', label: 'I have no problems in walking about' },
  { value: '2', label: 'I have slight problems in walking about' },
  { value: '3', label: 'I have moderate problems in walking about' },
  { value: '4', label: 'I have severe problems in walking about' },
  { value: '5', label: 'I am unable to walk about' },
]

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState('1')
    return (
      <RadioGroup
        value={value}
        onValueChange={setValue}
        items={items}
        name="mobility"
      />
    )
  },
}

export const WithSelection: Story = {
  args: {
    value: '3',
    items,
    name: 'mobility',
  },
}
