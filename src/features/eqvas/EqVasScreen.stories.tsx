import type { Meta, StoryObj } from '@storybook/react'
import { EqVasScreen } from './EqVasScreen'

const meta: Meta<typeof EqVasScreen> = {
  title: 'Features/EQ-VAS/EqVasScreen',
  component: EqVasScreen,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof EqVasScreen>

export const Default: Story = {
  args: {
    onSubmit: () => {},
    onBack: () => {},
  },
}
