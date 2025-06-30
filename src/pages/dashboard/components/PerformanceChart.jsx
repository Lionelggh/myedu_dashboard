import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceChart = () => {
  const performanceData = [
    { month: 'Jan', performance: 85, students: 920, teachers: 745 },
    { month: 'Feb', performance: 88, students: 925, teachers: 748 },
    { month: 'Mar', performance: 92, students: 932, teachers: 754 },
    { month: 'Apr', performance: 87, students: 928, teachers: 752 },
    { month: 'May', performance: 90, students: 935, teachers: 756 },
    { month: 'Jun', performance: 94, students: 940, teachers: 760 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 rounded-lg shadow-elevation-3 border border-border">
          <p className="font-medium text-text-primary mb-2">{`${label} 2024`}</p>
          <div className="space-y-1">
            <p className="text-sm text-primary">
              Performance: <span className="font-medium">{payload[0].value}%</span>
            </p>
            <p className="text-sm text-text-secondary">
              Students: <span className="font-medium">{payload[0].payload.students}</span>
            </p>
            <p className="text-sm text-text-secondary">
              Teachers: <span className="font-medium">{payload[0].payload.teachers}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">School Performance</h3>
          <p className="text-text-secondary text-sm">Monthly performance trends</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">Performance</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              domain={[80, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="performance" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;