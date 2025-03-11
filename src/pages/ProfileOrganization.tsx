
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AvatarStatus from '@/components/AvatarStatus';
import { ChevronRight } from 'lucide-react';

const ProfileOrganization = () => {
  const user = useOutletContext<any>();

  return (
    <div className="animate-fade-in">
      {user.managers && user.managers.length > 0 && (
        <div className="mb-6">
          {user.managers.map((manager: any) => (
            <Link 
              key={manager.id} 
              to={`/profile/${manager.id}`}
              className="teams-card teams-card-hover flex items-center justify-between mb-2"
            >
              <div className="flex items-center">
                <AvatarStatus 
                  avatarUrl={manager.avatarUrl} 
                  status={manager.status} 
                  size="medium" 
                />
                <div className="ml-3">
                  <h3 className="font-medium">{manager.name}</h3>
                  <p className="text-sm">{manager.title}</p>
                  <p className="text-xs text-teams-secondarytext">{manager.department}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-teams-secondarytext" />
            </Link>
          ))}
          <div className="border-t border-teams-border my-4"></div>
        </div>
      )}
      
      <div className="teams-card mb-4 p-6 text-center">
        <p className="text-teams-secondarytext">Organization view information not available</p>
      </div>
    </div>
  );
};

export default ProfileOrganization;
