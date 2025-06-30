import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbMap = {
    'dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    'students-management': { label: 'Students Management', icon: 'Users' },
    'teachers-management': { label: 'Teachers Management', icon: 'GraduationCap' },
    'events': { label: 'Events', icon: 'Calendar' },
    'finance': { label: 'Finance', icon: 'DollarSign' },
    'food-service': { label: 'Food Service', icon: 'Utensils' },
    'user-management': { label: 'User Management', icon: 'UserCog' },
    'messages': { label: 'Messages', icon: 'MessageSquare' },
    'activity': { label: 'Latest Activity', icon: 'Activity' },
    'profile': { label: 'Profile', icon: 'User' },
    'settings': { label: 'Settings', icon: 'Settings' },
    'reports': { label: 'Reports', icon: 'FileText' },
    'analytics': { label: 'Analytics', icon: 'BarChart3' },
    'add': { label: 'Add New', icon: 'Plus' },
    'edit': { label: 'Edit', icon: 'Edit' },
    'view': { label: 'View Details', icon: 'Eye' }
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = [
      {
        label: 'Home',
        path: '/dashboard',
        icon: 'Home',
        isHome: true
      }
    ];

    let currentPath = '';
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const breadcrumbInfo = breadcrumbMap[pathname] || { 
        label: pathname.charAt(0).toUpperCase() + pathname.slice(1).replace(/-/g, ' '), 
        icon: 'Folder' 
      };
      
      breadcrumbs.push({
        label: breadcrumbInfo.label,
        path: currentPath,
        icon: breadcrumbInfo.icon,
        isLast: index === pathnames.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && (
              <Icon
                name="ChevronRight"
                size={14}
                className="text-text-muted mx-2"
              />
            )}
            
            {breadcrumb.isLast ? (
              <div className="flex items-center space-x-2 text-text-primary font-medium">
                <Icon
                  name={breadcrumb.icon}
                  size={16}
                  className="text-primary"
                />
                <span>{breadcrumb.label}</span>
              </div>
            ) : (
              <Link
                to={breadcrumb.path}
                className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-smooth group"
              >
                <Icon
                  name={breadcrumb.icon}
                  size={16}
                  className="text-text-muted group-hover:text-primary transition-smooth"
                />
                <span className="hover:underline">{breadcrumb.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;