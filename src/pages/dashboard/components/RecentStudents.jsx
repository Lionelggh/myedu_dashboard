import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentStudents = () => {
  const recentStudents = [
    {
      id: 1,
      name: "Emma Johnson",
      class: "Grade 10-A",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "active",
      lastActivity: "2 hours ago",
      gpa: 3.8
    },
    {
      id: 2,
      name: "Michael Chen",
      class: "Grade 11-B",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "active",
      lastActivity: "1 hour ago",
      gpa: 3.9
    },
    {
      id: 3,
      name: "Sarah Williams",
      class: "Grade 9-C",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "inactive",
      lastActivity: "1 day ago",
      gpa: 3.6
    },
    {
      id: 4,
      name: "David Rodriguez",
      class: "Grade 12-A",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "active",
      lastActivity: "30 minutes ago",
      gpa: 3.7
    },
    {
      id: 5,
      name: "Lisa Thompson",
      class: "Grade 10-B",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      status: "active",
      lastActivity: "3 hours ago",
      gpa: 4.0
    }
  ];

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-warning';
  };

  const getGPAColor = (gpa) => {
    if (gpa >= 3.8) return 'text-success';
    if (gpa >= 3.5) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Recent Students</h3>
          <p className="text-text-secondary text-sm">Latest student activities</p>
        </div>
        <Button variant="text" className="text-primary">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {recentStudents.map((student) => (
          <div
            key={student.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-surface-secondary transition-smooth cursor-pointer"
          >
            <div className="relative">
              <Image
                src={student.avatar}
                alt={student.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface ${
                student.status === 'active' ? 'bg-success' : 'bg-warning'
              }`}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-text-primary truncate">{student.name}</h4>
                <span className={`text-sm font-medium ${getGPAColor(student.gpa)}`}>
                  GPA {student.gpa}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-text-secondary">{student.class}</p>
                <p className="text-xs text-text-muted">{student.lastActivity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Total Active Students</span>
          <span className="font-medium text-text-primary">932</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-text-secondary">New This Week</span>
          <span className="font-medium text-success">+12</span>
        </div>
      </div>
    </div>
  );
};

export default RecentStudents;