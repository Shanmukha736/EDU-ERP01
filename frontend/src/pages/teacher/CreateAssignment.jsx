import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Plus, Calendar, BookOpen, User, Trash2, Eye } from 'lucide-react';

export const CreateAssignment = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    fileUrl: '',
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/assignments/teacher/${user.id}`);
      setAssignments(response.data);
    } catch (err) {
      setError('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.title || !formData.description || !formData.dueDate) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...formData,
        teacherId: user.id,
        dueDate: new Date(formData.dueDate).toISOString(),
      };
      await api.post('/assignments', payload);
      fetchAssignments();
      setModalOpen(false);
      setFormData({ title: '', description: '', dueDate: '', fileUrl: '' });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-syne text-4xl font-bold text-[#3E2C23] mb-2">Assignment Management</h1>
            <p className="text-[#6F4E37] font-mono text-sm tracking-tight">Create and manage academic tasks for your students.</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[#A67B5B] text-white px-6 py-3 rounded-sm font-mono text-sm tracking-widest uppercase hover:bg-[#6F4E37] transition-all shadow-md group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            New Assignment
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && assignments.length === 0 ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-white/50 animate-pulse border border-[#D2B48C]/40"></div>
            ))
          ) : assignments.length === 0 ? (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-[#D2B48C]/40 rounded-sm">
              <BookOpen size={48} className="mx-auto text-[#D2B48C] mb-4" />
              <p className="font-mono text-[#6F4E37]">No assignments found. Start by creating one.</p>
            </div>
          ) : (
            assignments.map((asg) => (
              <div key={asg.id} className="bg-white/80 backdrop-blur-sm border border-[#D2B48C]/40 p-6 rounded-sm shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-syne text-xl font-bold text-[#3E2C23] line-clamp-1">{asg.title}</h3>
                  <div className="flex gap-2">
                    <button className="text-[#A67B5B] hover:text-[#6F4E37] transition-colors">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
                
                <p className="text-[#6F4E37] text-sm mb-6 line-clamp-3 h-15">{asg.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A67B5B]">
                    <Calendar size={14} />
                    <span>Due: {new Date(asg.dueDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A67B5B]">
                    <User size={14} />
                    <span>Created: {new Date(asg.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[#D2B48C]/20">
                  <span className="bg-[#E6D8C3] text-[#A67B5B] px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase">
                    ACTIVE
                  </span>
                  <button 
                    onClick={() => window.location.href = `/teacher/submissions?assignmentId=${asg.id}`}
                    className="text-[#3E2C23] font-mono text-xs font-bold hover:underline"
                  >
                    View Submissions →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Assignment"
        footerActions={
          <div className="flex gap-3">
            <button
              onClick={() => setModalOpen(false)}
              className="px-6 py-2 border border-[#D2B48C] text-[#3E2C23] font-mono text-sm hover:bg-[#E6D8C3] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={loading}
              className="px-6 py-2 bg-[#A67B5B] text-white font-mono text-sm hover:bg-[#6F4E37] transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Publish Assignment'}
            </button>
          </div>
        }
      >
        <div className="space-y-5 py-4">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2 font-bold">
              Assignment Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#F5EFE6] border border-[#D2B48C] px-4 py-3 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-all rounded-sm shadow-inner"
              placeholder="e.g., Advanced Calculus Project Phase 1"
              required
            />
          </div>

          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2 font-bold">
              Due Date & Time *
            </label>
            <input
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full bg-[#F5EFE6] border border-[#D2B48C] px-4 py-3 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-all rounded-sm shadow-inner"
              required
            />
          </div>

          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2 font-bold">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#F5EFE6] border border-[#D2B48C] px-4 py-3 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-all rounded-sm shadow-inner"
              rows="4"
              placeholder="Provide detailed instructions for the students..."
              required
            />
          </div>

          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2 font-bold">
              Attachment URL (Optional)
            </label>
            <input
              type="text"
              value={formData.fileUrl}
              onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
              className="w-full bg-[#F5EFE6] border border-[#D2B48C] px-4 py-3 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-all rounded-sm shadow-inner"
              placeholder="Link to supporting materials..."
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
