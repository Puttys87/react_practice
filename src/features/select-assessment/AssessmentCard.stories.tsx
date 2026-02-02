import type { Meta, StoryObj } from '@storybook/react'
import { AssessmentCard } from './AssessmentCard'
import type { Assessment } from '@domains/assessment/types'

const mockAssessment: Assessment = {
  id: 'eq5d5l',
  title: 'EQ-5D-5L',
  description:
    'Evaluates current health status including modality, self-care, usual activities, pain/discomfort, and anxiety/depression.',
  estimatedMinutes: 'About 2-3 mins',
  hasSurvey: true,
}

const meta: Meta<typeof AssessmentCard> = {
  title: 'Features/AssessmentCard',
  component: AssessmentCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof AssessmentCard>

export const Unselected: Story = {
  args: {
    assessment: mockAssessment,
    selected: false,
    onToggle: () => {},
  },
}

export const Selected: Story = {
  args: {
    assessment: mockAssessment,
    selected: true,
    onToggle: () => {},
  },
}
