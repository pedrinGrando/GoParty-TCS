import React from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  profileImage: string;
}

export const NotificationComponent: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
   
  );
};