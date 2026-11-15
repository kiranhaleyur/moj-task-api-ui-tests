import { test } from '@fixtures/orangehrm-page-fixture';
import { createDemoFormData } from '@test-data/ui-demo-data';

test.describe('OrangeHRM demo page - happy paths', () => {
  test('demo request form can be filled with generated data @ui @smoke @regression', async ({
    orangeHrmDemoPage,
    orangeHrmLandingPage,
  }) => {
    const data = createDemoFormData();
    await orangeHrmLandingPage.navigateToDemo();
    await orangeHrmDemoPage.completeDemoForm(data);
  });

  test.fixme('demo form privacy policy link opens the policy page @ui @regression', () => {});

  test.fixme('successful demo request displays the thank-you page @ui @regression', () => {});
});
