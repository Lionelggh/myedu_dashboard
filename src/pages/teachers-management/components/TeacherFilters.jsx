import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TeacherFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const departments = [
    'All Departments',
    'Mathematics',
    'Science',
    'English',
    'History',
    'Physical Education',
    'Arts',
    'Computer Science',
    'Languages'
  ];

  const subjects = [
    'All Subjects',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English Literature',
    'History',
    'Geography',
    'Physical Education',
    'Art',
    'Music',
    'Computer Science',
    'Spanish',
    'French'
  ];

  const employmentTypes = [
    'All Types',
    'Full-time',
    'Part-time',
    'Contract'
  ];

  const statuses = [
    'All Status',
    'Active',
    'On Leave',
    'Inactive'
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== 'All Departments' && value !== 'All Subjects' && 
    value !== 'All Types' && value !== 'All Status' && value !== ''
  );

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <span>Filter Teachers</span>
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={14}
            onClick={onClearFilters}
            className="text-text-secondary hover:text-text-primary"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Search Teachers
          </label>
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted"
            />
            <Input
              type="search"
              placeholder="Name, ID, or email..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Department
          </label>
          <select
            value={filters.department || 'All Departments'}
            onChange={(e) => handleFilterChange('department', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Subject
          </label>
          <select
            value={filters.subject || 'All Subjects'}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Employment Type
          </label>
          <select
            value={filters.employmentType || 'All Types'}
            onChange={(e) => handleFilterChange('employmentType', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            {employmentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Status
          </label>
          <select
            value={filters.status || 'All Status'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Date Range Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Hire Date From
          </label>
          <Input
            type="date"
            value={filters.hireDateFrom || ''}
            onChange={(e) => handleFilterChange('hireDateFrom', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Hire Date To
          </label>
          <Input
            type="date"
            value={filters.hireDateTo || ''}
            onChange={(e) => handleFilterChange('hireDateTo', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherFilters;