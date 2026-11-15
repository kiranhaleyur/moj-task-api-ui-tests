import { test, expect } from '@fixtures/api-auth-fixture';
import { createPetstoreUser } from '@test-data/api-create-user-data';
import { expectUserCreated } from '@utils/api-helpers';

test.describe('Petstore user API - happy paths', () => {
  test('POST /v2/user - creates a user with 200 @api @smoke @regression @create-user', async ({
    request,
  }) => {
    const baseUrl = process.env.PETSTORE_BASE_URL;
    if (!baseUrl) {
      throw new Error('PETSTORE_BASE_URL is required in .env or the environment');
    }

    const user = createPetstoreUser();
    const userUrl = new URL('/v2/user', baseUrl).toString();

    const response = await request.post(userUrl, {
      data: user,
      headers: { Accept: 'application/json' },
    });

    await expectUserCreated(response, user.id);

    const getResponse = await request.get(
      new URL(`/v2/user/${encodeURIComponent(user.username)}`, baseUrl).toString(),
      { headers: { Accept: 'application/json' } }
    );

    expect(getResponse.status()).toBe(200);
    expect(await getResponse.json()).toEqual(user);
  });

  test.fixme('POST /v2/user - creates multiple users with distinct usernames @api @regression @create-user', () => {
    // Expect 200 for each POST and GET; verify each user can be retrieved independently.
  });

  test.fixme('POST /v2/user - creates a user with optional fields omitted @api @regression @create-user', () => {
    // Confirm which fields may be omitted, then expect 200 for POST and GET.
  });

  test.fixme('POST /v2/user - accepts valid boundary values @api @regression @create-user', () => {
    // Confirm applicable limits, then expect 200 for valid boundary values on POST and GET.
  });

  test.fixme('POST /v2/user - accepts supported special characters @api @regression @create-user', () => {
    // Confirm supported characters, then expect 200 for POST and GET and verify the returned values.
  });
});
