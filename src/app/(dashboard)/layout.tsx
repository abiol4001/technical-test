// DashboardLayout 
// Wraps all dashboard pages and provides common layout

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
// Common UI components
import { Toaster } from '@/components/ui/toaster';

import React from 'react';

// Prop types for component
type Props = {
  children: React.ReactNode; // Page content
};

const DashboardLayout = async ({ children }: Props) => {

  // Outer div for full height 
  return (
    <div className="h-[100vh] relative overflow-hidden">

      {/* Navigation bar */}
      <Navbar />

      {/* Layout with sidebar and content */}
      <div className="flex flex-row">

        {/* Sidebar, hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Page content */}
        <main className='w-full'>
          {children}
        </main>

        {/* Global Toast component */}
        <Toaster />
      </div>

    </div>
  );
};

export default DashboardLayout;