import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeacherCard = ({ teacher, onEdit, onViewSchedule, onAssignClass }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'on leave':
        return 'bg-warning-100 text-warning-700';
      case 'inactive':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-text-muted text-text-secondary';
    }
  };

  const getEmploymentTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-primary-100 text-primary-700';
      case 'part-time':
        return 'bg-secondary-100 text-secondary-700';
      case 'contract':
        return 'bg-accent-100 text-accent-700';
      default:
        return 'bg-text-muted text-text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={teacher.photo}
            alt={teacher.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary truncate">
                {teacher.name}
              </h3>
              <p className="text-sm text-text-secondary">ID: {teacher.employeeId}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                {teacher.status}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmploymentTypeColor(teacher.employmentType)}`}>
                {teacher.employmentType}
              </span>
            </div>
          </div>
          
          <div className="mt-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="BookOpen" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">
                {teacher.subjects.join(', ')}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">
                Classes: {teacher.classes.join(', ')}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Building" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">
                {teacher.department}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">
                Joined: {new Date(teacher.hireDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconSize={14}
              onClick={() => onEdit(teacher)}
            >
              Edit
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Calendar"
              iconSize={14}
              onClick={() => onViewSchedule(teacher)}
            >
              Schedule
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="UserPlus"
              iconSize={14}
              onClick={() => onAssignClass(teacher)}
            >
              Assign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;