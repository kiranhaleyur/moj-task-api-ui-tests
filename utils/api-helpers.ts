/**
 * API test helpers
 * Utilities for API testing
 */

import { APIResponse, expect } from '@playwright/test';

export async function expectUserCreated(response: APIResponse, userId: number): Promise<void> {
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({
    code: 200,
    message: String(userId),
  });
}

// Checks the 400 status and Petstore bad-input response body.
export async function expectPetstoreBadInputResponse(response: APIResponse): Promise<void> {
  expect(response.status(), `Response body: ${await response.text()}`).toBe(400);
  expect(await response.json()).toEqual({
    code: 400,
    type: 'unknown',
    message: 'bad input',
  });
}

export const apiHelpers = {
  expectUserCreated,
  expectPetstoreBadInputResponse,
};
