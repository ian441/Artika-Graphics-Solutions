import React, { useState, useEffect } from 'react';
import { getUserMessages, markMessageAsRead, deleteMessage, getUnreadMessageCount } from '../services/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await getUserMessages();
      if (response.success) {
        setMessages(response.data);
      } else {
        setError('Failed to fetch messages');
      }
    } catch {
      setError('Failed to fetch messages');
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadMessageCount();
      if (response.success) {
        setUnreadCount(response.data.count);
      }
    } catch {
      // ignore errors for unread count
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchUnreadCount();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const response = await markMessageAsRead(id);
      if (response.success) {
        fetchMessages();
        fetchUnreadCount();
      } else {
        setError('Failed to mark message as read');
      }
    } catch {
      setError('Failed to mark message as read');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMessage(id);
      if (response.success) {
        fetchMessages();
        fetchUnreadCount();
      } else {
        setError('Failed to delete message');
      }
    } catch {
      setError('Failed to delete message');
    }
  };

  return (
    <div>
      <h2>Messages (Unread: {unreadCount})</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.subject}</strong>: {message.content}
            {!message.is_read && <button onClick={() => handleMarkAsRead(message.id)}>Mark as Read</button>}
            <button onClick={() => handleDelete(message.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
