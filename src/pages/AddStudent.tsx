import React, { useState } from 'react';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !city.trim()) {
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('https://685989cd138a18086dfec72b.mockapi.io/api/v1/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: Date.now(), name, city })
      });

      if (!response.ok) {
        throw new Error(`Failed to add student: ${response.status}`);
      }

      setName('');
      setCity('');
      setMessage('Student added successfully!');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>
      
      {message && (
        <div className="mb-4 text-sm text-center text-blue-600">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">City</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
}
