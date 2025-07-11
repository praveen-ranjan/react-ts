// import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-semibold">Student Portal</div>
          <div className="space-x-4">
            <Link to="/students" className="hover:bg-blue-500 px-3 py-2 rounded">Students List</Link>
            <Link to="/students/add" className="hover:bg-blue-500 px-3 py-2 rounded">Add Student</Link>
            <Link to="/about" className="hover:bg-blue-500 px-3 py-2 rounded">About Us</Link>
            <Link to="/products" className="hover:bg-blue-500 px-3 py-2 rounded">Products</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
