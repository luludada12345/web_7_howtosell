import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { AWSConfig } from '../types/AWSType';

export class MessageSender {
  private snsClient: SNSClient;
  private sesClient: SESClient;

  constructor(config: AWSConfig) {
    this.snsClient = new SNSClient({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });

    this.sesClient = new SESClient({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    try {
      const command = new PublishCommand({
        PhoneNumber: phoneNumber,
        Message: message,
      });

      await this.snsClient.send(command);
    } catch (error) {
      throw new Error(`SMS sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async sendEmail(
    toEmail: string,
    subject: string,
    message: string,
    fromEmail: string
  ): Promise<void> {
    try {
      const command = new SendEmailCommand({
        Source: fromEmail,
        Destination: {
          ToAddresses: [toEmail],
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: message,
              Charset: 'UTF-8',
            },
          },
        },
      });

      await this.sesClient.send(command);
    } catch (error) {
      throw new Error(`Email sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Validate phone number format (flexible validation for international numbers)
  static isValidPhoneNumber(phone: string): boolean {
    // Remove all spaces, dashes, parentheses, dots, and plus signs for validation
    const cleanPhone = phone.replace(/[\s\-\(\)\.\+]/g, '');
    
    // Support various international formats:
    // - 7-15 digits (international standard)
    // - Must be all digits after cleaning
    // Examples: 
    // - 523306866 (UAE)
    // - 8613812345678 (China with country code)
    // - 13812345678 (China mobile)
    // - 12345678901 (US)
    // - +971523306866 (UAE with country code)
    // - +86 138 1234 5678 (formatted Chinese number)
    
    if (!/^\d+$/.test(cleanPhone)) {
      return false; // Must contain only digits after cleaning
    }
    
    const length = cleanPhone.length;
    return length >= 7 && length <= 15;
  }

  // 验证邮箱格式
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
