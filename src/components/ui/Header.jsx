import React, { useState } from 'react';
import Icon from '../AppIcon';
import Input from './Input';
import Button from './Button';

const Header = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchQuery('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const notifications = [
    {
      id: 1,
      title: 'New Student Enrollment',
      message: 'Sarah Johnson has been enrolled in Grade 10',
      time: '5 minutes ago',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'Teacher Assignment Update',
      message: 'Math teacher schedule has been updated',
      time: '1 hour ago',
      type: 'warning',
      unread: true
    },
    {
      id: 3,
      title: 'System Maintenance',
      message: 'Scheduled maintenance completed successfully',
      time: '2 hours ago',
      type: 'success',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <Button
            variant="ghost"
            iconName="Menu"
            iconSize={20}
            className="p-2"
            onClick={() => console.log('Toggle mobile menu')}
          />
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className={`flex items-center transition-all duration-300 ${
              isSearchExpanded ? 'w-full' : 'w-full md:w-96'
            }`}>
              <div className="relative flex-1">
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                />
                <Input
                  type="search"
                  placeholder="Search students, teachers, or records..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 w-full bg-surface-secondary border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-lg transition-smooth"
                />
              </div>
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  iconName="X"
                  iconSize={16}
                  className="ml-2 p-2"
                  onClick={() => setSearchQuery('')}
                />
              )}
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              iconName="Bell"
              iconSize={20}
              className="p-2 relative"
              onClick={handleNotificationToggle}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-error text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {unreadCount}
              </span>
            )}

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-surface rounded-lg shadow-elevation-3 border border-border z-1100">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-text-primary">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button
                        variant="text"
                        className="text-xs text-primary"
                        onClick={() => console.log('Mark all as read')}
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border-light hover:bg-surface-secondary transition-smooth cursor-pointer ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => console.log('View notification:', notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'info' ? 'bg-primary' :
                          notification.type === 'warning' ? 'bg-warning' :
                          notification.type === 'success' ? 'bg-success' : 'bg-text-secondary'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-text-primary truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-text-secondary mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-muted mt-2">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border">
                  <Button
                    variant="text"
                    className="w-full text-center text-primary"
                    onClick={() => console.log('View all notifications')}
                  >
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <Button
              variant="ghost"
              className="p-1 flex items-center space-x-2"
              onClick={handleProfileToggle}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-text-primary">Admin User</p>
                <p className="text-xs text-text-secondary">Administrator</p>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-lg shadow-elevation-3 border border-border z-1100">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Admin User</p>
                      <p className="text-sm text-text-secondary">admin@myedu.com</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary transition-smooth flex items-center space-x-3"
                    onClick={() => console.log('View profile')}
                  >
                    <Icon name="User" size={16} />
                    <span>My Profile</span>
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary transition-smooth flex items-center space-x-3"
                    onClick={() => console.log('Settings')}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-surface-secondary transition-smooth flex items-center space-x-3"
                    onClick={() => console.log('Help')}
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error-50 transition-smooth flex items-center space-x-3"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;