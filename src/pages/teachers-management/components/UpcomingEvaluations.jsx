import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingEvaluations = ({ evaluations }) => {
  const getUrgencyColor = (daysUntil) => {
    if (daysUntil <= 3) return 'text-error';
    if (daysUntil <= 7) return 'text-warning';
    return 'text-text-secondary';
  };

  const getUrgencyBg = (daysUntil) => {
    if (daysUntil <= 3) return 'bg-error-50 border-error-200';
    if (daysUntil <= 7) return 'bg-warning-50 border-warning-200';
    return 'bg-surface border-border';
  };

  const formatDaysUntil = (daysUntil) => {
    if (daysUntil === 0) return 'Today';
    if (daysUntil === 1) return 'Tomorrow';
    return `${daysUntil} days`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="ClipboardCheck" size={20} className="text-primary" />
          <span>Upcoming Evaluations</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Calendar"
          iconSize={14}
          onClick={() => console.log('View all evaluations')}
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {evaluations.map((evaluation) => (
          <div
            key={evaluation.id}
            className={`p-4 rounded-lg border transition-smooth ${getUrgencyBg(evaluation.daysUntil)}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={evaluation.teacher.photo}
                  alt={evaluation.teacher.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-text-primary">
                    {evaluation.teacher.name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {evaluation.teacher.department} • {evaluation.type}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-semibold ${getUrgencyColor(evaluation.daysUntil)}`}>
                  {formatDaysUntil(evaluation.daysUntil)}
                </p>
                <p className="text-sm text-text-secondary">
                  {new Date(evaluation.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{evaluation.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{evaluation.location}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Calendar"
                  iconSize={14}
                  onClick={() => console.log('Reschedule evaluation', evaluation.id)}
                >
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  iconSize={14}
                  onClick={() => console.log('View evaluation details', evaluation.id)}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {evaluations.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <p className="text-text-secondary">No upcoming evaluations</p>
          <p className="text-sm text-text-muted">All evaluations are up to date</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvaluations;