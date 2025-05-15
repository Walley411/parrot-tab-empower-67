import React, { useState, useEffect } from 'react';
import { User, Search, Filter, Building, Database, Globe, UserCog, ChevronDown, ChevronRight } from 'lucide-react';
import AvatarStatus from '@/components/AvatarStatus';
import SearchFilterBar from '@/components/SearchFilterBar';
import { users } from '@/data/mockData';
import { departments, dataDomains } from '@/data/mockData';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  // Filter options for the search bar
  const filterOptions = [
    { value: 'IT', label: 'IT Department' },
    { value: 'Finance', label: 'Finance Department' },
    { value: 'HR', label: 'HR Department' },
    { value: 'available', label: 'Available' },
    { value: 'busy', label: 'Busy' },
    { value: 'away', label: 'Away' },
  ];

  // Handle search and filter
  useEffect(() => {
    let result = [...users];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.title.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query)
      );
    }
    
    // Apply filter
    if (filterCategory) {
      if (['available', 'busy', 'away', 'offline'].includes(filterCategory)) {
        result = result.filter(user => user.status === filterCategory);
      } else if (['IT', 'Finance', 'HR'].includes(filterCategory)) {
        result = result.filter(user => user.department.includes(filterCategory));
      }
    }
    
    setFilteredUsers(result);
  }, [searchQuery, filterCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setFilterCategory(category);
  };

  const toggleUserExpansion = (userId: string) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
    } else {
      setExpandedUser(userId);
    }
  };

  // Function to get user relationships data
  const getUserRelationships = (userId: string) => {
    // Find departments related to this user
    // The error was here - looking at the mockData.ts file, departments don't have a members property
    // Instead, we need to find systems owned by the user
    const userDepartments = departments.filter(dept => 
      dept.systems.some(system => 
        system.owners.some(owner => owner.id === userId)
      )
    );
    
    // Find systems where user is an owner
    const userSystems = departments.flatMap(dept => 
      dept.systems.filter(system => 
        system.owners.some(owner => owner.id === userId)
      )
    );
    
    // Find domains where user is a steward
    const userDomains = dataDomains.filter(domain => 
      domain.stewards.some(steward => steward.id === userId)
    );
    
    // Find subdomains where user is a steward
    const userSubdomains = dataDomains.flatMap(domain => 
      domain.subdomains.filter(subdomain => 
        subdomain.stewards.some(steward => steward.id === userId)
      ).map(subdomain => ({
        ...subdomain,
        parentDomain: domain.name
      }))
    );

    // User's roles
    const userRoles = [];
    if (userSystems.length > 0) userRoles.push("System Owner");
    if (userDomains.length > 0) userRoles.push("Domain Steward");
    if (userSubdomains.length > 0) userRoles.push("Subdomain Steward");
    
    return {
      departments: userDepartments,
      systems: userSystems,
      domains: userDomains,
      subdomains: userSubdomains,
      roles: userRoles
    };
  };

  return (
    <div>
      <SearchFilterBar 
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={filterOptions}
        placeholder="Search users by name, title, or department..."
      />
      
      {filteredUsers.length === 0 ? (
        <div className="text-teams-secondarytext text-center py-6">
          No users found matching your criteria
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredUsers.map(user => {
            const relationships = getUserRelationships(user.id);
            const hasRelationships = relationships.departments.length > 0 || 
                                     relationships.systems.length > 0 || 
                                     relationships.domains.length > 0 || 
                                     relationships.subdomains.length > 0 ||
                                     relationships.roles.length > 0;
            
            return (
              <Collapsible 
                key={user.id}
                open={expandedUser === user.id}
                onOpenChange={() => toggleUserExpansion(user.id)}
                className="border border-teams-border rounded-md bg-teams-darkgray hover:bg-teams-gray transition-colors"
              >
                <CollapsibleTrigger className="w-full text-left p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AvatarStatus 
                        avatarUrl={user.avatarUrl} 
                        status={user.status as 'available' | 'away' | 'busy' | 'offline'} 
                        size="medium"
                      />
                      <div className="ml-3">
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-teams-secondarytext">{user.title}</p>
                        <p className="text-xs text-teams-secondarytext mt-1">{user.department}</p>
                      </div>
                    </div>
                    {hasRelationships && (
                      <div className="text-teams-secondarytext">
                        {expandedUser === user.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </div>
                    )}
                  </div>
                </CollapsibleTrigger>
                
                {hasRelationships && (
                  <CollapsibleContent className="p-4 pt-0 border-t border-teams-border mt-2">
                    <div className="grid gap-3">
                      {relationships.departments.length > 0 && (
                        <div className="border-l-2 border-teams-accent pl-3">
                          <div className="flex items-center text-teams-secondarytext mb-2">
                            <Building size={16} className="mr-2" />
                            <span className="font-medium text-sm">Departments</span>
                          </div>
                          <ul className="space-y-1">
                            {relationships.departments.map(dept => (
                              <li key={dept.id} className="text-sm pl-6">{dept.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {relationships.systems.length > 0 && (
                        <div className="border-l-2 border-teams-accent pl-3">
                          <div className="flex items-center text-teams-secondarytext mb-2">
                            <Database size={16} className="mr-2" />
                            <span className="font-medium text-sm">Systems</span>
                          </div>
                          <ul className="space-y-1">
                            {relationships.systems.map(system => (
                              <li key={system.id} className="text-sm pl-6">{system.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {(relationships.domains.length > 0 || relationships.subdomains.length > 0) && (
                        <div className="border-l-2 border-teams-accent pl-3">
                          <div className="flex items-center text-teams-secondarytext mb-2">
                            <Globe size={16} className="mr-2" />
                            <span className="font-medium text-sm">Domains</span>
                          </div>
                          <ul className="space-y-1">
                            {relationships.domains.map(domain => (
                              <li key={domain.id} className="text-sm pl-6">{domain.name}</li>
                            ))}
                            {relationships.subdomains.map(subdomain => (
                              <li key={subdomain.id} className="text-sm pl-6">
                                {subdomain.name} <span className="text-xs text-teams-secondarytext">(in {subdomain.parentDomain})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {relationships.roles.length > 0 && (
                        <div className="border-l-2 border-teams-accent pl-3">
                          <div className="flex items-center text-teams-secondarytext mb-2">
                            <UserCog size={16} className="mr-2" />
                            <span className="font-medium text-sm">Roles</span>
                          </div>
                          <ul className="space-y-1">
                            {relationships.roles.map((role, index) => (
                              <li key={index} className="text-sm pl-6">{role}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Users;
