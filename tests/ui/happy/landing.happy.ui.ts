import { test } from '@fixtures/orangehrm-page-fixture';

test.describe('OrangeHRM landing page - happy paths', () => {
  test('homepage displays the demo link @ui @regression', async ({ orangeHrmLandingPage }) => {
    await orangeHrmLandingPage.openHome();
    await orangeHrmLandingPage.verifyDemoLink();
  });
});
