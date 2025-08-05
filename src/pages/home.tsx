import React, { useState } from 'react';
import { ContactInput, SendButton, type ContactType } from '../components';

const Home: React.FC = () => {
  const [phones, setPhones] = useState<string[]>([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [activeType, setActiveType] = useState<ContactType>('phone');

  const handleContactsChange = (
    newPhones: string[], 
    newEmails: string[], 
    newActiveType: ContactType
  ) => {
    setPhones(newPhones);
    setEmails(newEmails);
    setActiveType(newActiveType);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '10px',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          📱📧 Bulk Message Sender
        </h1>
        <p style={{ 
          color: '#e74c3c', 
          fontSize: '18px',
          margin: 0,
          fontWeight: 'bold',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          letterSpacing: '1px'
        }}>
          💰 Contact 1 Million Customers Daily! Close Deals Instantly! Become a Millionaire NOW! 🚀
        </p>
      </div>

      {/* 输入框组件 */}
      <ContactInput onContactsChange={handleContactsChange} />

      {/* 发送按钮组件 */}
      <SendButton 
        phones={phones}
        emails={emails}
        activeType={activeType}
      />
    </div>
  );
};

export default Home;