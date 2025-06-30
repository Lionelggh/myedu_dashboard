import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-50',
          icon: 'text-primary',
          border: 'border-primary-200'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary-50',
          icon: 'text-secondary',
          border: 'border-secondary-200'
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
      default:
        return {
          bg: 'bg-primary-50',
          icon: 'text-primary',
          border: 'border-primary-200'
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-2 border border-border hover:shadow-elevation-3 transition-smooth">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-text-secondary text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-semibold text-text-primary mb-2">{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center space-x-1">
              <Icon
                name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'}
                size={16}
                className={trend === 'up' ? 'text-success' : 'text-error'}
              />
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-error'}`}>
                {trendValue}%
              </span>
              <span className="text-text-muted text-sm">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} ${colorClasses.border} border flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses.icon} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;