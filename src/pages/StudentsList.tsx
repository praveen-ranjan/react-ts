import React, { useEffect, useState } from 'react';

// const students = [
//   { id: 1, name: 'Aarav Sharma', city: 'Delhi' },
//   { id: 2, name: 'Mira Kapoor', city: 'Mumbai' },
//   { id: 3, name: 'Rahul Verma', city: 'Bengaluru' },
// ];
interface Student {
    id: string,
    name: string,
    city: string
}

export default function StudentsList() {
//   const handleEdit = (id: number) => {
//     alert(`Edit student with ID: ${id}`);
//   };



  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(`Are you sure you want to delete student with ID ${id}?`);
  if (!confirmDelete) return;

  setDeletingId(id); // Set the currently deleting ID
  try {
    const response = await fetch(`https://685989cd138a18086dfec72b.mockapi.io/api/v1/students/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete student with ID ${id}`);
    }
    // Update UI after successful delete
    setStudents(prev => prev.filter(student => student.id !== id));
  } catch (error) {
    alert('Error deleting student. Please try again.');
    console.error(error);
  } finally {
    setDeletingId(null); // Reset deleting state
  }
};


  useEffect(()=>{

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://685989cd138a18086dfec72b.mockapi.io/api/v1/students");

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setStudents(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
            console.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    fetchStudents()

  },[])


  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-blue-500">Loading students...</span>
      </div>
    );
  }
  // Show error
  if (error) {
    return (
      <div className="text-center text-red-600 font-medium mt-10">
        Error: {error}
      </div>
    );
  }


  

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Students List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border">ID</th>
              <th className="px-4 py-2 text-left border">Name</th>
              <th className="px-4 py-2 text-left border">City</th>
              <th className="px-4 py-2 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{student.id}</td>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.city}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    // disabled={deletingId === student.id}
                    disabled={deletingId !== null} /// disable all delete btn
                    className={`px-3 py-1 text-sm text-white rounded transition
                    ${deletingId === student.id ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    {deletingId === student.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center px-4 py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
