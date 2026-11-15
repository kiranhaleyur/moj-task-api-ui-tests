import { Page } from '@playwright/test';
import { DemoFormData } from '@test-data/ui-demo-data';
import { uiHelpers } from '@utils/ui-helpers';

const demoButtonName = 'Get a Free Demo';
const numberOfEmployeesDropDownName = 'No Of Employees';
const countryDropDownName = 'Country';

export class OrangeHrmDemoPage {
  constructor(private readonly page: Page) {}

  async clickGetAFreeDemo(): Promise<void> {
    await uiHelpers.clickOnButtonByName(this.page, demoButtonName);
  }

  async verifyDemoForm(): Promise<void> {
    await uiHelpers.verifyPageByText(this.page, 'We Just Need a Few Details.', true);
    await uiHelpers.verifyButtonByName(this.page, demoButtonName);
  }

  async fillDemoForm(data: DemoFormData): Promise<void> {
    const textFields: [string, string][] = [
      ['Full Name', data.fullName],
      ['Email', data.email],
      ['Phone Number', data.phone],
      ['Company Name', data.companyName],
      ['Job title', data.jobTitle],
    ];

    for (const [name, value] of textFields) {
      await uiHelpers.getTextBoxByName(this.page, name).fill(value);
    }

    await uiHelpers
      .getDropdownByName(this.page, countryDropDownName)
      .selectOption({ label: data.country });
    await uiHelpers
      .getDropdownByName(this.page, numberOfEmployeesDropDownName)
      .selectOption({ label: data.employees });
  }

  async completeDemoForm(data: DemoFormData): Promise<void> {
    await this.verifyDemoForm();
    await this.fillDemoForm(data);
  }

  async verifyCaptchaError(): Promise<void> {
    await uiHelpers.verifyPageByText(this.page, 'Please answer the captcha');
  }
}
