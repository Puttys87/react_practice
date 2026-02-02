import type { Meta, StoryObj } from '@storybook/react'
import { Eq5d5lCompleteScreen } from './Eq5d5lCompleteScreen'
import type { Eq5d5lAnswers } from '@domains/assessment/types'

const mockAnswers: Eq5d5lAnswers = {
  mobility: 1,
  selfCare: 2,
  usualActivities: 1,
  painDiscomfort: 2,
  anxietyDepression: 3,
}

const meta: Meta<typeof Eq5d5lCompleteScreen> = {
  title: 'Features/Eq5d5lCompleteScreen',
  component: Eq5d5lCompleteScreen,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Eq5d5lCompleteScreen>

export const Default: Story = {
  args: {
    answers: mockAnswers,
    onBackToAssessment: () => console.log('Back to assessment'),
  },
}

export const EmptyAnswers: Story = {
  args: {
    answers: {},
    onBackToAssessment: () => console.log('Back'),
  },
}
