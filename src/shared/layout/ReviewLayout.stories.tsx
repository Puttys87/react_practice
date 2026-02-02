import type { Meta, StoryObj } from '@storybook/react'
import { ReviewLayout } from './ReviewLayout'

const meta: Meta<typeof ReviewLayout> = {
  title: 'Layout/ReviewLayout',
  component: ReviewLayout,
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof ReviewLayout>

export const Default: Story = {
  args: {
    introLines: (
      <>
        <p>Please review your answers and submit.</p>
        <p>You have completed the EQ-5D-5L assessment.</p>
      </>
    ),
    children: (
      <div style={{ padding: 16, background: 'var(--color-secondary)', borderRadius: 8 }}>
        Placeholder for review cards
      </div>
    ),
    onSubmit: () => {},
  },
}

export const WithBack: Story = {
  args: {
    introLines: (
      <>
        <p>Please review your answers and submit.</p>
        <p>You have completed the EQ-VAS assessment.</p>
      </>
    ),
    children: (
      <div style={{ padding: 16, background: 'var(--color-secondary)', borderRadius: 8 }}>
        EQ-VAS score card placeholder
      </div>
    ),
    onSubmit: () => {},
    onBack: () => {},
  },
}
