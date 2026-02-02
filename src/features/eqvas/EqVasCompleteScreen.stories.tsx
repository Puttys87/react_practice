import type { Meta, StoryObj } from '@storybook/react'
import { EqVasCompleteScreen } from './EqVasCompleteScreen'

const meta: Meta<typeof EqVasCompleteScreen> = {
  title: 'Features/EQ-VAS/EqVasCompleteScreen',
  component: EqVasCompleteScreen,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof EqVasCompleteScreen>

export const Default: Story = {
  args: {
    score: 66,
    onBackToAssessment: () => {},
  },
}
