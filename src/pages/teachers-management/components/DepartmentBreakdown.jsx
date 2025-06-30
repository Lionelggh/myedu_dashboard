import React from 'react';
import Icon from '../../../components/AppIcon';

const DepartmentBreakdown = ({ departments }) => {
  const totalTeachers = departments.reduce((sum, dept) => sum + dept.count, 0);

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Building" size={20} className="text-primary" />
          <span>Department Breakdown</span>
        </h3>
        <span className="text-sm text-text-secondary">
          {totalTeachers} Total Teachers
        </span>
      </div>

      <div className="space-y-4">
        {departments.map((department) => {
          const percentage = ((department.count / totalTeachers) * 100).toFixed(1);
          
          return (
            <div key={department.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${department.color}`} />
                  <span className="font-medium text-text-primary">
                    {department.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-text-primary">
                    {department.count}
                  </span>
                  <span className="text-sm text-text-secondary ml-2">
                    ({percentage}%)
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${department.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">
              {departments.length}
            </p>
            <p className="text-sm text-text-secondary">Departments</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-accent">
              {Math.round(totalTeachers / departments.length)}
            </p>
            <p className="text-sm text-text-secondary">Avg per Dept</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentBreakdown;