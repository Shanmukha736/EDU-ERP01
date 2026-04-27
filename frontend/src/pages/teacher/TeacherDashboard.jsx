import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { scheduleData, getTodaySchedule } from '../../mock/schedule';
import api from '../../services/api';
import { Users, Calendar, BookOpen, Zap, Loader2, AlertCircle } from 'lucide-react';

export const TeacherDashboard = () => {
  const [stats, setStats] = useState({
    todayClasses: 0,
    pendingSubmissions: 0,
    studentsTaught: 0,
    announcementsPosted: 0,
  });
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
    setTodaySchedule(getTodaySchedule() || []);
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const [studentsRes, assignmentsRes] = await Promise.all([
        api.get('/api/students'),
        api.get('/api/assignments')
      ]);
      
      setStats({
        todayClasses: getTodaySchedule()?.length || 0,
        pendingSubmissions: 0, 
        studentsTaught: studentsRes.data?.length || 0,
        announcementsPosted: assignmentsRes.data?.length || 0,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError('Unable to load dashboard data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats.studentsTaught) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64">
          <Loader2 className="animate-spin text-[#A67B5B] mb-2" size={32} />
          <p className="font-mono text-sm text-[#6F4E37] uppercase tracking-widest">Initialising Portal...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-syne text-3xl font-bold text-[#3E2C23]">Dashboard</h1>
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-sm border border-red-200 text-xs font-mono">
              <AlertCircle size={14} />
              {error}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Calendar, label: "Today's Classes", value: stats.todayClasses },
            { icon: Zap, label: 'Pending Submissions', value: stats.pendingSubmissions },
            { icon: Users, label: 'Students Taught', value: stats.studentsTaught },
            { icon: BookOpen, label: 'Announcements', value: stats.announcementsPosted },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-4 hover:border-t-4 hover:border-t-[#A67B5B] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon size={20} className="text-[#6F4E37]" />
                <span className="font-mono text-xs tracking-widest uppercase text-[#6F4E37]">
                  {stat.label}
                </span>
              </div>
              <div className="font-syne text-2xl font-bold text-[#3E2C23]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Today's Schedule */}
        <div className="mb-8">
          <h2 className="font-syne text-xl font-bold text-[#3E2C23] mb-4">Today's Schedule</h2>
          <div className="space-y-2">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((period, idx) => (
                <div key={idx} className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-3 hover:bg-[#E6D8C3] transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-syne font-bold text-[#3E2C23]">{period.subject}</h3>
                      <div className="font-mono text-xs text-[#6F4E37] mt-1">{period.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#A67B5B] font-mono text-xs">{period.room}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-4 text-center text-[#6F4E37]">
                No classes today
              </div>
            )}
          </div>
        </div>

        {/* Recent Submissions */}
        <div>
          <h2 className="font-syne text-xl font-bold text-[#3E2C23] mb-4">Recent Submissions</h2>
          <div className="space-y-2">
            {[
              { student: 'Aarav Kumar', assignment: 'Array Operations', submitted: '2h ago' },
              { student: 'Bhavna Singh', assignment: 'Data Structures Project', submitted: '4h ago' },
              { student: 'Yuki Tanaka', assignment: 'Web Design', submitted: '6h ago' },
            ].map((sub, idx) => (
              <div key={idx} className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-3 hover:bg-[#E6D8C3] transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-syne font-bold text-[#3E2C23]">{sub.assignment}</h3>
                    <div className="font-mono text-xs text-[#6F4E37] mt-1">From: {sub.student}</div>
                  </div>
                  <div className="text-[#A67B5B] font-mono text-xs">{sub.submitted}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
