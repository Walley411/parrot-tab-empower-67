
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bird } from 'lucide-react';

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
      name: 'Parrot', 
      path: `/profile/${userId}/parrot`,
      icon: Bird,
      subTabs: [
        { name: 'Tell Parrot', path: `/profile/${userId}/parrot/tell-parrot` },
        { name: 'Sources', path: `/profile/${userId}/parrot/sources` },
        { name: 'Domains', path: `/profile/${userId}/parrot/domains` }
      ]
    }
  ];
  
  // Check if we're on a parrot sub-page
  const isParrotSubPage = location.pathname.includes('/parrot/');
  
  return (
    <nav className="border-b border-teams-border">
      <div className="flex">
        {tabs.map((tab) => {
          const isActive = tab.path === location.pathname || 
                          (tab.name === 'Parrot' && isParrotSubPage);
          
          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className={({ isActive: linkActive }) => 
                `teams-tab ${(tab.name === 'Parrot' && isParrotSubPage) || linkActive ? 'teams-tab-active' : 'hover:text-teams-text hover:bg-teams-gray'}`
              }
            >
              {tab.name === 'Parrot' && <Bird size={16} className="mr-1" />}
              {tab.name}
            </NavLink>
          );
        })}
      </div>
      
      {/* Sub-navigation for Parrot */}
      {isParrotSubPage && (
        <div className="flex bg-teams-darkgray border-b border-teams-border">
          {tabs.find(tab => tab.name === 'Parrot')?.subTabs.map((subTab) => (
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
