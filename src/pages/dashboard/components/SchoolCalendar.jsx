import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const SchoolCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2021, 2, 1)); // March 2021
  const [selectedDate, setSelectedDate] = useState(new Date(2021, 2, 15));

  const events = [
    { date: 5, title: 'Parent Meeting', type: 'meeting' },
    { date: 12, title: 'Science Fair', type: 'event' },
    { date: 18, title: 'Sports Day', type: 'sports' },
    { date: 25, title: 'Exam Week', type: 'exam' }
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const hasEvent = (day) => {
    return events.some(event => event.date === day);
  };

  const getEventForDay = (day) => {
    return events.find(event => event.date === day);
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting': return 'bg-primary';
      case 'event': return 'bg-success';
      case 'sports': return 'bg-warning';
      case 'exam': return 'bg-error';
      default: return 'bg-primary';
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const event = getEventForDay(day);
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
          className={`h-8 w-8 rounded-lg text-sm font-medium transition-smooth relative ${
            isSelected(day)
              ? 'bg-primary text-white'
              : isToday(day)
              ? 'bg-primary-100 text-primary' :'text-text-primary hover:bg-surface-secondary'
          }`}
          title={event ? event.title : ''}
        >
          {day}
          {hasEvent(day) && (
            <div className={`absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${getEventColor(event.type)}`}></div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-elevation-2 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">School Calendar</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="ChevronLeft"
            iconSize={16}
            className="p-1"
            onClick={() => navigateMonth(-1)}
          />
          <span className="text-sm font-medium text-text-primary min-w-[120px] text-center">
            {getMonthName(currentDate)}
          </span>
          <Button
            variant="ghost"
            iconName="ChevronRight"
            iconSize={16}
            className="p-1"
            onClick={() => navigateMonth(1)}
          />
        </div>
      </div>

      {/* Calendar Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-text-secondary">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {renderCalendarDays()}
      </div>

      {/* Upcoming Events */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Upcoming Events</h4>
        <div className="space-y-2">
          {events.slice(0, 3).map((event, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{event.title}</p>
                <p className="text-xs text-text-secondary">March {event.date}, 2021</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolCalendar;