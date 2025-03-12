import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Building, Database, User } from 'lucide-react';
import AvatarStatus from '@/components/AvatarStatus';
import SearchFilterBar from '@/components/SearchFilterBar';
import { departments } from '@/data/mockData';

const TellParrot = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [expandedSystems, setExpandedSystems] = useState<string[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const toggleDepartment = (deptId: string) => {
    setExpandedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const toggleSystem = (systemId: string) => {
    setExpandedSystems(prev => 
      prev.includes(systemId) 
        ? prev.filter(id => id !== systemId)
        : [...prev, systemId]
    );
  };

  useEffect(() => {
    let result = [...departments];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(dept => {
        const deptMatches = dept.name.toLowerCase().includes(query);
        const systemMatches = dept.systems.some(system => 
          system.name.toLowerCase().includes(query) || 
          system.owners.some(owner => owner.name.toLowerCase().includes(query))
        );
        return deptMatches || systemMatches;
      });
    }
    
    // Apply filter
    if (filterCategory) {
      if (filterCategory === 'IT') {
        result = result.filter(dept => dept.name.includes('Information Technology'));
      } else if (filterCategory === 'finance') {
        result = result.filter(dept => dept.name.includes('Finance'));
      } else if (filterCategory === 'hr') {
        result = result.filter(dept => dept.name.includes('Human Resources'));
      }
    }
    
    setFilteredDepartments(result);
  }, [searchQuery, filterCategory]);

  const filterOptions = [
    { value: 'IT', label: 'IT Systems' },
    { value: 'finance', label: 'Finance Systems' },
    { value: 'hr', label: 'HR Systems' }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <div>
      <SearchFilterBar 
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterOptions={filterOptions}
        placeholder="Search departments, systems or owners..."
      />
      
      {filteredDepartments.length === 0 ? (
        <div className="text-teams-secondarytext text-center py-6">
          No departments found matching your criteria
        </div>
      ) : (
        <div className="space-y-2">
          {filteredDepartments.map(dept => (
            <div key={dept.id} className="border border-teams-border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-teams-darkgray cursor-pointer hover:bg-teams-gray"
                onClick={() => toggleDepartment(dept.id)}
              >
                <div className="flex items-center">
                  <Building size={16} className="mr-3 text-teams-secondarytext" />
                  <span>{dept.name}</span>
                </div>
                {expandedDepartments.includes(dept.id) ? 
                  <ChevronDown size={18} /> : 
                  <ChevronRight size={18} />
                }
              </div>
              
              {expandedDepartments.includes(dept.id) && (
                <div className="animate-slide-in">
                  <div className="p-3 bg-teams-gray border-t border-teams-border">
                    <div className="flex items-center text-teams-secondarytext mb-2">
                      <Database size={16} className="mr-2" />
                      <span className="text-sm font-medium">Source Systems</span>
                    </div>
                    
                    <div className="ml-5 space-y-2">
                      {dept.systems.map(system => (
                        <div key={system.id} className="border border-teams-border rounded-md overflow-hidden">
                          <div 
                            className="flex items-center justify-between p-3 bg-teams-darkgray cursor-pointer hover:bg-teams-gray"
                            onClick={() => toggleSystem(system.id)}
                          >
                            <div className="flex items-center">
                              <Database size={14} className="mr-2 text-teams-secondarytext" />
                              <span>{system.name}</span>
                            </div>
                            {expandedSystems.includes(system.id) ? 
                              <ChevronDown size={16} /> : 
                              <ChevronRight size={16} />
                            }
                          </div>
                          
                          {expandedSystems.includes(system.id) && (
                            <div className="animate-slide-in">
                              <div className="p-3 bg-teams-gray border-t border-teams-border">
                                <div className="flex items-center text-teams-secondarytext mb-2">
                                  <User size={14} className="mr-2" />
                                  <span className="text-sm font-medium">System Owners</span>
                                </div>
                                
                                <div className="space-y-2 mt-2">
                                  {system.owners.map(owner => (
                                    <div key={owner.id} className="flex items-center p-2 rounded-md hover:bg-teams-lightgray">
                                      <AvatarStatus 
                                        avatarUrl={owner.avatarUrl} 
                                        status={owner.status as 'available' | 'away' | 'busy' | 'offline'} 
                                        size="small" 
                                      />
                                      <div className="ml-3">
                                        <p className="font-medium text-sm">{owner.name}</p>
                                        <p className="text-xs text-teams-secondarytext">{owner.title}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TellParrot;
