import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const FinanceChart = () => {
  const financeData = [
    { month: 'Jan', income: 45000, expenses: 32000 },
    { month: 'Feb', income: 52000, expenses: 38000 },
    { month: 'Mar', income: 48000, expenses: 35000 },
    { month: 'Apr', income: 61000, expenses: 42000 },
    { month: 'May', income: 55000, expenses: 39000 },
    { month: 'Jun', income: 58000, expenses: 41000 }
  ];

  const totalIncome = financeData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = financeData.reduce((sum, item) => sum + item.expenses, 0);
  const incomePercentage = Math.round((totalIncome / (totalIncome + totalExpenses)) * 100);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-3 rounded-lg shadow-elevation-3 border border-border">
          <p className="font-medium text-text-primary mb-2">{`${label} 2024`}</p>
          <div className="space-y-1">
            <p className="text-sm text-success">
              Income: <span className="font-medium">${payload[0]?.value?.toLocaleString()}</span>
            </p>
            <p className="text-sm text-error">
              Expenses: <span className="font-medium">${payload[1]?.value?.toLocaleString()}</span>
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
          <h3 className="text-lg font-semibold text-text-primary">School Finance</h3>
          <p className="text-text-secondary text-sm">Income vs Expenses</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-2xl font-bold text-success">{incomePercentage}%</span>
          </div>
          <p className="text-xs text-text-secondary">Income Ratio</p>
        </div>
      </div>

      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={financeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="income" 
              fill="var(--color-success)" 
              radius={[2, 2, 0, 0]}
              name="Income"
            />
            <Bar 
              dataKey="expenses" 
              fill="var(--color-error)" 
              radius={[2, 2, 0, 0]}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Finance Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-success-50 rounded-lg border border-success-200">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Icon name="ArrowUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Total Income</span>
          </div>
          <p className="text-lg font-bold text-success">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="text-center p-3 bg-error-50 rounded-lg border border-error-200">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Icon name="ArrowDown" size={16} className="text-error" />
            <span className="text-sm font-medium text-error">Total Expenses</span>
          </div>
          <p className="text-lg font-bold text-error">${totalExpenses.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FinanceChart;