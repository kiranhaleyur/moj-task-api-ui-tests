import { test } from '@fixtures/api-auth-fixture';
import { createPetstoreUser } from '@test-data/api-create-user-data';
import { expectPetstoreBadInputResponse } from '@utils/api-helpers';

function getPetstoreUrl(path: string): string {
  const baseUrl = process.env.PETSTORE_BASE_URL;
  if (!baseUrl) {
    throw new Error('PETSTORE_BASE_URL is required in .env or the environment');
  }

  return new URL(path, baseUrl).toString();
}

// Consult the OpenAPI schema for JSON fields, types and constraints; use XSD for XML payloads.
test.describe('Petstore user API - unhappy paths', () => {
  test('POST /v2/user - returns 400 for malformed JSON with text instead of a numeric ID @api @regression @create-user', async ({
    request,
  }) => {
    const user = createPetstoreUser();
    const userUrl = getPetstoreUrl('/v2/user');
    const requestBody = JSON.stringify({ ...user, id: 'text' }).replace('"id":"text"', '"id":text');
    const response = await request.post(userUrl, {
      data: Buffer.from(requestBody, 'utf8'),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    await expectPetstoreBadInputResponse(response);
  });

  test.fixme('POST /v2/user - returns 400 for fields with incorrect data types @api @regression @create-user', () => {
    // Send valid JSON with one wrong field type at a time; verify whether the API returns 400.
  });

  test.fixme('POST /v2/user - checks for 400 on missing, null and empty field values @api @regression @create-user', () => {
    // Test each value separately; confirm which fields are required and whether rejection returns 400.
  });

  test.fixme('POST /v2/user - checks for 400 beyond attribute boundaries @api @regression @create-user', () => {
    // Test applicable numeric and length limits at and beyond each boundary; confirm the expected statuses.
  });

  test.fixme('POST /v2/user - checks for 400 on unsupported special characters @api @regression @create-user', () => {
    // Confirm which characters are unsupported, then verify whether valid JSON containing them returns 400.
  });

  test.fixme('POST /v2/user - checks for 409 on a duplicate username without changing the existing user @api @regression @create-user', () => {
    // Verify whether POST rejects duplicates with 409; GET the existing user and check it remains unchanged.
  });

  test.fixme('POST /v2/user - checks for 409 on an already used email address @api @regression @create-user', () => {
    // Verify whether duplicate email addresses are rejected and whether 409 is the expected response.
  });

  test.fixme('POST /v2/user - checks for 400 on an empty request body @api @regression @create-user', () => {
    // Send an empty body with a JSON content type and verify whether the API returns 400.
  });

  test.fixme('POST /v2/uesr - returns 404 for an incorrect URL @api @regression @create-user', () => {
    // Verify whether the nonexistent endpoint returns 404.
  });

  test.fixme('POST /v2/user - returns 415 for an unsupported content type @api @regression @create-user', () => {
    // Send an unsupported Content-Type and verify whether the API returns 415.
  });

  test.fixme('POST /v2/user - handles a 500 internal server error @api @regression @create-user', () => {
    // Use a mock server or stub to simulate a 500 response and verify client handling.
  });

  test.fixme('POST /v2/user - handles a 502 bad gateway error @api @regression @create-user', () => {
    // Use a mock server or stub to simulate a 502 response and verify client handling.
  });

  test.fixme('POST /v2/user - handles a 503 service unavailable error @api @regression @create-user', () => {
    // Use a mock server or stub to simulate a 503 response and verify client handling.
  });

  test.fixme('POST /v2/user - handles a 504 gateway timeout error @api @regression @create-user', () => {
    // Use a mock server or stub to simulate a 504 response and verify client handling.
  });
});
