import { Page } from '@playwright/test';
import { uiHelpers } from '@utils/ui-helpers';

export class OrangeHrmLandingPage {
  constructor(private readonly page: Page) {}

  async openHome(): Promise<void> {
    await uiHelpers.openPage(this.page, '/');
  }

  async verifyDemoLink(): Promise<void> {
    await uiHelpers.verifyPageByText(this.page, 'Book a Free Demo', true);
  }

  async clickDemoLink(): Promise<void> {
    await uiHelpers.clickOnText(this.page, 'Book a Free Demo');
  }

  async navigateToDemo(): Promise<void> {
    await this.openHome();
    await this.verifyDemoLink();
    await this.clickDemoLink();
  }
}
