
import React from 'react';
import { MessageSquare, Users, Video, Phone, MoreHorizontal, Plus } from 'lucide-react';
import AvatarStatus from './AvatarStatus';

interface ProfileHeaderProps {
  name: string;
  title: string;
  department: string;
  avatarUrl: string;
  status: 'available' | 'away' | 'busy' | 'offline';
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  title,
  department,
  avatarUrl,
  status
}) => {
  return (
    <div className="flex flex-col items-start p-4 animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="relative mr-4">
          <AvatarStatus avatarUrl={avatarUrl} status={status} size="large" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-teams-text">{name}</h1>
          <div className="flex items-center mt-2 space-x-2">
            <button className="bg-teams-darkgray hover:bg-teams-gray text-teams-text px-3 py-1 rounded flex items-center space-x-1 transition-colors">
              <Plus size={16} />
              <span>Pronouns</span>
            </button>
            <span className="text-teams-secondarytext">{title} • {department}</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-6 mt-2 w-full justify-start">
        <button className="flex flex-col items-center text-teams-secondarytext hover:text-teams-text transition-colors">
          <MessageSquare size={20} />
        </button>
        <button className="flex flex-col items-center text-teams-secondarytext hover:text-teams-text transition-colors">
          <Users size={20} />
        </button>
        <button className="flex flex-col items-center text-teams-secondarytext hover:text-teams-text transition-colors">
          <Video size={20} />
        </button>
        <button className="flex flex-col items-center text-teams-secondarytext hover:text-teams-text transition-colors">
          <Phone size={20} />
        </button>
        <button className="flex flex-col items-center text-teams-secondarytext hover:text-teams-text transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
