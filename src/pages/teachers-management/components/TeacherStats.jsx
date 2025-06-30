import React from 'react';
import Icon from '../../../components/AppIcon';

const TeacherStats = ({ stats }) => {
  const statCards = [
    {
      id: 'total',
      title: 'Total Teachers',
      value: stats.total,
      icon: 'Users',
      color: 'primary',
      change: '+12',
      changeType: 'increase'
    },
    {
      id: 'active',
      title: 'Active Teachers',
      value: stats.active,
      icon: 'UserCheck',
      color: 'success',
      change: '+8',
      changeType: 'increase'
    },
    {
      id: 'onLeave',
      title: 'On Leave',
      value: stats.onLeave,
      icon: 'UserX',
      color: 'warning',
      change: '+3',
      changeType: 'increase'
    },
    {
      id: 'newHires',
      title: 'New Hires (30d)',
      value: stats.newHires,
      icon: 'UserPlus',
      color: 'accent',
      change: '+5',
      changeType: 'increase'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-50',
          icon: 'text-primary',
          text: 'text-primary'
        };
      case 'success':
        return {
          bg: 'bg-success-50',
          icon: 'text-success',
          text: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          icon: 'text-warning',
          text: 'text-warning'
        };
      case 'accent':
        return {
          bg: 'bg-accent-50',
          icon: 'text-accent',
          text: 'text-accent'
        };
      default:
        return {
          bg: 'bg-text-muted',
          icon: 'text-text-secondary',
          text: 'text-text-secondary'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((card) => {
        const colors = getColorClasses(card.color);
        return (
          <div
            key={card.id}
            className="bg-surface rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-text-secondary mb-1">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {card.value.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <Icon
                    name={card.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'}
                    size={14}
                    className={`mr-1 ${card.changeType === 'increase' ? 'text-success' : 'text-error'}`}
                  />
                  <span className={`text-sm font-medium ${card.changeType === 'increase' ? 'text-success' : 'text-error'}`}>
                    {card.change}
                  </span>
                  <span className="text-sm text-text-muted ml-1">this month</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <Icon
                  name={card.icon}
                  size={24}
                  className={colors.icon}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherStats;