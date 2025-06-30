import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentTable = ({ 
  students, 
  onEdit, 
  onView, 
  onStatusChange, 
  selectedStudents, 
  onSelectAll, 
  onSelectStudent,
  sortConfig,
  onSort 
}) => {
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

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return 'ArrowUpDown';
    }
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = students.length > 0 && selectedStudents.length === students.length;
  const isIndeterminate = selectedStudents.length > 0 && selectedStudents.length < students.length;

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-secondary border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Student</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => onSort('studentId')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Student ID</span>
                  <Icon name={getSortIcon('studentId')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => onSort('class')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Class</span>
                  <Icon name={getSortIcon('class')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => onSort('grade')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Grade</span>
                  <Icon name={getSortIcon('grade')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">
                <button
                  onClick={() => onSort('enrollmentDate')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Enrollment Date</span>
                  <Icon name={getSortIcon('enrollmentDate')} size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Parent Contact</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Unpaid Amount</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-primary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.map((student) => (
              <tr 
                key={student.id} 
                className="hover:bg-surface-secondary transition-smooth cursor-pointer"
                onClick={() => onView(student)}
              >
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => onSelectStudent(student.id, e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={student.avatar}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{student.name}</p>
                      <p className="text-sm text-text-secondary">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-text-primary">{student.studentId}</td>
                <td className="px-6 py-4 text-sm text-text-primary">{student.class}</td>
                <td className="px-6 py-4 text-sm text-text-primary">{student.grade}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-text-primary">{formatDate(student.enrollmentDate)}</td>
                <td className="px-6 py-4 text-sm text-text-primary">{student.parentContact}</td>
                <td className="px-6 py-4 text-sm">
                  {student.unpaidAmount > 0 ? (
                    <span className="text-error font-medium">${student.unpaidAmount.toLocaleString()}</span>
                  ) : (
                    <span className="text-success">Paid</span>
                  )}
                </td>
                <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center space-x-2">
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
                    <Button
                      variant="ghost"
                      iconName="MoreVertical"
                      iconSize={16}
                      className="p-2"
                      onClick={() => onStatusChange(student)}
                      title="More Options"
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

export default StudentTable;