import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import api from '../../services/api';
import { Check, X, Clock, AlertCircle, Loader } from 'lucide-react';

export const MarkAttendance = () => {
  const [selectedClass, setSelectedClass] = useState('101');
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students');
      setStudents(response.data);
      
      // Initialize attendance
      const initialAttendance = {};
      response.data.forEach(s => {
        initialAttendance[s.id] = 'PRESENT';
      });
      setAttendance(initialAttendance);
    } catch (err) {
      setError('Failed to fetch student list.');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendance = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Logic to save attendance to backend would go here
    setTimeout(() => {
      setSubmitting(false);
      alert('Attendance submitted successfully!');
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="font-syne text-4xl font-bold text-[#3E2C23] mb-2">Mark Attendance</h1>
        <p className="text-[#6F4E37] font-mono text-sm mb-10 uppercase tracking-widest">Daily Academic Records</p>

        <div className="mb-8">
          <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-3 font-bold">
            Select Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full md:w-1/3 bg-[#F5EFE6] border border-[#D2B48C] px-4 py-3 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-all rounded-sm shadow-inner"
          >
            {['101', '102', '103'].map((c) => (
              <option key={c} value={c}>
                Class {c}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-sm flex items-center gap-3">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm border border-[#D2B48C]/40 rounded-sm overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#E6D8C3] border-b border-[#D2B48C]/40">
                <th className="px-6 py-4 text-left font-mono text-xs tracking-widest uppercase text-[#3E2C23]">Student Name</th>
                <th className="px-6 py-4 text-center font-mono text-xs tracking-widest uppercase text-[#3E2C23]">Present</th>
                <th className="px-6 py-4 text-center font-mono text-xs tracking-widest uppercase text-[#3E2C23]">Absent</th>
                <th className="px-6 py-4 text-center font-mono text-xs tracking-widest uppercase text-[#3E2C23]">Late</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Loader className="animate-spin h-8 w-8 text-[#A67B5B] mx-auto" />
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-20 text-center text-[#6F4E37] font-mono italic">No students registered in the system.</td>
                </tr>
              ) : students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-[#D2B48C]/20 hover:bg-[#F5EFE6] transition-all group"
                >
                  <td className="px-6 py-4 text-[#3E2C23] text-sm font-bold">{student.name}</td>
                  {['PRESENT', 'ABSENT', 'LATE'].map((status) => (
                    <td key={status} className="px-6 py-4 text-center">
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        value={status}
                        checked={attendance[student.id] === status}
                        onChange={(e) => handleAttendance(student.id, e.target.value)}
                        className="w-5 h-5 cursor-pointer accent-[#A67B5B]"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSubmit}
            disabled={submitting || students.length === 0}
            className="flex items-center gap-2 bg-[#3E2C23] text-white font-mono text-sm px-10 py-4 rounded-sm hover:bg-[#6F4E37] transition-all disabled:opacity-50 shadow-lg uppercase tracking-widest font-bold"
          >
            <Check size={18} />
            {submitting ? 'Processing...' : 'Submit Records'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
