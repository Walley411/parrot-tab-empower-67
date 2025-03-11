
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavigationProps {
  userId: string;
}

const Navigation: React.FC<NavigationProps> = ({ userId }) => {
  const location = useLocation();

  const tabs = [
    { name: 'Overview', path: `/profile/${userId}` },
    { name: 'Contact', path: `/profile/${userId}/contact` },
    { name: 'Organization', path: `/profile/${userId}/organization` },
    { name: 'Tell Parrot', path: `/profile/${userId}/tell-parrot` },
    { name: 'Sources', path: `/profile/${userId}/sources` }
  ];
  
  return (
    <nav className="border-b border-teams-border">
      <div className="flex">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) => 
              `teams-tab ${isActive ? 'teams-tab-active' : 'hover:text-teams-text hover:bg-teams-gray'}`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
