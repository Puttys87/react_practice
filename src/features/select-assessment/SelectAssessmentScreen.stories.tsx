import type { Meta, StoryObj } from '@storybook/react'
import { SelectAssessmentScreen } from './SelectAssessmentScreen'

const meta: Meta<typeof SelectAssessmentScreen> = {
  title: 'Features/SelectAssessmentScreen',
  component: SelectAssessmentScreen,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SelectAssessmentScreen>

export const Default: Story = {
  args: {
    onStart: (ids) => console.log('Start', ids),
  },
}
