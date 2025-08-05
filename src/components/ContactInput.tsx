import React, { useState } from 'react';
import { MessageSender } from '../services/MessageSender';

export type ContactType = 'phone' | 'email';

export interface ContactInputProps {
  onContactsChange: (phones: string[], emails: string[], activeType: ContactType) => void;
}

const ContactInput: React.FC<ContactInputProps> = ({ onContactsChange }) => {
  const [inputText, setInputText] = useState('');
  const [activeType, setActiveType] = useState<ContactType>('phone');

  // 解析输入的手机号和邮箱
  const parseContacts = (text: string): { phones: string[]; emails: string[] } => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    const phones: string[] = [];
    const emails: string[] = [];

    lines.forEach(line => {
      // 分割可能包含多个联系方式的行
      const items = line.split(/[,，\s]+/).filter(item => item.trim());
      
      items.forEach(item => {
        const trimmedItem = item.trim();
        if (MessageSender.isValidPhoneNumber(trimmedItem)) {
          phones.push(trimmedItem);
        } else if (MessageSender.isValidEmail(trimmedItem)) {
          emails.push(trimmedItem);
        }
      });
    });

    return { phones, emails };
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    const { phones, emails } = parseContacts(text);
    onContactsChange(phones, emails, activeType);
  };

  const handleTypeChange = (type: ContactType) => {
    setActiveType(type);
    const { phones, emails } = parseContacts(inputText);
    onContactsChange(phones, emails, type);
  };

  const { phones, emails } = parseContacts(inputText);

  return (
    <div style={{ 
      marginBottom: '20px', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>Contact Input</h3>
      
      {/* Toggle buttons */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleTypeChange('phone')}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: activeType === 'phone' ? '#28a745' : '#6c757d',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📱 Phone Mode
          </button>
          <button
            onClick={() => handleTypeChange('email')}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: activeType === 'email' ? '#28a745' : '#6c757d',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📧 Email Mode
          </button>
        </div>
      </div>

      {/* Input box */}
      <textarea
        value={inputText}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={
          activeType === 'phone' 
            ? "Enter phone numbers, one per line or separated by commas\nExample:\n138xxxxxxxx (China)\n523306866 (UAE)\n+971523306866 (UAE with country code)\n+86139xxxxxxxx (China with country code)"
            : "Enter email addresses, one per line or separated by commas\nExample:\nuser1@example.com\nuser2@example.com\nuser1@example.com, user2@example.com"
        }
        style={{ 
          width: '100%', 
          height: '120px', 
          padding: '12px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          fontSize: '14px',
          fontFamily: 'monospace',
          resize: 'vertical'
        }}
      />
      
      {/* Statistics */}
      <div style={{ 
        marginTop: '10px', 
        padding: '10px', 
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
          <strong>Recognition Result:</strong>
        </div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
          <span style={{ 
            color: activeType === 'phone' ? '#007bff' : '#666',
            fontWeight: activeType === 'phone' ? 'bold' : 'normal'
          }}>
            📱 Phones: {phones.length}
          </span>
          <span style={{ 
            color: activeType === 'email' ? '#007bff' : '#666',
            fontWeight: activeType === 'email' ? 'bold' : 'normal'
          }}>
            📧 Emails: {emails.length}
          </span>
        </div>
        
        {/* Show specific list for active type */}
        {activeType === 'phone' && phones.length > 0 && (
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            <strong>Phone List:</strong> {phones.join(', ')}
          </div>
        )}
        {activeType === 'email' && emails.length > 0 && (
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            <strong>Email List:</strong> {emails.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInput;
