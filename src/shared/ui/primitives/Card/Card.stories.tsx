import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './index'

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: 'Card content',
  },
}

export const Selected: Story = {
  args: {
    variant: 'selected',
    children: 'Selected card content',
  },
}
