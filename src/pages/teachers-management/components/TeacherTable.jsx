import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeacherTable = ({ teachers, onEdit, onViewSchedule, onAssignClass, onSort, sortConfig }) => {
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedTeachers(teachers.map(teacher => teacher.id));
    } else {
      setSelectedTeachers([]);
    }
  };

  const handleSelectTeacher = (teacherId) => {
    setSelectedTeachers(prev => 
      prev.includes(teacherId)
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return sortConfig.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

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
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      {/* Bulk Actions */}
      {selectedTeachers.length > 0 && (
        <div className="bg-primary-50 border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-primary font-medium">
              {selectedTeachers.length} teacher{selectedTeachers.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Calendar">
                Bulk Schedule
              </Button>
              <Button variant="outline" size="sm" iconName="Mail">
                Send Message
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Export
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-secondary border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedTeachers.length === teachers.length}
                  onChange={handleSelectAll}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                Teacher
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-smooth"
                onClick={() => onSort('employeeId')}
              >
                <div className="flex items-center space-x-1">
                  <span>Employee ID</span>
                  {getSortIcon('employeeId')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-smooth"
                onClick={() => onSort('department')}
              >
                <div className="flex items-center space-x-1">
                  <span>Department</span>
                  {getSortIcon('department')}
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                Subjects
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">
                Classes
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-smooth"
                onClick={() => onSort('employmentType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                  {getSortIcon('employmentType')}
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-smooth"
                onClick={() => onSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </th>
              <th className="px-6 py-4 text-right text-sm font-medium text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-surface-secondary transition-smooth">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedTeachers.includes(teacher.id)}
                    onChange={() => handleSelectTeacher(teacher.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={teacher.photo}
                      alt={teacher.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-text-primary">{teacher.name}</div>
                      <div className="text-sm text-text-secondary">{teacher.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-primary font-mono">
                  {teacher.employeeId}
                </td>
                <td className="px-6 py-4 text-sm text-text-primary">
                  {teacher.department}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.slice(0, 2).map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                    {teacher.subjects.length > 2 && (
                      <span className="px-2 py-1 bg-text-muted text-text-secondary text-xs rounded-full">
                        +{teacher.subjects.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {teacher.classes.join(', ')}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEmploymentTypeColor(teacher.employmentType)}`}>
                    {teacher.employmentType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                    {teacher.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={14}
                      onClick={() => onViewSchedule(teacher)}
                      title="View Schedule"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      iconSize={14}
                      onClick={() => onEdit(teacher)}
                      title="Edit Teacher"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="UserPlus"
                      iconSize={14}
                      onClick={() => onAssignClass(teacher)}
                      title="Assign Class"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherTable;