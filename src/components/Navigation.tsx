
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  ShieldCheck, 
  MessageSquare, 
  BellRing, 
  Users, 
  Calendar, 
  Phone, 
  Cloud, 
  MoreVertical,
  Plus
} from 'lucide-react';

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
      icon: <ShieldCheck size={16} className="mr-1" />,
      subTabs: [
        { name: 'Department', path: `/profile/${userId}/governance/department` },
        { name: 'Systems', path: `/profile/${userId}/governance/systems` },
        { name: 'Domains', path: `/profile/${userId}/governance/domains` },
        { name: 'Roles', path: `/profile/${userId}/governance/roles` }
      ]
    },
    {
      name: 'Copilot', 
      path: `/profile/${userId}/copilot`,
      icon: <MessageSquare size={16} className="mr-1" />
    }
  ];
  
  // Check if we're on a governance sub-page
  const isGovernanceSubPage = location.pathname.includes('/governance/');
  
  // App bar actions for Teams-like interface
  const sidebarItems = [
    { icon: <BellRing size={24} />, label: 'Activity', path: `/profile/${userId}/activity` },
    { icon: <MessageSquare size={24} />, label: 'Chat', path: `/profile/${userId}/chat` },
    { icon: <Users size={24} />, label: 'Teams', path: `/profile/${userId}/teams` },
    { icon: <Calendar size={24} />, label: 'Calendar', path: `/profile/${userId}/calendar` },
    { icon: <Phone size={24} />, label: 'Calls', path: `/profile/${userId}/calls` },
    { icon: <Cloud size={24} />, label: 'OneDrive', path: `/profile/${userId}/onedrive` },
    { icon: <MessageSquare size={24} />, label: 'Copilot', path: `/profile/${userId}/copilot`, active: location.pathname.includes('/copilot') },
    { icon: <MoreVertical size={24} />, label: 'More', path: '#' },
    { icon: <Plus size={24} />, label: 'Apps', path: '#', className: 'mt-auto' }
  ];
  
  if (location.pathname.includes('/copilot')) {
    return (
      <div className="flex h-screen">
        {/* Left sidebar */}
        <div className="w-16 bg-[#6e2121] flex flex-col items-center py-4 h-screen fixed left-0 top-0">
          {sidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={`w-full flex flex-col items-center justify-center py-3 text-white opacity-75 hover:opacity-100 transition-opacity ${
                item.active ? 'opacity-100 border-l-2 border-white' : ''
              } ${item.className || ''}`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
        
        {/* This is just the main content - the actual content will be handled by the Copilot component */}
      </div>
    );
  }
  
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
              <div className="flex items-center">
                {tab.icon && tab.icon}
                {tab.name}
              </div>
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
