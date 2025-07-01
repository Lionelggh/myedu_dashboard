import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import TeachersManagement from "pages/teachers-management";
import StudentsManagement from "pages/students-management";
import AddNewStudent from "pages/add-new-student";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teachers-management" element={<TeachersManagement />} />
        <Route path="/students-management" element={<StudentsManagement />} />
        <Route path="/add-new-student" element={<AddNewStudent />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;