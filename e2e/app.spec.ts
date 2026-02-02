import { test, expect } from '@playwright/test'

test.describe('Select Assessment', () => {
  test('shows Select Assessment and Start button', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Select Assessment/i })).toBeVisible()
    await expect(
      page.getByRole('button', { name: /Start Selected Assessment \(0\)/ }),
    ).toBeVisible()
  })

  test('select one assessment and Start shows Step 1', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /EQ-5D-5L/ }).click()
    await expect(
      page.getByRole('button', { name: /Start Selected Assessment \(1\)/ }),
    ).toBeVisible()
    await page.getByRole('button', { name: /Start Selected Assessment \(1\)/ }).click()
    await expect(page.getByRole('heading', { name: /EQ-5D-5L/i })).toBeVisible()
    await expect(page.getByText(/Step 1 of 5/).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Mobility' })).toBeVisible()
  })
})

test.describe('EQ-5D-5L Step', () => {
  test('Step 1: select radio and Next shows Step 2', async ({ page }) => {
    await page.goto('/assessment/eq5d5l/step/0')
    await expect(page.getByRole('heading', { name: 'Mobility' })).toBeVisible()
    await page.getByRole('radio', { name: /I have no problems in walking/ }).click()
    await page.getByRole('button', { name: /Next/ }).click()
    await expect(page.getByText(/Step 2 of 5/).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Self-care' })).toBeVisible()
  })
})

test.describe('EQ-VAS flow', () => {
  test('Select EQ-VAS only → Start → slider → Submit → Review → Submit Assessment → Complete', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /EQ-VAS/ }).click()
    await expect(
      page.getByRole('button', { name: /Start Selected Assessment \(1\)/ }),
    ).toBeVisible()
    await page.getByRole('button', { name: /Start Selected Assessment \(1\)/ }).click()
    await expect(page.getByRole('heading', { name: /EQ-VAS/i })).toBeVisible()
    await expect(page.getByText(/Step 1 of 1/)).toBeVisible()
    const slider = page.getByRole('slider')
    await slider.click()
    await slider.press('ArrowRight')
    await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled()
    await page.getByRole('button', { name: 'Submit' }).click()
    await expect(page.getByRole('heading', { name: 'Review and Submit' })).toBeVisible()
    await expect(page.getByText('You have completed the EQ-VAS assessment.')).toBeVisible()
    await page.getByRole('button', { name: 'Submit Assessment' }).click()
    await expect(page.getByRole('heading', { name: /EQ-VAS/i })).toBeVisible()
    await expect(page.getByText('Thank you. Your responses have been recorded.')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Back to Select Assessment' }),
    ).toBeVisible()
  })
})

test.describe('EQ-5D-5L Review flow', () => {
  test('Step 5 Complete → Review → Submit Assessment → Complete', async ({ page }) => {
    await page.goto('/assessment/eq5d5l/step/0')
    for (const label of [
      /I have no problems in walking/,
      /I have no problems washing/,
      /I have no problems doing my usual/,
      /I have no pain or discomfort/,
      /I am not anxious or depressed/,
    ]) {
      await page.getByRole('radio', { name: label }).click()
      await page.getByRole('button', { name: /Next|Complete/ }).click()
    }
    await expect(page.getByRole('heading', { name: 'Review and Submit' })).toBeVisible()
    await expect(page.getByText('You have completed the EQ-5D-5L assessment.')).toBeVisible()
    await page.getByRole('button', { name: 'Submit Assessment' }).click()
    await expect(page.getByText('Thank you. Your responses have been recorded.')).toBeVisible()
    await expect(
      page.getByRole('button', { name: 'Back to Select Assessment' }),
    ).toBeVisible()
  })
})
