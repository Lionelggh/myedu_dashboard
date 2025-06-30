import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UnpaidTuitionTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('amount');
  const [sortDirection, setSortDirection] = useState('desc');
  const itemsPerPage = 5;

  const unpaidStudents = [
    {
      id: "STU001",
      name: "Alexander Thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      class: "Grade 12-A",
      amount: 2850,
      dueDate: "2024-01-15",
      daysOverdue: 45,
      parentContact: "+1 (555) 123-4567"
    },
    {
      id: "STU002",
      name: "Isabella Rodriguez",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      class: "Grade 10-B",
      amount: 3200,
      dueDate: "2024-01-20",
      daysOverdue: 40,
      parentContact: "+1 (555) 234-5678"
    },
    {
      id: "STU003",
      name: "Ethan Williams",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      class: "Grade 11-C",
      amount: 2750,
      dueDate: "2024-01-25",
      daysOverdue: 35,
      parentContact: "+1 (555) 345-6789"
    },
    {
      id: "STU004",
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      class: "Grade 9-A",
      amount: 3100,
      dueDate: "2024-02-01",
      daysOverdue: 28,
      parentContact: "+1 (555) 456-7890"
    },
    {
      id: "STU005",
      name: "Mason Davis",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      class: "Grade 12-B",
      amount: 2950,
      dueDate: "2024-02-05",
      daysOverdue: 24,
      parentContact: "+1 (555) 567-8901"
    },
    {
      id: "STU006",
      name: "Olivia Johnson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      class: "Grade 10-A",
      amount: 3350,
      dueDate: "2024-02-10",
      daysOverdue: 19,
      parentContact: "+1 (555) 678-9012"
    },
    {
      id: "STU007",
      name: "Lucas Martinez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      class: "Grade 11-A",
      amount: 2650,
      dueDate: "2024-02-15",
      daysOverdue: 14,
      parentContact: "+1 (555) 789-0123"
    }
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...unpaidStudents].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const totalUnpaidAmount = unpaidStudents.reduce((sum, student) => sum + student.amount, 0);

  const getOverdueColor = (days) => {
    if (days > 30) return 'text-error';
    if (days > 15) return 'text-warning';
    return 'text-text-secondary';
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Unpaid Student Tuition</h3>
          <p className="text-text-secondary text-sm">
            Total Outstanding: <span className="font-medium text-error">${totalUnpaidAmount.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Download"
            iconSize={16}
            onClick={() => console.log('Export unpaid tuition report')}
          >
            Export
          </Button>
          <Button
            variant="primary"
            iconName="Mail"
            iconSize={16}
            onClick={() => console.log('Send payment reminders')}
          >
            Send Reminders
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                >
                  <span>Student</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('class')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                >
                  <span>Class</span>
                  <SortIcon field="class" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                >
                  <span>Amount</span>
                  <SortIcon field="amount" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">
                <button
                  onClick={() => handleSort('daysOverdue')}
                  className="flex items-center space-x-1 hover:text-text-primary transition-smooth"
                >
                  <span>Days Overdue</span>
                  <SortIcon field="daysOverdue" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((student) => (
              <tr key={student.id} className="border-b border-border-light hover:bg-surface-secondary transition-smooth">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-text-primary">{student.name}</p>
                      <p className="text-sm text-text-secondary">{student.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-text-primary font-medium">{student.class}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="font-semibold text-error">${student.amount.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`font-medium ${getOverdueColor(student.daysOverdue)}`}>
                    {student.daysOverdue} days
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      iconName="Phone"
                      iconSize={14}
                      className="p-1"
                      onClick={() => console.log('Call parent:', student.parentContact)}
                      title="Call Parent"
                    />
                    <Button
                      variant="ghost"
                      iconName="Mail"
                      iconSize={14}
                      className="p-1"
                      onClick={() => console.log('Email reminder:', student.id)}
                      title="Send Email"
                    />
                    <Button
                      variant="ghost"
                      iconName="Eye"
                      iconSize={14}
                      className="p-1"
                      onClick={() => console.log('View details:', student.id)}
                      title="View Details"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-text-secondary">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} students
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="ChevronLeft"
            iconSize={16}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "primary" : "ghost"}
                className="w-8 h-8 p-0"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            iconName="ChevronRight"
            iconSize={16}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnpaidTuitionTable;