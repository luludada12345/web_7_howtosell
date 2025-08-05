import React, { useState } from 'react';
import { MessageSender } from '../services/MessageSender';
import type { SendProgress } from '../types/AWSType';
import type { ContactType } from './ContactInput';
import { 
  AWS_CONFIG, 
  DEFAULT_FROM_EMAIL, 
  DEFAULT_SMS_MESSAGE, 
  DEFAULT_EMAIL_SUBJECT, 
  DEFAULT_EMAIL_MESSAGE 
} from '../config/aws';

export interface SendButtonProps {
  phones: string[];
  emails: string[];
  activeType: ContactType;
}

const SendButton: React.FC<SendButtonProps> = ({ phones, emails, activeType }) => {
  const [smsMessage, setSmsMessage] = useState(DEFAULT_SMS_MESSAGE);
  const [emailSubject, setEmailSubject] = useState(DEFAULT_EMAIL_SUBJECT);
  const [emailMessage, setEmailMessage] = useState(DEFAULT_EMAIL_MESSAGE);
  const [fromEmail, setFromEmail] = useState(DEFAULT_FROM_EMAIL);
  const [progress, setProgress] = useState<SendProgress[]>([]);

  const messageSender = new MessageSender(AWS_CONFIG);

  // Send SMS
  const sendSMS = async () => {
    if (phones.length === 0) {
      alert('No valid phone numbers found');
      return;
    }

    // Initialize progress
    const initialProgress: SendProgress[] = phones.map(phone => ({
      type: 'sms',
      target: phone,
      status: 'pending'
    }));
    setProgress(initialProgress);

    // Send one by one
    for (let i = 0; i < phones.length; i++) {
      const phone = phones[i];
      
      // Update status to sending
      setProgress(prev => prev.map((item, index) => 
        index === i ? { ...item, status: 'sending' } : item
      ));

      try {
        await messageSender.sendSMS(phone, smsMessage);
        
        // Update status to success
        setProgress(prev => prev.map((item, index) => 
          index === i ? { ...item, status: 'success', message: 'Sent successfully' } : item
        ));
      } catch (error) {
        // Update status to error
        setProgress(prev => prev.map((item, index) => 
          index === i ? { 
            ...item, 
            status: 'error', 
            message: error instanceof Error ? error.message : 'Send failed' 
          } : item
        ));
      }

      // Send interval (avoid rate limiting)
      if (i < phones.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  // Send emails
  const sendEmails = async () => {
    if (emails.length === 0) {
      alert('No valid email addresses found');
      return;
    }

    if (!fromEmail) {
      alert('Please set sender email');
      return;
    }

    // Initialize progress
    const initialProgress: SendProgress[] = emails.map(email => ({
      type: 'email',
      target: email,
      status: 'pending'
    }));
    setProgress(initialProgress);

    // Send one by one
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      
      // Update status to sending
      setProgress(prev => prev.map((item, index) => 
        index === i ? { ...item, status: 'sending' } : item
      ));

      try {
        await messageSender.sendEmail(email, emailSubject, emailMessage, fromEmail);
        
        // Update status to success
        setProgress(prev => prev.map((item, index) => 
          index === i ? { ...item, status: 'success', message: 'Sent successfully' } : item
        ));
      } catch (error) {
        // Update status to error
        setProgress(prev => prev.map((item, index) => 
          index === i ? { 
            ...item, 
            status: 'error', 
            message: error instanceof Error ? error.message : 'Send failed' 
          } : item
        ));
      }

      // Send interval
      if (i < emails.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  const clearProgress = () => {
    setProgress([]);
  };

  const currentCount = activeType === 'phone' ? phones.length : emails.length;

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Send configuration and button - always visible */}
      <div style={{ 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: activeType === 'phone' ? '#e7f3ff' : '#fff3e7'
      }}>
        <h3>
          {activeType === 'phone' ? '📱 SMS Sending' : '📧 Email Sending'}
          <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
            ({currentCount} {activeType === 'phone' ? 'phones' : 'emails'})
          </span>
        </h3>

        {/* SMS configuration */}
        {activeType === 'phone' && (
          <div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>SMS Content:</label>
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                style={{ 
                  width: '100%', 
                  height: '80px', 
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter SMS content to send..."
              />
            </div>
            <button 
              onClick={sendSMS}
              style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              📱 Send SMS ({phones.length})
            </button>
          </div>
        )}

        {/* Email configuration */}
        {activeType === 'email' && (
          <div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Sender Email:</label>
              <input
                type="email"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="sender@example.com"
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Subject:</label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter email subject..."
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Content:</label>
              <textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                style={{ 
                  width: '100%', 
                  height: '120px', 
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                placeholder="Enter email content to send..."
              />
            </div>
            <button 
              onClick={sendEmails}
              style={{ 
                backgroundColor: '#28a745', 
                color: 'white', 
                border: 'none', 
                padding: '12px 24px', 
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              📧 Send Email ({emails.length})
            </button>
          </div>
        )}
      </div>

      {/* Send progress - always visible */}
      <div style={{ 
        marginTop: '20px',
        padding: '15px', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3>Send Progress</h3>
          {progress.length > 0 && (
            <button 
              onClick={clearProgress}
              style={{ 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                padding: '6px 12px', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Clear Records
            </button>
          )}
        </div>
        {progress.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666', 
            fontStyle: 'italic',
            padding: '20px'
          }}>
            No sending records yet. Click send button to start.
          </div>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {progress.map((item, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '10px', 
                  marginBottom: '8px',
                  backgroundColor: 
                    item.status === 'success' ? '#d4edda' :
                    item.status === 'error' ? '#f8d7da' :
                    item.status === 'sending' ? '#fff3cd' : '#f8f9fa',
                  border: '1px solid ' + (
                    item.status === 'success' ? '#c3e6cb' :
                    item.status === 'error' ? '#f5c6cb' :
                    item.status === 'sending' ? '#ffeaa7' : '#dee2e6'
                  ),
                  borderRadius: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold' }}>
                    {item.type === 'sms' ? '📱' : '📧'} {item.target}
                  </span>
                  <span style={{ 
                    fontSize: '12px',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    backgroundColor: 
                      item.status === 'success' ? '#155724' :
                      item.status === 'error' ? '#721c24' :
                      item.status === 'sending' ? '#856404' : '#6c757d',
                    color: 'white'
                  }}>
                    {item.status === 'pending' && 'Pending'}
                    {item.status === 'sending' && 'Sending...'}
                    {item.status === 'success' && '✓ Success'}
                    {item.status === 'error' && '✗ Failed'}
                  </span>
                </div>
                {item.message && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    {item.message}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendButton;
