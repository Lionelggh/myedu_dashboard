import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActions = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const getContextualActions = () => {
    const path = location.pathname;
    
    if (path.includes('students')) {
      return [
        {
          id: 'add-student',
          label: 'Add Student',
          icon: 'UserPlus',
          color: 'primary',
          action: () => console.log('Add new student')
        },
        {
          id: 'import-students',
          label: 'Import Students',
          icon: 'Upload',
          color: 'secondary',
          action: () => console.log('Import students')
        },
        {
          id: 'export-students',
          label: 'Export Data',
          icon: 'Download',
          color: 'accent',
          action: () => console.log('Export student data')
        }
      ];
    }
    
    if (path.includes('teachers')) {
      return [
        {
          id: 'add-teacher',
          label: 'Add Teacher',
          icon: 'UserPlus',
          color: 'primary',
          action: () => console.log('Add new teacher')
        },
        {
          id: 'schedule-meeting',
          label: 'Schedule Meeting',
          icon: 'Calendar',
          color: 'secondary',
          action: () => console.log('Schedule teacher meeting')
        },
        {
          id: 'assign-class',
          label: 'Assign Class',
          icon: 'BookOpen',
          color: 'accent',
          action: () => console.log('Assign class to teacher')
        }
      ];
    }
    
    if (path.includes('dashboard')) {
      return [
        {
          id: 'quick-report',
          label: 'Generate Report',
          icon: 'FileText',
          color: 'primary',
          action: () => console.log('Generate quick report')
        },
        {
          id: 'send-announcement',
          label: 'Send Announcement',
          icon: 'Megaphone',
          color: 'secondary',
          action: () => console.log('Send announcement')
        },
        {
          id: 'backup-data',
          label: 'Backup Data',
          icon: 'Shield',
          color: 'accent',
          action: () => console.log('Backup system data')
        }
      ];
    }

    // Default actions for other pages
    return [
      {
        id: 'create-new',
        label: 'Create New',
        icon: 'Plus',
        color: 'primary',
        action: () => console.log('Create new item')
      },
      {
        id: 'quick-search',
        label: 'Quick Search',
        icon: 'Search',
        color: 'secondary',
        action: () => console.log('Open quick search')
      },
      {
        id: 'help-support',
        label: 'Help & Support',
        icon: 'HelpCircle',
        color: 'accent',
        action: () => console.log('Open help')
      }
    ];
  };

  const actions = getContextualActions();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary hover:bg-primary-600 text-white shadow-primary';
      case 'secondary':
        return 'bg-secondary hover:bg-secondary-600 text-white shadow-elevation-2';
      case 'accent':
        return 'bg-accent hover:bg-accent-600 text-white shadow-elevation-2';
      default:
        return 'bg-primary hover:bg-primary-600 text-white shadow-primary';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-1000">
      {/* Quick Actions Menu */}
      <div className={`transition-all duration-300 ease-in-out ${
        isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="flex flex-col space-y-3 mb-4">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className={`transition-all duration-300 ease-out ${
                isExpanded 
                  ? 'opacity-100 translate-x-0' :'opacity-0 translate-x-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-3">
                <span className="bg-surface text-text-primary px-3 py-2 rounded-lg shadow-elevation-2 text-sm font-medium whitespace-nowrap">
                  {action.label}
                </span>
                <button
                  onClick={action.action}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-smooth ${getColorClasses(action.color)}`}
                  title={action.label}
                >
                  <Icon name={action.icon} size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={handleToggle}
        className={`w-14 h-14 rounded-full bg-primary hover:bg-primary-600 text-white shadow-primary flex items-center justify-center transition-all duration-300 ${
          isExpanded ? 'rotate-45' : 'rotate-0'
        }`}
        title={isExpanded ? 'Close quick actions' : 'Open quick actions'}
      >
        <Icon name="Plus" size={24} />
      </button>

      {/* Mobile Bottom Sheet Overlay */}
      {isExpanded && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-900" onClick={handleToggle} />
      )}

      {/* Mobile Bottom Sheet */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl shadow-elevation-3 z-1100 transition-transform duration-300 ${
        isExpanded ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="p-6">
          <div className="w-12 h-1 bg-border rounded-full mx-auto mb-6" />
          <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  action.action();
                  setIsExpanded(false);
                }}
                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-surface-secondary transition-smooth text-left"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorClasses(action.color)}`}>
                  <Icon name={action.icon} size={18} />
                </div>
                <span className="font-medium text-text-primary">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;