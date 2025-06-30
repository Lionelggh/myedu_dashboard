import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentCard = ({ student, onEdit, onView, onStatusChange, isSelected, onSelect }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'inactive':
        return 'bg-error-100 text-error-700';
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'graduated':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-text-100 text-text-700';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-4 hover:shadow-elevation-2 transition-smooth">
      {/* Mobile Card Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(student.id, e.target.checked)}
              className="absolute top-0 left-0 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            />
            <div className="w-12 h-12 rounded-full overflow-hidden ml-6">
              <Image
                src={student.avatar}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{student.name}</h3>
            <p className="text-sm text-text-secondary">ID: {student.studentId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            iconName="Eye"
            iconSize={16}
            className="p-2"
            onClick={() => onView(student)}
            title="View Details"
          />
          <Button
            variant="ghost"
            iconName="Edit"
            iconSize={16}
            className="p-2"
            onClick={() => onEdit(student)}
            title="Edit Student"
          />
        </div>
      </div>

      {/* Student Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Class:</span>
          <span className="text-sm font-medium text-text-primary">{student.class}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Grade:</span>
          <span className="text-sm font-medium text-text-primary">{student.grade}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Status:</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(student.status)}`}>
            {student.status}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Enrolled:</span>
          <span className="text-sm font-medium text-text-primary">{formatDate(student.enrollmentDate)}</span>
        </div>
        {student.unpaidAmount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-error">Unpaid:</span>
            <span className="text-sm font-medium text-error">${student.unpaidAmount.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Parent Contact */}
      <div className="mt-3 pt-3 border-t border-border-light">
        <div className="flex items-center space-x-2">
          <Icon name="Phone" size={14} className="text-text-muted" />
          <span className="text-sm text-text-secondary">{student.parentContact}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;