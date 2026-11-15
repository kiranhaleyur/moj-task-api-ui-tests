import { faker } from '@faker-js/faker';
import { generatePhoneNumber, generateRandomString, generateTimestampId } from '@utils/random-data';

export interface PetstoreUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
}

export function createPetstoreUser(): PetstoreUser {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = `${faker.internet.username({ firstName, lastName }).toLowerCase()}-${generateRandomString()}`;

  return {
    id: generateTimestampId(),
    username,
    firstName,
    lastName,
    email: `${username}@example.com`,
    password: generateRandomString(),
    phone: generatePhoneNumber(),
    userStatus: 1,
  };
}
