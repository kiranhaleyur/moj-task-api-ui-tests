import { randomBytes } from 'node:crypto';

let previousId = 0;
let generatedPhoneCount = 0;

export function generateRandomString(): string {
  return randomBytes(16).toString('hex');
}

export function generateTimestampId(): number {
  previousId = Math.max(Date.now(), previousId + 1);
  return previousId;
}

export function generatePhoneNumber(): string {
  if (generatedPhoneCount >= 1000) {
    throw new Error('All 1,000 fictional UK phone numbers have been used in this process');
  }

  const suffix = generatedPhoneCount.toString().padStart(3, '0');
  generatedPhoneCount += 1;
  return `+447700900${suffix}`;
}
