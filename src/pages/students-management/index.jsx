import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import FilterBar from './components/FilterBar';
import SummaryCards from './components/SummaryCards';
import StudentTable from './components/StudentTable';
import StudentCard from './components/StudentCard';
import StudentModal from './components/StudentModal';
import Pagination from './components/Pagination';
import Button from '../../components/ui/Button';

const StudentsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    class: '',
    grade: '',
    status: '',
    academicYear: ''
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      name: "Sarah Johnson",
      studentId: "STU001",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      class: "10A",
      grade: "10",
      status: "Active",
      enrollmentDate: "2023-09-01",
      parentName: "Michael Johnson",
      parentContact: "+1 (555) 987-6543",
      parentEmail: "michael.johnson@email.com",
      parentRelation: "Father",
      unpaidAmount: 0,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      address: "123 Oak Street, Springfield, IL 62701",
      dateOfBirth: "2008-03-15",
      grades: [
        { subject: "Mathematics", score: 92, date: "2024-01-15" },
        { subject: "English", score: 88, date: "2024-01-15" },
        { subject: "Science", score: 95, date: "2024-01-15" }
      ],
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-14", status: "present" },
        { date: "2024-01-13", status: "late" }
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      studentId: "STU002",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      class: "10B",
      grade: "10",
      status: "Active",
      enrollmentDate: "2023-09-01",
      parentName: "Lisa Chen",
      parentContact: "+1 (555) 876-5432",
      parentEmail: "lisa.chen@email.com",
      parentRelation: "Mother",
      unpaidAmount: 1250,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      address: "456 Pine Avenue, Springfield, IL 62702",
      dateOfBirth: "2008-07-22",
      grades: [
        { subject: "Mathematics", score: 85, date: "2024-01-15" },
        { subject: "English", score: 90, date: "2024-01-15" },
        { subject: "Science", score: 87, date: "2024-01-15" }
      ],
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-14", status: "absent" },
        { date: "2024-01-13", status: "present" }
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      studentId: "STU003",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      class: "11A",
      grade: "11",
      status: "Active",
      enrollmentDate: "2022-09-01",
      parentName: "Carlos Rodriguez",
      parentContact: "+1 (555) 765-4321",
      parentEmail: "carlos.rodriguez@email.com",
      parentRelation: "Father",
      unpaidAmount: 0,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      address: "789 Maple Drive, Springfield, IL 62703",
      dateOfBirth: "2007-11-08",
      grades: [
        { subject: "Mathematics", score: 94, date: "2024-01-15" },
        { subject: "English", score: 91, date: "2024-01-15" },
        { subject: "Science", score: 96, date: "2024-01-15" }
      ],
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-14", status: "present" },
        { date: "2024-01-13", status: "present" }
      ]
    },
    {
      id: 4,
      name: "David Thompson",
      studentId: "STU004",
      email: "david.thompson@email.com",
      phone: "+1 (555) 456-7890",
      class: "11B",
      grade: "11",
      status: "Pending",
      enrollmentDate: "2024-01-15",
      parentName: "Jennifer Thompson",
      parentContact: "+1 (555) 654-3210",
      parentEmail: "jennifer.thompson@email.com",
      parentRelation: "Mother",
      unpaidAmount: 2500,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      address: "321 Elm Street, Springfield, IL 62704",
      dateOfBirth: "2007-05-12",
      grades: [],
      attendance: []
    },
    {
      id: 5,
      name: "Jessica Wang",
      studentId: "STU005",
      email: "jessica.wang@email.com",
      phone: "+1 (555) 567-8901",
      class: "12A",
      grade: "12",
      status: "Active",
      enrollmentDate: "2021-09-01",
      parentName: "Robert Wang",
      parentContact: "+1 (555) 543-2109",
      parentEmail: "robert.wang@email.com",
      parentRelation: "Father",
      unpaidAmount: 0,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      address: "654 Cedar Lane, Springfield, IL 62705",
      dateOfBirth: "2006-09-30",
      grades: [
        { subject: "Mathematics", score: 89, date: "2024-01-15" },
        { subject: "English", score: 93, date: "2024-01-15" },
        { subject: "Science", score: 91, date: "2024-01-15" }
      ],
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-14", status: "present" },
        { date: "2024-01-13", status: "late" }
      ]
    },
    {
      id: 6,
      name: "Alex Martinez",
      studentId: "STU006",
      email: "alex.martinez@email.com",
      phone: "+1 (555) 678-9012",
      class: "12B",
      grade: "12",
      status: "Graduated",
      enrollmentDate: "2021-09-01",
      parentName: "Maria Martinez",
      parentContact: "+1 (555) 432-1098",
      parentEmail: "maria.martinez@email.com",
      parentRelation: "Mother",
      unpaidAmount: 0,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      address: "987 Birch Road, Springfield, IL 62706",
      dateOfBirth: "2006-01-18",
      grades: [
        { subject: "Mathematics", score: 87, date: "2024-01-15" },
        { subject: "English", score: 85, date: "2024-01-15" },
        { subject: "Science", score: 89, date: "2024-01-15" }
      ],
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-14", status: "present" },
        { date: "2024-01-13", status: "present" }
      ]
    }
  ];

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = mockStudents.filter(student => {
      const matchesSearch = searchQuery === '' || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesClass = filters.class === '' || student.class === filters.class;
      const matchesGrade = filters.grade === '' || student.grade === filters.grade;
      const matchesStatus = filters.status === '' || student.status.toLowerCase() === filters.status.toLowerCase();

      return matchesSearch && matchesClass && matchesGrade && matchesStatus;
    });

    // Sort students
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'enrollmentDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [mockStudents, searchQuery, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStudents.length / itemsPerPage);
  const paginatedStudents = filteredAndSortedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate statistics
  const stats = useMemo(() => {
    const totalStudents = mockStudents.length;
    const activeStudents = mockStudents.filter(s => s.status === 'Active').length;
    const pendingStudents = mockStudents.filter(s => s.status === 'Pending').length;
    const unpaidAmount = mockStudents.reduce((sum, s) => sum + s.unpaidAmount, 0);

    return {
      totalStudents,
      activeStudents,
      pendingStudents,
      unpaidAmount
    };
  }, [mockStudents]);

  // Event handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      class: '',
      grade: '',
      status: '',
      academicYear: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(paginatedStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAddStudent = () => {
    console.log('Add new student');
  };

  const handleStatusChange = (student) => {
    console.log('Change status for:', student.name);
  };

  const handleSaveStudent = (studentData) => {
    console.log('Save student:', studentData);
    setIsModalOpen(false);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk ${action} for students:`, selectedStudents);
  };

  // Handle window resize for responsive view
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Students Management</h1>
                <p className="text-text-secondary mt-2">
                  Manage student records, enrollment, and academic tracking
                </p>
              </div>
              
              {/* Bulk Actions */}
              {selectedStudents.length > 0 && (
                <div className="flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-lg p-3">
                  <span className="text-sm font-medium text-primary">
                    {selectedStudents.length} selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('export')}
                  >
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('email')}
                  >
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedStudents([])}
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </div>

          <SummaryCards stats={stats} />

          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onAddStudent={handleAddStudent}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Students List */}
          <div className="bg-surface rounded-lg border border-border overflow-hidden">
            {isMobileView ? (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  {paginatedStudents.map((student) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      onEdit={handleEditStudent}
                      onView={handleViewStudent}
                      onStatusChange={handleStatusChange}
                      isSelected={selectedStudents.includes(student.id)}
                      onSelect={handleSelectStudent}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <StudentTable
                students={paginatedStudents}
                onEdit={handleEditStudent}
                onView={handleViewStudent}
                onStatusChange={handleStatusChange}
                selectedStudents={selectedStudents}
                onSelectAll={handleSelectAll}
                onSelectStudent={handleSelectStudent}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredAndSortedStudents.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(newItemsPerPage) => {
                setItemsPerPage(newItemsPerPage);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </main>

      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStudent}
        mode={modalMode}
      />

      <QuickActions />
    </div>
  );
};

export default StudentsManagement;