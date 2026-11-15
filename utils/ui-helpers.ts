/**
 * UI test helpers
 * Shared utility functions for UI tests
 */

import { Locator, Page, Response, expect } from '@playwright/test';

// Opens a page using the configured base URL for relative paths.
export async function openPage(page: Page, path: string): Promise<Response | null> {
  return page.goto(path);
}

// Checks that the requested text is visible.
export async function verifyPageByText(page: Page, text: string, exact = false): Promise<void> {
  await expect(page.getByText(text, { exact }).filter({ visible: true }).first()).toBeVisible();
}

// Clicks the first visible element with the exact text.
export async function clickOnText(page: Page, text: string): Promise<void> {
  await page.getByText(text, { exact: true }).filter({ visible: true }).first().click();
}

// Clicks a button by its accessible name.
export async function clickOnButtonByName(scope: Page | Locator, name: string): Promise<void> {
  await scope.getByRole('button', { name, exact: true }).click();
}

// Finds an input or textarea by its accessible name.
export function getTextBoxByName(scope: Page | Locator, name: string): Locator {
  return scope.getByRole('textbox', { name, exact: true });
}

// Finds a dropdown by its accessible name.
export function getDropdownByName(scope: Page | Locator, name: string): Locator {
  return scope.getByRole('combobox', { name, exact: true });
}

// Checks that a button with the specified accessible name is visible.
export async function verifyButtonByName(page: Page, name: string): Promise<void> {
  await expect(page.getByRole('button', { name, exact: true })).toBeVisible();
}

export const uiHelpers = {
  openPage,
  verifyPageByText,
  clickOnText,
  clickOnButtonByName,
  getTextBoxByName,
  getDropdownByName,
  verifyButtonByName,
};
