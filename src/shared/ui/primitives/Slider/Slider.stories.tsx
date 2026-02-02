import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './index'
import { useState } from 'react'

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
}
export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    'aria-label': 'Health score',
  },
}

export const Controlled: Story = {
  render: function Controlled() {
    const [value, setValue] = useState(66)
    return (
      <div style={{ width: 280 }}>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          aria-label="Health score"
        />
        <p style={{ marginTop: 8, fontSize: 14 }}>Value: {value}</p>
      </div>
    )
  },
}
