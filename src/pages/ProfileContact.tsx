
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, MessageSquare, MapPin, Building, Briefcase, Users } from 'lucide-react';

const ProfileContact = () => {
  const user = useOutletContext<any>();

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Contact information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start">
          <div className="w-8 h-8 mr-3 flex items-center justify-center text-teams-secondarytext">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-sm text-teams-secondarytext">Email</p>
            <a href={`mailto:${user.email}`} className="text-teams-highlight hover:underline">
              {user.email}
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-8 h-8 mr-3 flex items-center justify-center text-teams-secondarytext">
            <MessageSquare size={20} />
          </div>
          <div>
            <p className="text-sm text-teams-secondarytext">Chat</p>
            <a href={`mailto:${user.email}`} className="text-teams-highlight hover:underline">
              {user.email}
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-8 h-8 mr-3 flex items-center justify-center text-teams-secondarytext">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-sm text-teams-secondarytext">Location</p>
            <span>{user.location}</span>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-8 h-8 mr-3 flex items-center justify-center text-teams-secondarytext">
            <Building size={20} />
          </div>
          <div>
            <p className="text-sm text-teams-secondarytext">Company</p>
            <span>{user.company}</span>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-8 h-8 mr-3 flex items-center justify-center text-teams-secondarytext">
            <Briefcase size={20} />
          </div>
          <div>
            <p className="text-sm text-teams-secondarytext">Job title</p>
            <span>{user.title}</span>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-8 h-8 mr-3 flex items-center justify-center text-teams-secondarytext">
            <Users size={20} />
          </div>
          <div>
            <p className="text-sm text-teams-secondarytext">Department</p>
            <span>{user.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContact;
