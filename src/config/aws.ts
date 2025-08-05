// AWS Configuration Constants
// Please modify your AWS credentials here

export const AWS_CONFIG = {
  region: 'us-east-1',
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'
} as const;

// Default sender email
export const DEFAULT_FROM_EMAIL = 'sender@example.com';

// Default message content
export const DEFAULT_SMS_MESSAGE = 'Want to buy a house? We have great properties available. Please contact me.';
export const DEFAULT_EMAIL_SUBJECT = 'Want to buy a house?';
export const DEFAULT_EMAIL_MESSAGE = 'We have great properties available. Please contact me.';
