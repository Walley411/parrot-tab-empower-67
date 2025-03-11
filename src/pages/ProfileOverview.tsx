
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Clock, Users, Building, Shield, Database, Globe, FolderTree } from 'lucide-react';
import AvatarStatus from '@/components/AvatarStatus';
import { dataDomains, departments } from '@/data/mockData';

const ProfileOverview = () => {
  const user = useOutletContext<any>();

  // Find domains where the user is a steward
  const userDomains = dataDomains.filter(domain => 
    domain.stewards.some(steward => steward.id === user.id)
  );

  // Find subdomains where the user is a steward
  const userSubdomains = dataDomains.flatMap(domain => 
    domain.subdomains.filter(subdomain => 
      subdomain.stewards.some(steward => steward.id === user.id)
    ).map(subdomain => ({
      ...subdomain,
      parentDomain: domain.name
    }))
  );

  // Find systems where the user is an owner
  const userSystems = departments.flatMap(dept => 
    dept.systems.filter(system => 
      system.owners.some(owner => owner.id === user.id)
    ).map(system => ({
      ...system,
      department: dept.name
    }))
  );

  return (
    <div className="animate-fade-in">
      <div className="teams-card mb-4">
        <div className="flex items-center">
          <div className="bg-teams-status-available text-white p-2 rounded-full mr-3">
            <Clock size={18} />
          </div>
          <div>
            <h3 className="font-semibold">Available • Free at 8:00 AM</h3>
            <p className="text-sm">Work hours: {user.workHours}</p>
          </div>
        </div>
        <div className="mt-4 text-teams-secondarytext flex items-center">
          <Clock size={16} className="mr-2" />
          <span>7:11 AM - Your local time</span>
        </div>
      </div>

      {/* Contact Information */}
      <h2 className="text-xl font-semibold mb-4">Contact information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-start">
          <div className="w-8 h-8 mr-3 flex items-center justify-center text-teams-secondarytext">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 2V2.5L10 8.5L2 2.5V2H18ZM18 14H2V4.5L10 10.5L18 4.5V14Z" fill="currentColor"/>
            </svg>
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V2C20 0.9 19.1 0 18 0ZM18 18H2V2H18V18ZM10 6C8.3 6 7 7.3 7 9H9C9 8.4 9.4 8 10 8C10.6 8 11 8.4 11 9C11 10 8 9.7 8 12H10C10 10.7 13 10.9 13 9C13 7.3 11.7 6 10 6ZM9 13H11V15H9V13Z" fill="currentColor"/>
            </svg>
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
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 0C4.03 0 0 4.03 0 9C0 11.7 1.05 14.15 2.75 16L9 22.25L15.25 16C16.95 14.15 18 11.7 18 9C18 4.03 13.97 0 9 0ZM9 2C12.87 2 16 5.13 16 9C16 11 15.21 12.8 13.9 14.25L9 19.15L4.1 14.25C2.79 12.8 2 11 2 9C2 5.13 5.13 2 9 2ZM9 4.5C7.07 4.5 5.5 6.07 5.5 8C5.5 9.93 7.07 11.5 9 11.5C10.93 11.5 12.5 9.93 12.5 8C12.5 6.07 10.93 4.5 9 4.5ZM9 6.5C9.83 6.5 10.5 7.17 10.5 8C10.5 8.83 9.83 9.5 9 9.5C8.17 9.5 7.5 8.83 7.5 8C7.5 7.17 8.17 6.5 9 6.5Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <p className="text-sm text-teams-secondarytext">Location</p>
            <span>{user.location}</span>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="w-8 h-8 mr-3 flex items-center justify-center text-teams-secondarytext">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V8H18V14ZM18 6H2V2H18V6Z" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <p className="text-sm text-teams-secondarytext">Company</p>
            <span>{user.company}</span>
          </div>
        </div>
      </div>

      {/* Management Section */}
      {user.managers && user.managers.length > 0 && (
        <div className="mb-6">
          <div className="teams-card">
            <div className="flex items-center text-teams-text mb-4">
              <Users size={20} className="mr-2" />
              <h2 className="text-lg font-semibold">Management Chain</h2>
            </div>
            
            <div className="space-y-2">
              {user.managers.map((manager: any) => (
                <div key={manager.id} className="flex items-center p-2 rounded-md hover:bg-teams-lightgray">
                  <AvatarStatus 
                    avatarUrl={manager.avatarUrl} 
                    status={manager.status as 'available' | 'away' | 'busy' | 'offline'} 
                    size="small" 
                  />
                  <div className="ml-3">
                    <p className="font-medium">{manager.name}</p>
                    <p className="text-xs text-teams-secondarytext">{manager.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Data Responsibilities Section */}
      {(userDomains.length > 0 || userSubdomains.length > 0 || userSystems.length > 0) && (
        <div className="mb-6">
          <div className="teams-card">
            <div className="flex items-center text-teams-text mb-4">
              <Shield size={20} className="mr-2" />
              <h2 className="text-lg font-semibold">Data Responsibilities</h2>
            </div>
            
            {userDomains.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center text-teams-secondarytext mb-2">
                  <Globe size={16} className="mr-2" />
                  <span className="text-sm font-medium">Domain Steward</span>
                </div>
                
                <div className="space-y-2">
                  {userDomains.map(domain => (
                    <div key={domain.id} className="flex items-center p-2 bg-teams-darkgray rounded-md">
                      <Globe size={16} className="mr-2 text-teams-accent" />
                      <div>
                        <p className="font-medium">{domain.name}</p>
                        <p className="text-xs text-teams-secondarytext">{domain.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {userSubdomains.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center text-teams-secondarytext mb-2">
                  <FolderTree size={16} className="mr-2" />
                  <span className="text-sm font-medium">Subdomain Steward</span>
                </div>
                
                <div className="space-y-2">
                  {userSubdomains.map(subdomain => (
                    <div key={subdomain.id} className="flex items-center p-2 bg-teams-darkgray rounded-md">
                      <FolderTree size={16} className="mr-2 text-teams-accent" />
                      <div>
                        <p className="font-medium">{subdomain.name}</p>
                        <p className="text-xs text-teams-secondarytext">Part of {subdomain.parentDomain}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {userSystems.length > 0 && (
              <div>
                <div className="flex items-center text-teams-secondarytext mb-2">
                  <Database size={16} className="mr-2" />
                  <span className="text-sm font-medium">System Owner</span>
                </div>
                
                <div className="space-y-2">
                  {userSystems.map(system => (
                    <div key={system.id} className="flex items-center p-2 bg-teams-darkgray rounded-md">
                      <Database size={16} className="mr-2 text-teams-accent" />
                      <div>
                        <p className="font-medium">{system.name}</p>
                        <p className="text-xs text-teams-secondarytext">{system.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;
