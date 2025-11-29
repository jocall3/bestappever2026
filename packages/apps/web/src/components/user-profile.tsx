'use client';

import React from 'react';
import { Mail, MapPin, Calendar, Edit } from 'lucide-react';

// A helper function to get initials from a name
const getInitials = (name: string): string => {
  if (!name) return '??';
  const names = name.split(' ').filter(Boolean);
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  if (names.length === 1 && names[0].length > 1) {
    return names[0].substring(0, 2).toUpperCase();
  }
  return '??';
};

// A helper function to format dates
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });
};

interface UserProfileProps {
  user: {
    name: string;
    username: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
    memberSince: Date;
  };
  stats?: {
    posts: number;
    followers: number;
    following: number;
  };
  onEdit?: () => void;
}

const StatItem: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="text-center px-4">
    <p className="text-xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">{label}</p>
  </div>
);

const DetailItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center space-x-3">
    <div className="text-gray-400 dark:text-gray-500">{icon}</div>
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </div>
);


export const UserProfile: React.FC<UserProfileProps> = ({ user, stats, onEdit }) => {
  if (!user) {
    return (
        <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">User data not available.</p>
        </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <div className="relative mb-4">
            {user.avatarUrl ? (
              <img
                className="h-28 w-28 rounded-full object-cover ring-4 ring-offset-4 dark:ring-offset-gray-800 ring-blue-500 dark:ring-blue-400"
                src={user.avatarUrl}
                alt={`${user.name}'s profile picture`}
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-offset-4 dark:ring-offset-gray-800 ring-blue-500 dark:ring-blue-400">
                <span>{getInitials(user.name)}</span>
              </div>
            )}
          </div>

          {/* Name and Username */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
          <p className="text-md text-gray-500 dark:text-gray-400">@{user.username}</p>
          
          {/* Bio */}
          {user.bio && (
            <p className="mt-4 text-center text-gray-600 dark:text-gray-300 max-w-sm text-sm">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          {stats && (
            <div className="mt-6 flex justify-around w-full border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <StatItem value={stats.posts} label="Posts" />
              <StatItem value={stats.followers} label="Followers" />
              <StatItem value={stats.following} label="Following" />
            </div>
          )}

          {/* Details */}
          <div className="mt-6 w-full space-y-4 text-left px-2">
            <DetailItem 
              icon={<Mail size={18} />}
              text={user.email}
            />
            {user.location && (
              <DetailItem 
                icon={<MapPin size={18} />}
                text={user.location}
              />
            )}
            <DetailItem 
              icon={<Calendar size={18} />}
              text={`Joined ${formatDate(user.memberSince)}`}
            />
          </div>

          {/* Edit Profile Button */}
          {onEdit && (
            <div className="mt-8 w-full">
              <button
                onClick={onEdit}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800 transition-colors"
              >
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};