export interface AWSConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface SendProgress {
  type: 'sms' | 'email';
  target: string;
  status: 'pending' | 'sending' | 'success' | 'error';
  message?: string;
}
