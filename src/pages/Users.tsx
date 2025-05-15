
import React, { useState, useEffect } from 'react';
import { User, Search, Filter } from 'lucide-react';
import AvatarStatus from '@/components/AvatarStatus';
import SearchFilterBar from '@/components/SearchFilterBar';
import { users } from '@/data/mockData';

const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

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
          {filteredUsers.map(user => (
            <div 
              key={user.id} 
              className="border border-teams-border rounded-md p-4 bg-teams-darkgray hover:bg-teams-gray transition-colors cursor-pointer"
            >
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Users;
