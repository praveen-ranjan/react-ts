// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './UI/Navbar';
import StudentsList from './pages/StudentsList';
import AddStudent from './pages/AddStudent';
import AboutUs from './pages/AboutUs';

export default function App() {
  return (
    <div>
      <Navbar />
       <div className="p-4">
        <Routes>
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}
