import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCards = ({ stats }) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Students',
      value: stats.totalStudents,
      icon: 'Users',
      color: 'primary',
      change: '+12',
      changeType: 'increase'
    },
    {
      id: 'active',
      title: 'Active Students',
      value: stats.activeStudents,
      icon: 'UserCheck',
      color: 'success',
      change: '+8',
      changeType: 'increase'
    },
    {
      id: 'pending',
      title: 'Pending Enrollment',
      value: stats.pendingStudents,
      icon: 'UserClock',
      color: 'warning',
      change: '-2',
      changeType: 'decrease'
    },
    {
      id: 'unpaid',
      title: 'Unpaid Tuition',
      value: `$${stats.unpaidAmount.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'error',
      change: '+$1,200',
      changeType: 'increase'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-50',
          icon: 'text-primary',
          border: 'border-primary-200'
        };
      case 'success':
        return {
          bg: 'bg-success-50',
          icon: 'text-success',
          border: 'border-success-200'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          icon: 'text-warning',
          border: 'border-warning-200'
        };
      case 'error':
        return {
          bg: 'bg-error-50',
          icon: 'text-error',
          border: 'border-error-200'
        };
      default:
        return {
          bg: 'bg-surface-secondary',
          icon: 'text-text-secondary',
          border: 'border-border'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card) => {
        const colors = getColorClasses(card.color);
        return (
          <div
            key={card.id}
            className={`bg-surface rounded-lg border ${colors.border} p-6 hover:shadow-elevation-2 transition-smooth`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                <Icon name={card.icon} size={24} className={colors.icon} />
              </div>
              <div className="text-right">
                <div className={`flex items-center text-sm ${
                  card.changeType === 'increase' ? 'text-success' : 'text-error'
                }`}>
                  <Icon
                    name={card.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'}
                    size={14}
                    className="mr-1"
                  />
                  {card.change}
                </div>
                <p className="text-xs text-text-muted">vs last month</p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-1">{card.value}</h3>
              <p className="text-sm text-text-secondary">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;