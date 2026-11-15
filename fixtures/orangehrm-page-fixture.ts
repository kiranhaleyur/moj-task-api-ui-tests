import { test as base, expect } from '@playwright/test';
import { OrangeHrmDemoPage } from '@pages/orangehrm-demo-page';
import { OrangeHrmLandingPage } from '@pages/orangehrm-landing-page';
import { uiHelpers } from '@utils/ui-helpers';

type OrangeHrmFixtures = {
  orangeHrmDemoPage: OrangeHrmDemoPage;
  orangeHrmLandingPage: OrangeHrmLandingPage;
};

export const test = base.extend<OrangeHrmFixtures>({
  page: async ({ page }, use) => {
    const cookieBanner = page.getByRole('region', { name: 'This website uses cookies' });
    await page.addLocatorHandler(cookieBanner, async () => {
      await uiHelpers.clickOnButtonByName(cookieBanner, 'Deny');
    });
    await use(page);
  },
  orangeHrmDemoPage: async ({ page }, use) => {
    await use(new OrangeHrmDemoPage(page));
  },
  orangeHrmLandingPage: async ({ page }, use) => {
    await use(new OrangeHrmLandingPage(page));
  },
});

export { expect };
