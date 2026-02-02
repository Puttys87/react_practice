import type { Meta, StoryObj } from '@storybook/react'
import { Eq5d5lReviewScreen } from './Eq5d5lReviewScreen'

const meta: Meta<typeof Eq5d5lReviewScreen> = {
  title: 'Features/EQ-5D-5L/Eq5d5lReviewScreen',
  component: Eq5d5lReviewScreen,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof Eq5d5lReviewScreen>

const fullAnswers = {
  mobility: 1 as const,
  selfCare: 2 as const,
  usualActivities: 3 as const,
  painDiscomfort: 4 as const,
  anxietyDepression: 5 as const,
}

export const Default: Story = {
  args: {
    answers: fullAnswers,
    onSubmit: () => {},
    onBack: () => {},
  },
}

export const PartialAnswers: Story = {
  args: {
    answers: { mobility: 1, selfCare: 2 },
    onSubmit: () => {},
    onBack: () => {},
  },
}
