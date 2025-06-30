import React, { useState, useMemo } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import TeacherCard from './components/TeacherCard';
import TeacherTable from './components/TeacherTable';
import TeacherFilters from './components/TeacherFilters';
import TeacherStats from './components/TeacherStats';
import DepartmentBreakdown from './components/DepartmentBreakdown';
import UpcomingEvaluations from './components/UpcomingEvaluations';
import Pagination from './components/Pagination';

const TeachersManagement = () => {
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    search: '',
    department: 'All Departments',
    subject: 'All Subjects',
    employmentType: 'All Types',
    status: 'All Status',
    hireDateFrom: '',
    hireDateTo: ''
  });

  // Mock data for teachers
  const mockTeachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@myedu.com",
      employeeId: "TCH001",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      department: "Mathematics",
      subjects: ["Algebra", "Calculus", "Statistics"],
      classes: ["Grade 10A", "Grade 11B", "Grade 12A"],
      employmentType: "Full-time",
      status: "Active",
      hireDate: "2019-08-15",
      phone: "+1 (555) 123-4567",
      qualifications: ["PhD Mathematics", "M.Ed Teaching"]
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@myedu.com",
      employeeId: "TCH002",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      department: "Science",
      subjects: ["Physics", "Chemistry"],
      classes: ["Grade 11A", "Grade 12B"],
      employmentType: "Full-time",
      status: "Active",
      hireDate: "2018-01-20",
      phone: "+1 (555) 234-5678",
      qualifications: ["PhD Physics", "M.Sc Chemistry"]
    },
    {
      id: 3,
      name: "Ms. Emily Rodriguez",
      email: "emily.rodriguez@myedu.com",
      employeeId: "TCH003",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      department: "English",
      subjects: ["English Literature", "Creative Writing"],
      classes: ["Grade 9A", "Grade 10B"],
      employmentType: "Full-time",
      status: "Active",
      hireDate: "2020-09-01",
      phone: "+1 (555) 345-6789",
      qualifications: ["MA English Literature", "B.Ed"]
    },
    {
      id: 4,
      name: "Mr. David Thompson",
      email: "david.thompson@myedu.com",
      employeeId: "TCH004",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      department: "History",
      subjects: ["World History", "Geography"],
      classes: ["Grade 8A", "Grade 9B"],
      employmentType: "Part-time",
      status: "Active",
      hireDate: "2021-02-15",
      phone: "+1 (555) 456-7890",
      qualifications: ["MA History", "B.A Geography"]
    },
    {
      id: 5,
      name: "Ms. Lisa Park",
      email: "lisa.park@myedu.com",
      employeeId: "TCH005",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      department: "Arts",
      subjects: ["Visual Arts", "Music"],
      classes: ["Grade 7A", "Grade 8B"],
      employmentType: "Full-time",
      status: "On Leave",
      hireDate: "2019-11-10",
      phone: "+1 (555) 567-8901",
      qualifications: ["MFA Visual Arts", "B.Mus"]
    },
    {
      id: 6,
      name: "Mr. James Wilson",
      email: "james.wilson@myedu.com",
      employeeId: "TCH006",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      department: "Physical Education",
      subjects: ["Physical Education", "Health"],
      classes: ["Grade 6A", "Grade 7B"],
      employmentType: "Full-time",
      status: "Active",
      hireDate: "2017-06-01",
      phone: "+1 (555) 678-9012",
      qualifications: ["B.P.E", "Sports Medicine Cert"]
    },
    {
      id: 7,
      name: "Dr. Maria Garcia",
      email: "maria.garcia@myedu.com",
      employeeId: "TCH007",
      photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      department: "Languages",
      subjects: ["Spanish", "French"],
      classes: ["Grade 9A", "Grade 10A"],
      employmentType: "Full-time",
      status: "Active",
      hireDate: "2018-08-20",
      phone: "+1 (555) 789-0123",
      qualifications: ["PhD Linguistics", "MA Spanish Literature"]
    },
    {
      id: 8,
      name: "Mr. Robert Kim",
      email: "robert.kim@myedu.com",
      employeeId: "TCH008",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      department: "Computer Science",
      subjects: ["Programming", "Web Development"],
      classes: ["Grade 11A", "Grade 12A"],
      employmentType: "Contract",
      status: "Active",
      hireDate: "2022-01-10",
      phone: "+1 (555) 890-1234",
      qualifications: ["MS Computer Science", "Industry Certifications"]
    }
  ];

  // Mock statistics
  const teacherStats = {
    total: 754,
    active: 698,
    onLeave: 32,
    newHires: 24
  };

  // Mock department breakdown
  const departmentBreakdown = [
    { name: "Mathematics", count: 125, color: "bg-primary" },
    { name: "Science", count: 98, color: "bg-secondary" },
    { name: "English", count: 87, color: "bg-accent" },
    { name: "History", count: 76, color: "bg-success" },
    { name: "Arts", count: 65, color: "bg-warning" },
    { name: "Physical Education", count: 54, color: "bg-error" },
    { name: "Languages", count: 43, color: "bg-primary-300" },
    { name: "Computer Science", count: 32, color: "bg-secondary-300" }
  ];

  // Mock upcoming evaluations
  const upcomingEvaluations = [
    {
      id: 1,
      teacher: {
        name: "Dr. Sarah Johnson",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        department: "Mathematics"
      },
      type: "Annual Review",
      date: "2024-01-15",
      time: "10:00 AM",
      location: "Conference Room A",
      daysUntil: 2
    },
    {
      id: 2,
      teacher: {
        name: "Prof. Michael Chen",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        department: "Science"
      },
      type: "Performance Review",
      date: "2024-01-18",
      time: "2:00 PM",
      location: "Principal\'s Office",
      daysUntil: 5
    },
    {
      id: 3,
      teacher: {
        name: "Ms. Emily Rodriguez",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        department: "English"
      },
      type: "Probation Review",
      date: "2024-01-20",
      time: "11:30 AM",
      location: "HR Office",
      daysUntil: 7
    }
  ];

  // Filter and sort teachers
  const filteredAndSortedTeachers = useMemo(() => {
    let filtered = mockTeachers.filter(teacher => {
      const matchesSearch = !filters.search || 
        teacher.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        teacher.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        teacher.employeeId.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesDepartment = filters.department === 'All Departments' || 
        teacher.department === filters.department;
      
      const matchesSubject = filters.subject === 'All Subjects' || 
        teacher.subjects.includes(filters.subject);
      
      const matchesEmploymentType = filters.employmentType === 'All Types' || 
        teacher.employmentType === filters.employmentType;
      
      const matchesStatus = filters.status === 'All Status' || 
        teacher.status === filters.status;
      
      const matchesHireDateFrom = !filters.hireDateFrom || 
        new Date(teacher.hireDate) >= new Date(filters.hireDateFrom);
      
      const matchesHireDateTo = !filters.hireDateTo || 
        new Date(teacher.hireDate) <= new Date(filters.hireDateTo);

      return matchesSearch && matchesDepartment && matchesSubject && 
             matchesEmploymentType && matchesStatus && 
             matchesHireDateFrom && matchesHireDateTo;
    });

    // Sort teachers
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredAndSortedTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      department: 'All Departments',
      subject: 'All Subjects',
      employmentType: 'All Types',
      status: 'All Status',
      hireDateFrom: '',
      hireDateTo: ''
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleEditTeacher = (teacher) => {
    console.log('Edit teacher:', teacher);
  };

  const handleViewSchedule = (teacher) => {
    console.log('View schedule for:', teacher);
  };

  const handleAssignClass = (teacher) => {
    console.log('Assign class to:', teacher);
  };

  const handleAddTeacher = () => {
    console.log('Add new teacher');
  };

  const handleExportData = () => {
    console.log('Export teacher data');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Teachers Management
              </h1>
              <p className="text-text-secondary">
                Manage faculty information, assignments, and performance tracking
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                iconSize={16}
                onClick={handleExportData}
              >
                Export
              </Button>
              
              <Button
                variant="primary"
                iconName="UserPlus"
                iconSize={16}
                onClick={handleAddTeacher}
              >
                Add New Teacher
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <TeacherStats stats={teacherStats} />

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6">
              {/* Filters */}
              <TeacherFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />

              {/* View Controls */}
              <div className="flex items-center justify-between bg-surface rounded-lg border border-border p-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-text-secondary">
                    {filteredAndSortedTeachers.length} teacher{filteredAndSortedTeachers.length !== 1 ? 's' : ''} found
                  </span>
                  
                  {Object.values(filters).some(value => 
                    value && value !== 'All Departments' && value !== 'All Subjects' && 
                    value !== 'All Types' && value !== 'All Status' && value !== ''
                  ) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      iconSize={14}
                      onClick={handleClearFilters}
                      className="text-text-secondary"
                    >
                      Clear filters
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'table' ? 'primary' : 'ghost'}
                    size="sm"
                    iconName="Table"
                    iconSize={16}
                    onClick={() => setViewMode('table')}
                  />
                  <Button
                    variant={viewMode === 'cards' ? 'primary' : 'ghost'}
                    size="sm"
                    iconName="Grid3X3"
                    iconSize={16}
                    onClick={() => setViewMode('cards')}
                  />
                </div>
              </div>

              {/* Teachers List */}
              {viewMode === 'table' ? (
                <TeacherTable
                  teachers={paginatedTeachers}
                  onEdit={handleEditTeacher}
                  onViewSchedule={handleViewSchedule}
                  onAssignClass={handleAssignClass}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedTeachers.map((teacher) => (
                    <TeacherCard
                      key={teacher.id}
                      teacher={teacher}
                      onEdit={handleEditTeacher}
                      onViewSchedule={handleViewSchedule}
                      onAssignClass={handleAssignClass}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredAndSortedTeachers.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
              )}

              {/* Empty State */}
              {filteredAndSortedTeachers.length === 0 && (
                <div className="bg-surface rounded-lg border border-border p-12 text-center">
                  <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    No teachers found
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Try adjusting your search criteria or filters to find teachers.
                  </p>
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconSize={16}
                    onClick={handleClearFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <DepartmentBreakdown departments={departmentBreakdown} />
              <UpcomingEvaluations evaluations={upcomingEvaluations} />
            </div>
          </div>
        </div>
      </main>

      <QuickActions />
    </div>
  );
};

export default TeachersManagement;