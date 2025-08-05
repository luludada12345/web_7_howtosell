# Bulk SMS/Email Sender

This is a React + TypeScript mobile web application for bulk sending SMS and emails. It uses AWS SNS for SMS and AWS SES for email services.

## Features

- ✅ Bulk input of phone numbers and email addresses (supports pasting multiple)
- ✅ Automatic recognition and validation of phone/email formats
- ✅ AWS SNS for SMS sending
- ✅ AWS SES for email sending
- ✅ Real-time sending progress and status display
- ✅ Mobile-friendly responsive design
- ✅ Support for pausing and resuming sends (interval sending to avoid rate limits)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

## Configuration

### AWS Credentials Configuration
Edit the `src/config/aws.ts` file and modify the following configuration:

```typescript
export const AWS_CONFIG = {
  region: 'us-east-1',           // Your AWS region
  accessKeyId: 'YOUR_ACCESS_KEY_ID',     // Your Access Key ID
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'  // Your Secret Access Key
} as const;
```

### Default Settings
You can also modify default email and SMS content in the same file:

```typescript
export const DEFAULT_FROM_EMAIL = 'sender@example.com';
export const DEFAULT_SMS_MESSAGE = 'Want to buy a house? We have great properties available. Please contact me.';
export const DEFAULT_EMAIL_SUBJECT = 'Want to buy a house?';
export const DEFAULT_EMAIL_MESSAGE = 'We have great properties available. Please contact me.';
```

### 4. AWS Service Configuration

#### SNS SMS Service
- Ensure your AWS account has SNS service enabled
- Ensure you have SMS sending permissions
- Some regions may require applying for SMS sending permissions

#### SES Email Service
- Ensure your AWS account has SES service enabled
- Sender email needs to be verified in SES
- If in sandbox mode, recipient emails also need verification

## Usage

1. **Configure AWS credentials**: Edit `src/config/aws.ts` file to set your AWS credentials

2. **Input contacts**:
   - Paste phone numbers or emails in the text box
   - Supports multiple formats: one per line or comma-separated
   - System automatically recognizes and validates formats

3. **Switch modes**:
   - Click "Phone Mode" or "Email Mode" to switch input types
   - Send area automatically switches to corresponding configuration interface

4. **Send messages**:
   - Edit message content
   - Click corresponding send button
   - Observe sending progress

## Supported Formats

### Phone Number Formats
- 138xxxxxxxx (domestic format)
- +86138xxxxxxxx (international format)

### Email Formats
- user@example.com (standard email format)

## Important Notes

⚠️ **Important Reminders**:
- Please comply with local laws and regulations, only send messages to users who have agreed to receive them
- AWS SNS and SES may incur charges, please pay attention to cost control
- It's recommended to test with a small number of test users first to verify functionality
- Send interval is set to 1 second to avoid triggering AWS rate limits

## Tech Stack

- React 19 + TypeScript
- AWS SDK (SNS + SES)
- Vite build tool
- Responsive CSS design

## 配置说明

### AWS凭证配置
编辑 `src/config/aws.ts` 文件，修改以下配置：

```typescript
export const AWS_CONFIG = {
  region: 'us-east-1',           // 您的AWS区域
  accessKeyId: 'YOUR_ACCESS_KEY_ID',     // 您的Access Key ID
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY'  // 您的Secret Access Key
} as const;
```

### 默认设置
您还可以在同一文件中修改默认的邮件和短信内容：

```typescript
export const DEFAULT_FROM_EMAIL = 'sender@example.com';
export const DEFAULT_SMS_MESSAGE = '您好，这是一条测试短信。';
export const DEFAULT_EMAIL_SUBJECT = '测试邮件';
export const DEFAULT_EMAIL_MESSAGE = '您好，这是一条测试邮件。';
```

### 4. AWS服务配置

#### SNS短信服务
- 确保你的AWS账户已启用SNS服务
- 确保你有发送短信的权限
- 某些地区可能需要申请短信发送权限

#### SES邮件服务
- 确保你的AWS账户已启用SES服务
- 发件人邮箱需要在SES中验证
- 如果在沙盒模式，收件人邮箱也需要验证

## 使用方法

1. **配置AWS凭证**：编辑 `src/config/aws.ts` 文件，设置您的AWS凭证

2. **录入联系方式**：
   - 在文本框中粘贴手机号或邮箱
   - 支持多种格式：每行一个，或用逗号分隔
   - 系统会自动识别和验证格式

3. **切换模式**：
   - 点击"手机号模式"或"邮箱模式"切换输入类型
   - 发送区域会自动切换对应的配置界面

4. **发送消息**：
   - 编辑消息内容
   - 点击对应的发送按钮
   - 观察发送进度

## 支持的格式

### 手机号格式
- 138xxxxxxxx（国内格式）
- +86138xxxxxxxx（国际格式）

### 邮箱格式
- user@example.com（标准邮箱格式）

## 注意事项

⚠️ **重要提醒**：
- 请确保遵守当地法律法规，仅向同意接收信息的用户发送消息
- AWS SNS和SES可能产生费用，请注意成本控制
- 建议先用少量测试用户验证功能正常
- 发送间隔设置为1秒，避免触发AWS频率限制

## 技术栈

- React 19 + TypeScript
- AWS SDK (SNS + SES)
- Vite构建工具
- 响应式CSS设计

## Project Structure

```
src/
├── components/
│   ├── ContactInput.tsx           # Contact input component (supports mode switching)
│   ├── SendButton.tsx             # Send button component (auto-adapts to mode)
│   └── index.ts                   # Component export index
├── config/
│   └── aws.ts                     # AWS configuration constants
├── pages/
│   └── home.tsx                   # Main page (combines input and send components)
├── services/
│   └── MessageSender.ts           # AWS service wrapper
├── types/
│   └── AWSType.ts                 # TypeScript type definitions
├── mobile.css                     # Mobile optimization styles
└── App.tsx                        # Application entry component
```

## Component Design

### ContactInput Component
- Supports phone/email mode switching
- Automatic recognition and validation of input formats
- Real-time display of recognition result statistics
- Responsive design, mobile-friendly

### SendButton Component
- Automatically switches send functionality based on selected mode
- Uses AWS credentials from configuration file
- Real-time sending progress display
- Send buttons always visible, no configuration required
- Supports different configurations for SMS and email

### Home Page
- Combines input and send components
- Unified state management
- Clean interface design

## Troubleshooting

### SMS Sending Failure
- Check AWS SNS permissions
- Verify phone number format is correct
- Confirm AWS region configuration is correct

### Email Sending Failure
- Check if sender email is verified in SES
- If in sandbox mode, confirm recipient emails are verified
- Check AWS SES permission settings

### AWS Credentials Issues
- Ensure Access Key has necessary SNS and SES permissions
- Check if region configuration is correct
- Verify credentials are valid and not expired
