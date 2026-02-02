import type { Meta, StoryObj } from '@storybook/react'
import { ScreenLayout, ScreenLayoutFooterButton } from './ScreenLayout'

const meta: Meta<typeof ScreenLayout> = {
  title: 'Layout/ScreenLayout',
  component: ScreenLayout,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ScreenLayout>

export const Default: Story = {
  args: {
    title: 'Screen Title',
    subtitle: 'Step 1 of 5',
    children: <p>Main content area.</p>,
    footer: (
      <ScreenLayoutFooterButton
        label="Next"
        onClick={() => {}}
      />
    ),
  },
}

export const WithBack: Story = {
  args: {
    title: 'EQ-5D-5L',
    subtitle: 'Step 1 of 5',
    onBack: () => {},
    children: <p>Content with back button.</p>,
    footer: (
      <ScreenLayoutFooterButton
        label="Next"
        onClick={() => {}}
      />
    ),
  },
}
