
import React from 'react';
import { Link } from 'react-router-dom';
import { users } from '@/data/mockData';
import AvatarStatus from '@/components/AvatarStatus';

const Index = () => {
  return (
    <div className="min-h-screen bg-teams-dark text-teams-text p-4">
      <div className="max-w-3xl mx-auto">
        <div className="teams-card mb-6">
          <h1 className="text-2xl font-semibold mb-4">Microsoft Teams</h1>
          <p className="text-teams-secondarytext mb-6">Welcome to the Teams app - Tell Parrot demo</p>
          
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold mb-2">Select a user profile:</h2>
            {users.map(user => (
              <Link 
                key={user.id} 
                to={`/profile/${user.id}`} 
                className="teams-card teams-card-hover flex items-center p-3"
              >
                <AvatarStatus 
                  avatarUrl={user.avatarUrl} 
                  status={user.status as 'available' | 'away' | 'busy' | 'offline'} 
                />
                <div className="ml-3">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-teams-secondarytext">{user.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="teams-card p-4 text-sm text-teams-secondarytext">
          <p>This demo shows the Tell Parrot tab integration for Microsoft Teams profiles.</p>
          <p>Click on a user profile to see their details and the Tell Parrot tab.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
