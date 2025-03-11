
import React from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProfileHeader from '@/components/ProfileHeader';
import Navigation from '@/components/Navigation';
import { users } from '@/data/mockData';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="animate-fade-in">
        <ProfileHeader 
          name={user.name}
          title={user.title}
          department={user.department}
          avatarUrl={user.avatarUrl}
          status={user.status as 'available' | 'away' | 'busy' | 'offline'}
        />
        <Navigation userId={userId || ''} />
        <div className="p-4">
          <Outlet context={user} />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
