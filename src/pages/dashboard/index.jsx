import React from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import StatsCard from './components/StatsCard';
import PerformanceChart from './components/PerformanceChart';
import SchoolCalendar from './components/SchoolCalendar';
import FinanceChart from './components/FinanceChart';
import RecentStudents from './components/RecentStudents';
import MessagesSection from './components/MessagesSection';
import UnpaidTuitionTable from './components/UnpaidTuitionTable';
import FoodMenuSection from './components/FoodMenuSection';

const Dashboard = () => {
  const statsData = [
    {
      title: "Students",
      value: 932,
      icon: "Users",
      trend: "up",
      trendValue: 8.2,
      color: "primary"
    },
    {
      title: "Teachers",
      value: 754,
      icon: "GraduationCap",
      trend: "up",
      trendValue: 3.1,
      color: "secondary"
    },
    {
      title: "Events",
      value: 40,
      icon: "Calendar",
      trend: "up",
      trendValue: 12.5,
      color: "success"
    },
    {
      title: "Foods",
      value: 32000,
      icon: "Utensils",
      trend: "up",
      trendValue: 5.7,
      color: "warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Welcome back, Admin! 👋
                </h1>
                <p className="text-text-secondary">
                  Here's what's happening at your school today.
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Today</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                trendValue={stat.trendValue}
                color={stat.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-1">
              <PerformanceChart />
            </div>
            <div className="lg:col-span-1">
              <SchoolCalendar />
            </div>
            <div className="lg:col-span-1">
              <FinanceChart />
            </div>
          </div>

          {/* Students and Messages Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RecentStudents />
            <MessagesSection />
          </div>

          {/* Unpaid Tuition Table */}
          <div className="mb-8">
            <UnpaidTuitionTable />
          </div>

          {/* Food Menu Section */}
          <div className="mb-8">
            <FoodMenuSection />
          </div>
        </div>
      </main>

      <QuickActions />
    </div>
  );
};

export default Dashboard;