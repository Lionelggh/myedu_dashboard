import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StudentModal = ({ student, isOpen, onClose, onSave, mode = 'view' }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState(student || {});
  const [isEditing, setIsEditing] = useState(mode === 'edit');

  if (!isOpen || !student) return null;

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'academic', label: 'Academic Records', icon: 'BookOpen' },
    { id: 'attendance', label: 'Attendance', icon: 'Calendar' },
    { id: 'parents', label: 'Parent Contacts', icon: 'Users' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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
      month: 'long',
      day: 'numeric'
    });
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <Image
            src={student.avatar}
            alt={student.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
              {isEditing ? (
                <Input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <p className="text-text-primary font-medium">{student.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Student ID</label>
              <p className="text-text-primary font-mono">{student.studentId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
          {isEditing ? (
            <Input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          ) : (
            <p className="text-text-primary">{student.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Phone</label>
          {isEditing ? (
            <Input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          ) : (
            <p className="text-text-primary">{student.phone || 'Not provided'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Date of Birth</label>
          {isEditing ? (
            <Input
              type="date"
              value={formData.dateOfBirth || ''}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            />
          ) : (
            <p className="text-text-primary">{student.dateOfBirth ? formatDate(student.dateOfBirth) : 'Not provided'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
          <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(student.status)}`}>
            {student.status}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Address</label>
        {isEditing ? (
          <textarea
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          />
        ) : (
          <p className="text-text-primary">{student.address || 'Not provided'}</p>
        )}
      </div>
    </div>
  );

  const renderAcademicRecords = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Class</label>
          <p className="text-text-primary font-medium">{student.class}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Grade</label>
          <p className="text-text-primary font-medium">{student.grade}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Enrollment Date</label>
          <p className="text-text-primary">{formatDate(student.enrollmentDate)}</p>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">Recent Grades</h4>
        <div className="bg-surface-secondary rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {student.grades?.map((grade, index) => (
              <div key={index} className="bg-surface rounded-lg p-3 border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-text-primary">{grade.subject}</span>
                  <span className={`text-lg font-bold ${
                    grade.score >= 90 ? 'text-success' :
                    grade.score >= 80 ? 'text-primary' :
                    grade.score >= 70 ? 'text-warning' : 'text-error'
                  }`}>
                    {grade.score}%
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-1">{grade.date}</p>
              </div>
            )) || (
              <p className="text-text-secondary col-span-full text-center py-4">No grades available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-success-50 rounded-lg p-4 border border-success-200">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={24} className="text-success" />
            <div>
              <p className="text-2xl font-bold text-success">92%</p>
              <p className="text-sm text-success-700">Attendance Rate</p>
            </div>
          </div>
        </div>
        <div className="bg-warning-50 rounded-lg p-4 border border-warning-200">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={24} className="text-warning" />
            <div>
              <p className="text-2xl font-bold text-warning">8</p>
              <p className="text-sm text-warning-700">Late Arrivals</p>
            </div>
          </div>
        </div>
        <div className="bg-error-50 rounded-lg p-4 border border-error-200">
          <div className="flex items-center space-x-3">
            <Icon name="XCircle" size={24} className="text-error" />
            <div>
              <p className="text-2xl font-bold text-error">12</p>
              <p className="text-sm text-error-700">Absent Days</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">Recent Attendance</h4>
        <div className="bg-surface-secondary rounded-lg p-4">
          <div className="space-y-2">
            {student.attendance?.map((record, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border-light last:border-b-0">
                <span className="text-sm text-text-primary">{record.date}</span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  record.status === 'present' ? 'bg-success-100 text-success-700' :
                  record.status === 'late'? 'bg-warning-100 text-warning-700' : 'bg-error-100 text-error-700'
                }`}>
                  {record.status}
                </span>
              </div>
            )) || (
              <p className="text-text-secondary text-center py-4">No attendance records available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderParentContacts = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-secondary rounded-lg p-4">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Primary Contact</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
              <p className="text-text-primary">{student.parentName || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
              <p className="text-text-primary">{student.parentContact}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <p className="text-text-primary">{student.parentEmail || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Relationship</label>
              <p className="text-text-primary">{student.parentRelation || 'Parent/Guardian'}</p>
            </div>
          </div>
        </div>

        <div className="bg-surface-secondary rounded-lg p-4">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Emergency Contact</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
              <p className="text-text-primary">{student.emergencyContactName || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
              <p className="text-text-primary">{student.emergencyContactPhone || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Relationship</label>
              <p className="text-text-primary">{student.emergencyContactRelation || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'academic':
        return renderAcademicRecords();
      case 'attendance':
        return renderAttendance();
      case 'parents':
        return renderParentContacts();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1100 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={student.avatar}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{student.name}</h2>
              <p className="text-sm text-text-secondary">Student ID: {student.studentId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <Button
                variant="outline"
                iconName="Edit"
                iconPosition="left"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              iconName="X"
              iconSize={20}
              className="p-2"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Modal Footer */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setFormData(student);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentModal;