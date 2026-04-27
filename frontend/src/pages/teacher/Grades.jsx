import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import api from '../../services/api';
import { Loader, Save, Search, User, BarChart3 } from 'lucide-react';

export const TeacherGrades = () => {
  const [selectedClass, setSelectedClass] = useState('101');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/students');
      setStudents(response.data);
    } catch (err) {
      console.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleGradeChange = (studentId, value) => {
    setGrades((prev) => ({ ...prev, [studentId]: value }));
  };

  const getPercentageColor = (grade) => {
    if (!grade) return '';
    const num = parseInt(grade);
    if (num >= 80) return 'text-[#A67B5B]';
    if (num >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-[#3E2C23] mb-6">Grades</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            >
              {['101', '102', '103'].map((c) => (
                <option key={c} value={c}>
                  Class {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            >
              {['Data Structures', 'Web Development', 'Database Design'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-[#D2B48C]/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
                {['Student Name', 'Assignment 1', 'Assignment 2', 'Assignment 3', 'Final Grade'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-[#3E2C23]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <Loader className="animate-spin h-8 w-8 text-[#A67B5B] mx-auto" />
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center text-[#6F4E37] font-mono">No students registered.</td>
                </tr>
              ) : students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-[#D2B48C]/40 hover:bg-[#E6D8C3] hover:border-l-4 hover:border-l-[#A67B5B] transition-all"
                >
                  <td className="px-4 py-3 text-[#3E2C23] text-sm font-bold">{student.name}</td>
                  {[1, 2, 3].map((num) => (
                    <td key={num} className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        onChange={(e) =>
                          handleGradeChange(`${student.id}-${num}`, e.target.value)
                        }
                        className="w-20 bg-[#F5EFE6] border border-[#D2B48C] px-2 py-1 text-[#3E2C23] text-sm focus:border-[#A67B5B] focus:outline-none transition-colors"
                        placeholder="0-100"
                      />
                    </td>
                  ))}
                  <td className={`px-4 py-3 font-mono text-sm font-bold ${getPercentageColor(grades[student.id])}`}>
                    {grades[student.id] || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <button className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-white text-[#3E2C23] font-mono text-sm px-6 py-2 hover:bg-accent hover:text-black hover:border-[#A67B5B] transition-all">
            Save Grades
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
