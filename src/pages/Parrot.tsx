
import React from 'react';
import { useParams, Outlet, Navigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Building, Database, Globe, UserCog } from 'lucide-react';

const Governance = () => {
  // Extract the userId from params to ensure proper navigation
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  
  // Determine which sub-section we're on
  const currentPath = location.pathname;
  
  // Set up the section info based on current path
  let sectionIcon = <Building size={20} className="mr-2 text-teams-accent" />;
  let sectionTitle = "Department";
  let sectionDescription = "View organizational departments and their system owners";
  
  if (currentPath.includes('/governance/systems')) {
    sectionIcon = <Database size={20} className="mr-2 text-teams-accent" />;
    sectionTitle = "Systems";
    sectionDescription = "Explore source systems and their connections";
  } else if (currentPath.includes('/governance/domains')) {
    sectionIcon = <Globe size={20} className="mr-2 text-teams-accent" />;
    sectionTitle = "Domains";
    sectionDescription = "Browse data domains and their relationships";
  } else if (currentPath.includes('/governance/roles')) {
    sectionIcon = <UserCog size={20} className="mr-2 text-teams-accent" />;
    sectionTitle = "Roles";
    sectionDescription = "Learn about data governance roles and responsibilities";
  }

  return (
    <div className="animate-fade-in">
      <div className="teams-card mb-4">
        <div className="flex items-center text-teams-text mb-4">
          <ShieldCheck size={20} className="mr-2 text-teams-accent" />
          <h2 className="text-lg font-semibold">Governance</h2>
        </div>
        <p className="text-teams-secondarytext mb-4">
          Explore and interact with Tell Parrot governance information, view systems, departments, and data domains.
        </p>
        
        {/* Section header with icon and description */}
        <div className="mb-4 border-t border-teams-border pt-4">
          <div className="flex items-center text-teams-text mb-2">
            {sectionIcon}
            <h3 className="font-medium">{sectionTitle}</h3>
          </div>
          <p className="text-sm text-teams-secondarytext ml-7">
            {sectionDescription}
          </p>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default Governance;
