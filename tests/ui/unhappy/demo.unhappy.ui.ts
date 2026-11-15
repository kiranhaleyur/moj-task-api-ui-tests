import { test } from '@fixtures/orangehrm-page-fixture';

test.describe('OrangeHRM demo page - unhappy paths', () => {
  test('empty submission requires CAPTCHA @ui @smoke @regression', async ({
    orangeHrmDemoPage,
    orangeHrmLandingPage,
  }) => {
    await orangeHrmLandingPage.navigateToDemo();
    await orangeHrmDemoPage.clickGetAFreeDemo();
    await orangeHrmDemoPage.verifyCaptchaError();
  });

  test.fixme('demo form requires a full name @ui @regression', () => {
    // Verify the required-field message when CAPTCHA has been completed in a controlled environment.
  });

  test.fixme('demo form rejects an invalid work email @ui @regression', () => {
    // Test invalid partitions, such as a missing @ or domain; confirm expected validation.
  });

  test.fixme('demo form rejects an invalid phone number @ui @regression', () => {
    // Test invalid partitions, such as letters or unsupported formats; confirm expected validation.
  });

  test.fixme('demo form validates missing country and employee count @ui @regression', () => {
    // Test unselected values separately; confirm whether each field is required.
  });

  test.fixme('demo form validates field length limits @ui @regression', () => {
    // Confirm limits, then test just below the minimum and just above the maximum where applicable.
  });
});
