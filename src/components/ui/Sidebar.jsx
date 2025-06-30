import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and analytics'
    },
    {
      id: 'students',
      label: 'Students',
      path: '/students-management',
      icon: 'Users',
      description: 'Student management'
    },
    {
      id: 'teachers',
      label: 'Teachers',
      path: '/teachers-management',
      icon: 'GraduationCap',
      description: 'Faculty management'
    },
    {
      id: 'events',
      label: 'Events',
      path: '/events',
      icon: 'Calendar',
      description: 'School activities'
    },
    {
      id: 'finance',
      label: 'Finance',
      path: '/finance',
      icon: 'DollarSign',
      description: 'Budget and payments'
    },
    {
      id: 'food',
      label: 'Food Service',
      path: '/food-service',
      icon: 'Utensils',
      description: 'Meal planning'
    },
    {
      id: 'user',
      label: 'User Management',
      path: '/user-management',
      icon: 'UserCog',
      description: 'System users'
    },
    {
      id: 'chat',
      label: 'Messages',
      path: '/messages',
      icon: 'MessageSquare',
      description: 'Communication'
    },
    {
      id: 'activity',
      label: 'Latest Activity',
      path: '/activity',
      icon: 'Activity',
      description: 'Recent updates'
    }
  ];

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-3 p-6 border-b border-border">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-primary">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M12 2L3 7V17C3 17.55 3.45 18 4 18H9V12H15V18H20C20.55 18 21 17.55 21 17V7L12 2Z"
            fill="currentColor"
          />
          <path
            d="M9 12V18H15V12H9Z"
            fill="currentColor"
            fillOpacity="0.7"
          />
        </svg>
      </div>
      {!isCollapsed && (
        <div className="transition-all duration-300">
          <h1 className="text-xl font-semibold text-text-primary">MyEdu</h1>
          <p className="text-sm text-text-secondary">Dashboard</p>
        </div>
      )}
    </div>
  );

  const NavigationItem = ({ item }) => {
    const isActive = isActiveRoute(item.path);
    
    return (
      <Link
        to={item.path}
        className={`group flex items-center space-x-3 px-6 py-3 transition-smooth relative ${
          isActive
            ? 'bg-primary-50 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
        }`}
        onClick={() => setIsMobileOpen(false)}
      >
        <Icon
          name={item.icon}
          size={20}
          className={`transition-smooth ${
            isActive ? 'text-primary' : 'text-text-secondary group-hover:text-text-primary'
          }`}
        />
        {!isCollapsed && (
          <div className="flex-1 transition-all duration-300">
            <span className="font-medium text-sm">{item.label}</span>
            {!isActive && (
              <p className="text-xs text-text-muted mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.description}
              </p>
            )}
          </div>
        )}
        {isActive && !isCollapsed && (
          <div className="w-2 h-2 bg-primary rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-900 lg:hidden"
          onClick={handleMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-surface border-r border-border z-900 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <Logo />

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavigationItem key={item.id} item={item} />
              ))}
            </div>
          </nav>

          {/* Collapse Toggle - Desktop Only */}
          <div className="hidden lg:block p-4 border-t border-border">
            <Button
              variant="ghost"
              iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
              iconSize={16}
              className={`w-full justify-center ${isCollapsed ? 'px-2' : 'justify-start px-4'}`}
              onClick={handleToggleCollapse}
            >
              {!isCollapsed && <span className="ml-2">Collapse</span>}
            </Button>
          </div>

          {/* User Section - Collapsed State */}
          {isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name="User" size={16} className="text-white" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        iconName="Menu"
        iconSize={20}
        className="fixed top-4 left-4 z-1100 lg:hidden p-2 bg-surface shadow-elevation-2 rounded-lg"
        onClick={handleMobileToggle}
      />
    </>
  );
};

export default Sidebar;