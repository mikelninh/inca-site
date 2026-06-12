import { expect, test } from '@playwright/test'

test('voller Durchklick DE', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('anfassen')

  // Konsole: Fall wechseln -> Receipt ändert sich
  const cases = page.locator('[data-testid^="case-"]')
  await expect(cases.first()).toBeVisible()
  const firstReceipt = await page.getByTestId('receipt').textContent()
  await cases.nth(1).click()
  await expect(page.getByTestId('receipt')).not.toHaveText(firstReceipt!)

  // Agent-Trace aufklappen
  await page.getByTestId('trace-toggle').click()
  await expect(page.getByTestId('receipt')).toContainText('fixture')

  // Tabs
  await page.getByTestId('tab-auswertung').click()
  await expect(page.getByText('handgeschriebenen Fixtures')).toBeVisible()
  await page.getByTestId('tab-benchmark').click()
  await expect(page.getByText('Prompt lesen').first()).toBeVisible()

  // Aufklappbares: Teardown-Bruchstellen
  await page.getByText('Alle 5 Bruchstellen zeigen').click()
  await expect(page.getByText('AVB-Heterogenität')).toBeVisible()

  // Easter Egg + CTA
  await expect(page.getByTestId('easter-egg')).toContainText('refer_to_human')
  await expect(page.getByTestId('mail-cta')).toHaveAttribute('href', 'mailto:mikel_ninh@yahoo.de')
})

test('EN-Toggle wechselt Texte und persistiert', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('lang-toggle').click()
  await expect(page.locator('h1')).toContainText('poke')
  await page.reload()
  await expect(page.locator('h1')).toContainText('poke')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})

test('noindex gesetzt', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow')
})
