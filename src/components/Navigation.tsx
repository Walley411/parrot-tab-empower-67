
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

interface NavigationProps {
  userId: string;
}

const Navigation: React.FC<NavigationProps> = ({ userId }) => {
  const location = useLocation();

  const tabs = [
    { name: 'Overview', path: `/profile/${userId}` },
    { name: 'Contact', path: `/profile/${userId}/contact` },
    { name: 'Organization', path: `/profile/${userId}/organization` },
    { 
      name: 'Governance', 
      path: `/profile/${userId}/governance`,
      subTabs: [
        { name: 'Department', path: `/profile/${userId}/governance/department` },
        { name: 'Systems', path: `/profile/${userId}/governance/systems` },
        { name: 'Domains', path: `/profile/${userId}/governance/domains` }
      ]
    }
  ];
  
  // Check if we're on a governance sub-page
  const isGovernanceSubPage = location.pathname.includes('/governance/');
  
  return (
    <nav className="border-b border-teams-border">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = tab.path === location.pathname || 
                          (tab.name === 'Governance' && isGovernanceSubPage);
          
          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive: linkActive }) => 
                `teams-tab ${(tab.name === 'Governance' && isGovernanceSubPage) || linkActive ? 'teams-tab-active' : 'hover:text-teams-text hover:bg-teams-gray'}`
              }
            >
              {tab.name}
            </NavLink>
          );
        })}
      </div>
      
      {/* Sub-navigation for Governance */}
      {isGovernanceSubPage && (
        <div className="flex bg-teams-darkgray border-b border-teams-border">
          {tabs.find(tab => tab.name === 'Governance')?.subTabs.map((subTab) => (
            <NavLink
              key={subTab.name}
              to={subTab.path}
              className={({ isActive }) => 
                `teams-tab ${isActive ? 'teams-tab-active' : 'hover:text-teams-text hover:bg-teams-gray'} text-sm py-1 px-3`
              }
            >
              {subTab.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
