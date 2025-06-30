import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  onAddStudent,
  searchQuery,
  onSearchChange 
}) => {
  const classOptions = [
    { value: '', label: 'All Classes' },
    { value: '10A', label: 'Class 10A' },
    { value: '10B', label: 'Class 10B' },
    { value: '11A', label: 'Class 11A' },
    { value: '11B', label: 'Class 11B' },
    { value: '12A', label: 'Class 12A' },
    { value: '12B', label: 'Class 12B' }
  ];

  const gradeOptions = [
    { value: '', label: 'All Grades' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'graduated', label: 'Graduated' }
  ];

  const academicYearOptions = [
    { value: '', label: 'All Years' },
    { value: '2024-25', label: '2024-25' },
    { value: '2023-24', label: '2023-24' },
    { value: '2022-23', label: '2022-23' }
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchQuery !== '';

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-6">
      {/* Search and Add Button Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <Input
              type="search"
              placeholder="Search by name or student ID..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>
        <Button
          variant="primary"
          iconName="UserPlus"
          iconPosition="left"
          onClick={onAddStudent}
          className="lg:ml-4"
        >
          Add New Student
        </Button>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Class</label>
          <select
            value={filters.class}
            onChange={(e) => onFilterChange('class', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            {classOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Grade Level</label>
          <select
            value={filters.grade}
            onChange={(e) => onFilterChange('grade', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            {gradeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">Academic Year</label>
          <select
            value={filters.academicYear}
            onChange={(e) => onFilterChange('academicYear', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-smooth"
          >
            {academicYearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border-light">
          <Button
            variant="ghost"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
            className="text-text-secondary hover:text-text-primary"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;