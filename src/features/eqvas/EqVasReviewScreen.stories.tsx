import type { Meta, StoryObj } from '@storybook/react'
import { EqVasReviewScreen } from './EqVasReviewScreen'

const meta: Meta<typeof EqVasReviewScreen> = {
  title: 'Features/EQ-VAS/EqVasReviewScreen',
  component: EqVasReviewScreen,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof EqVasReviewScreen>

export const Default: Story = {
  args: {
    score: 66,
    onSubmit: () => {},
    onBack: () => {},
  },
}
