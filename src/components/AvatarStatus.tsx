
import React from 'react';

interface AvatarStatusProps {
  avatarUrl: string;
  status: 'available' | 'away' | 'busy' | 'offline';
  size?: 'small' | 'medium' | 'large';
}

const AvatarStatus: React.FC<AvatarStatusProps> = ({
  avatarUrl,
  status,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-20 h-20'
  };

  const statusSizeClasses = {
    small: 'w-2.5 h-2.5',
    medium: 'w-3.5 h-3.5',
    large: 'w-5 h-5'
  };

  const statusColorClasses = {
    available: 'bg-teams-status-available',
    away: 'bg-teams-status-away',
    busy: 'bg-teams-status-busy',
    offline: 'bg-teams-status-offline'
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <img
        src={avatarUrl}
        alt="Avatar"
        className={`${sizeClasses[size]} rounded-full object-cover`}
      />
      <div 
        className={`absolute bottom-0 right-0 ${statusSizeClasses[size]} ${statusColorClasses[status]} rounded-full border-2 border-teams-dark`}
      />
    </div>
  );
};

export default AvatarStatus;
