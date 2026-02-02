import type { Meta, StoryObj } from '@storybook/react'
import { Eq5d5lProgress } from './Eq5d5lProgress'

const meta: Meta<typeof Eq5d5lProgress> = {
  title: 'Features/Eq5d5lProgress',
  component: Eq5d5lProgress,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Eq5d5lProgress>

export const Step1: Story = {
  args: { stepIndex: 0 },
}

export const Step3: Story = {
  args: { stepIndex: 2 },
}

export const Step5: Story = {
  args: { stepIndex: 4 },
}
