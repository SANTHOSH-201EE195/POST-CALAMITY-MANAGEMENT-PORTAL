
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

// FIX: Add types for props to resolve TypeScript errors.
const DashboardLayout = ({ pageTitle, children }: { pageTitle: string, children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* FIX: Removed incorrect setIsOpen prop that is not accepted by Sidebar component. */}
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pageTitle={pageTitle} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
