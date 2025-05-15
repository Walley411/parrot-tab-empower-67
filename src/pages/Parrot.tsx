
import React, { useState } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { ShieldCheck, User, Building, Database, Globe, UserCog } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Department from './TellParrot';
import Systems from './Systems';
import Domains from './Domains';
import Roles from './Roles';
import Users from './Users';

const Governance = () => {
  // Extract the userId from params to ensure proper navigation
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  
  // Determine the active tab based on the URL
  let activeTab = "department";
  if (location.pathname.includes('/governance/systems')) {
    activeTab = "systems";
  } else if (location.pathname.includes('/governance/domains')) {
    activeTab = "domains";
  } else if (location.pathname.includes('/governance/roles')) {
    activeTab = "roles";
  } else if (location.pathname.includes('/governance/users')) {
    activeTab = "users";
  }
  
  // Handle tab change - we'll update the URL to match the tab
  const handleTabChange = (value: string) => {
    window.history.pushState(
      {}, 
      '', 
      `/profile/${userId}/governance/${value}`
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="teams-card mb-4">
        <div className="flex items-center text-teams-text mb-4">
          <ShieldCheck size={20} className="mr-2 text-teams-accent" />
          <h2 className="text-lg font-semibold">Governance</h2>
        </div>
        <p className="text-teams-secondarytext mb-6">
          Explore and interact with Tell Parrot governance information, view systems, users, departments, and data domains.
        </p>
        
        {/* Teams style tabs across the top */}
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="w-full justify-start bg-teams-darkgray border-b border-teams-border rounded-none p-0">
            <TabsTrigger 
              value="users" 
              className="teams-tab data-[state=active]:teams-tab-active"
            >
              <User size={16} className="mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger 
              value="department" 
              className="teams-tab data-[state=active]:teams-tab-active"
            >
              <Building size={16} className="mr-2" />
              Department
            </TabsTrigger>
            <TabsTrigger 
              value="systems" 
              className="teams-tab data-[state=active]:teams-tab-active"
            >
              <Database size={16} className="mr-2" />
              Systems
            </TabsTrigger>
            <TabsTrigger 
              value="domains" 
              className="teams-tab data-[state=active]:teams-tab-active"
            >
              <Globe size={16} className="mr-2" />
              Domains
            </TabsTrigger>
            <TabsTrigger 
              value="roles" 
              className="teams-tab data-[state=active]:teams-tab-active"
            >
              <UserCog size={16} className="mr-2" />
              Roles
            </TabsTrigger>
          </TabsList>
          
          {/* Tab content */}
          <TabsContent value="users" className="mt-4">
            <Users />
          </TabsContent>
          <TabsContent value="department" className="mt-4">
            <Department />
          </TabsContent>
          <TabsContent value="systems" className="mt-4">
            <Systems />
          </TabsContent>
          <TabsContent value="domains" className="mt-4">
            <Domains />
          </TabsContent>
          <TabsContent value="roles" className="mt-4">
            <Roles />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Governance;
