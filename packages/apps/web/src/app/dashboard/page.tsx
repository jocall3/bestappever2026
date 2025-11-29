"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Mock API call for user data fetching
const fetchUserData = async () => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    username: "BestUserEver2026",
    stats: {
      projects: 42,
      tasksCompleted: 1024,
      achievementsUnlocked: 8,
    },
    recentActivity: [
      "Completed Sprint Planning",
      "Reviewed PR #101",
      "Updated Documentation",
    ]
  };
};

const DashboardPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchUserData();
          setUserData(data);
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [isAuthenticated]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-indigo-600">Loading Best App Ever Dashboard...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center text-gray-500">
          Could not load user data. Please try refreshing.
        </div>
      </DashboardLayout>
    );
  }

  const StatCard = ({ title, value }: { title: string, value: number | string }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl hover:scale-[1.02]">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-4xl font-extrabold text-indigo-700">{value}</p>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome Back, {userData.username}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your personalized hub for making 2026 the best year ever.
          </p>
        </header>

        {/* Stats Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Projects" value={userData.stats.projects} />
            <StatCard title="Tasks Completed" value={userData.stats.tasksCompleted} />
            <StatCard title="Achievements Unlocked" value={userData.stats.achievementsUnlocked} />
          </div>
        </section>

        {/* Activity Feed */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Recent Activity</h2>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <ul className="space-y-3">
              {userData.recentActivity.map((activity: string, index: number) => (
                <li key={index} className="flex items-center text-gray-700 border-l-4 border-indigo-400 pl-3 py-1 hover:bg-indigo-50 transition duration-150">
                  <svg className="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;