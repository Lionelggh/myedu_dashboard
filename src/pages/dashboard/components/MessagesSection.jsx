import React, { useState } from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const MessagesSection = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messages = [
    {
      id: 1,
      sender: "Dr. Patricia Martinez",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      message: "The quarterly assessment results are ready for review. Please check the detailed report.",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      unread: true,
      role: "Principal"
    },
    {
      id: 2,
      sender: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      message: "Parent-teacher conference schedule has been updated. New slots available next week.",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unread: true,
      role: "Teacher"
    },
    {
      id: 3,
      sender: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      message: "Student Emma Johnson's performance has improved significantly this semester.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unread: false,
      role: "Teacher"
    },
    {
      id: 4,
      sender: "Robert Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      message: "Budget allocation for new laboratory equipment needs approval.",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unread: false,
      role: "Finance Officer"
    },
    {
      id: 5,
      sender: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      message: "Monthly food service report is ready. Overall satisfaction rate is 94%.",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      unread: false,
      role: "Food Service Manager"
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Principal': return 'text-primary';
      case 'Teacher': return 'text-success';
      case 'Finance Officer': return 'text-warning';
      case 'Food Service Manager': return 'text-secondary';
      default: return 'text-text-secondary';
    }
  };

  const unreadCount = messages.filter(msg => msg.unread).length;

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-text-primary">Messages</h3>
          {unreadCount > 0 && (
            <span className="bg-error text-white text-xs px-2 py-1 rounded-full font-medium">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="Search"
            iconSize={16}
            className="p-2"
            onClick={() => console.log('Search messages')}
          />
          <Button variant="text" className="text-primary">
            View All
          </Button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-smooth ${
              message.unread 
                ? 'bg-primary-50 border border-primary-200 hover:bg-primary-100' :'hover:bg-surface-secondary'
            } ${selectedMessage === message.id ? 'ring-2 ring-primary ring-opacity-50' : ''}`}
            onClick={() => setSelectedMessage(message.id)}
          >
            <div className="relative flex-shrink-0">
              <Image
                src={message.avatar}
                alt={message.sender}
                className="w-10 h-10 rounded-full object-cover"
              />
              {message.unread && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-surface"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-medium truncate ${message.unread ? 'text-text-primary' : 'text-text-primary'}`}>
                    {message.sender}
                  </h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleColor(message.role)} bg-opacity-10`}>
                    {message.role}
                  </span>
                </div>
                <span className="text-xs text-text-muted flex-shrink-0">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <p className={`text-sm line-clamp-2 ${message.unread ? 'text-text-primary' : 'text-text-secondary'}`}>
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            iconName="MessageSquarePlus"
            iconSize={16}
            className="flex-1 mr-2"
            onClick={() => console.log('Compose new message')}
          >
            Compose
          </Button>
          <Button
            variant="ghost"
            iconName="MoreHorizontal"
            iconSize={16}
            className="p-2"
            onClick={() => console.log('More options')}
          />
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;