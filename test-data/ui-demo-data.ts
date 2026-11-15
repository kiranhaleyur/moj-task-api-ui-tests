import { faker } from '@faker-js/faker';
import { generatePhoneNumber, generateRandomString } from '@utils/random-data';

export interface DemoFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  companyName: string;
  jobTitle: string;
  employees: string;
}

export function createDemoFormData(): DemoFormData {
  return {
    fullName: faker.person.fullName(),
    email: `demo-${generateRandomString()}@example.com`,
    phone: generatePhoneNumber(),
    country: 'United Kingdom',
    companyName: faker.company.name(),
    jobTitle: faker.person.jobTitle(),
    employees: '11 - 50',
  };
}
