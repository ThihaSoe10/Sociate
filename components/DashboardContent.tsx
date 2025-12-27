import React from 'react';
import { Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardContentProps {
  language: Language;
}

const data = [
  { name: 'Mon', likes: 4000, shares: 2400 },
  { name: 'Tue', likes: 3000, shares: 1398 },
  { name: 'Wed', likes: 2000, shares: 9800 },
  { name: 'Thu', likes: 2780, shares: 3908 },
  { name: 'Fri', likes: 1890, shares: 4800 },
  { name: 'Sat', likes: 2390, shares: 3800 },
  { name: 'Sun', likes: 3490, shares: 4300 },
];

export const DashboardContent: React.FC<DashboardContentProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Total Followers</h3>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg"><i className="fa-solid fa-users"></i></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">12,345</span>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Engagement Rate</h3>
            <span className="p-2 bg-purple-50 text-purple-600 rounded-lg"><i className="fa-solid fa-heart"></i></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">5.8%</span>
            <span className="text-sm text-green-600 font-medium">+2.1%</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">Scheduled Posts</h3>
            <span className="p-2 bg-orange-50 text-orange-600 rounded-lg"><i className="fa-solid fa-clock"></i></span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">8</span>
            <span className="text-sm text-gray-500">Next: 2 hours</span>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          {language === Language.MYANMAR ? 'အပတ်စဉ် သုံးသပ်ချက်' : 'Weekly Analytics'}
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#f9fafb'}}
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
              />
              <Bar dataKey="likes" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" fill="#d946ef" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {language === Language.MYANMAR ? 'လတ်တလော လှုပ်ရှားမှုများ' : 'Recent Activity'}
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <i className="fa-brands fa-facebook-f"></i>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Product Launch Post</p>
                  <p className="text-xs text-gray-500">Posted to Facebook Page</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
