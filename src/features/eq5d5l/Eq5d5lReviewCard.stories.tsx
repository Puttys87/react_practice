import type { Meta, StoryObj } from '@storybook/react'
import { Eq5d5lReviewCard } from './Eq5d5lReviewCard'

const meta: Meta<typeof Eq5d5lReviewCard> = {
  title: 'Features/EQ-5D-5L/Eq5d5lReviewCard',
  component: Eq5d5lReviewCard,
}
export default meta

type Story = StoryObj<typeof Eq5d5lReviewCard>

export const Mobility: Story = {
  args: { dimensionId: 'mobility', level: 1 },
}

export const SelfCare: Story = {
  args: { dimensionId: 'selfCare', level: 3 },
}

export const AnxietyDepression: Story = {
  args: { dimensionId: 'anxietyDepression', level: 5 },
}
