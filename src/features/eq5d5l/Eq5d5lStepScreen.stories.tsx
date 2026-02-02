import type { Meta, StoryObj } from '@storybook/react'
import { Eq5d5lStepScreen } from './Eq5d5lStepScreen'

const meta: Meta<typeof Eq5d5lStepScreen> = {
  title: 'Features/Eq5d5lStepScreen',
  component: Eq5d5lStepScreen,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Eq5d5lStepScreen>

export const Step1Mobility: Story = {
  args: {
    stepIndex: 0,
    onNext: (idx, answers) => console.log('Next', idx, answers),
    onBack: () => console.log('Back'),
    onComplete: (answers) => console.log('Complete', answers),
  },
}

export const Step3UsualActivities: Story = {
  args: {
    stepIndex: 2,
    initialAnswers: { mobility: 1, selfCare: 2 },
    onNext: (idx) => console.log('Next', idx),
    onBack: () => console.log('Back'),
  },
}
