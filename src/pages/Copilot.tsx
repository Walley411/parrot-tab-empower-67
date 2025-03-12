
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MessageSquare, 
  Search,
  MoreHorizontal, 
  Shield,
  Server,
  Database,
  Users,
  Building,
  ChevronRight
} from 'lucide-react';
import { departments, dataDomains } from '@/data/mockData';

const Copilot = () => {
  const { userId } = useParams<{ userId: string }>();
  const [currentDate, setCurrentDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<any>(null);

  useEffect(() => {
    // Set current date in format "Month Year"
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  }, []);

  // Flatten all systems across departments
  const allSystems = departments.flatMap(dept => 
    dept.systems.map(system => ({
      ...system,
      department: dept.name
    }))
  );

  // Filter systems based on search query
  const filteredSystems = searchQuery 
    ? allSystems.filter(system => 
        system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        system.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSystems;

  const handleSystemClick = (system: any) => {
    setSelectedSystem(system);
  };

  const renderSystemDetails = () => {
    if (!selectedSystem) return null;

    return (
      <div className="p-6 animate-fade-in">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedSystem.name}</h2>
            <p className="text-teams-secondarytext flex items-center">
              <Building size={16} className="mr-2" />
              Department: {selectedSystem.department}
            </p>
          </div>
        </div>

        <div className="bg-teams-darkgray rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-3 flex items-center">
            <Users size={18} className="mr-2 text-teams-accent" />
            System Owners
          </h3>
          <div className="space-y-4">
            {selectedSystem.owners.map((owner: any) => (
              <div key={owner.id} className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={owner.avatarUrl} 
                    alt={owner.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="font-medium">{owner.name}</h4>
                  <p className="text-sm text-teams-secondarytext">{owner.title}</p>
                </div>
                <div className={`ml-auto w-3 h-3 rounded-full bg-teams-status-${owner.status}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-teams-darkgray rounded-lg p-4">
          <h3 className="font-medium mb-3 flex items-center">
            <Database size={18} className="mr-2 text-teams-accent" />
            Related Data Domains
          </h3>
          <div className="space-y-2">
            {dataDomains.slice(0, 2).map(domain => (
              <div key={domain.id} className="p-3 hover:bg-teams-gray rounded-md cursor-pointer">
                <h4 className="font-medium">{domain.name}</h4>
                <p className="text-sm text-teams-secondarytext truncate">{domain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in min-h-screen bg-teams-dark text-teams-text pl-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 min-h-screen">
        {/* Top header with search */}
        <div className="col-span-4 flex items-center p-2 border-b border-teams-border bg-teams-dark">
          <div className="flex-1 mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-teams-secondarytext" size={18} />
              <input
                type="text"
                placeholder="Search (⌘+E)"
                className="w-full bg-teams-darkgray border-none rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-teams-accent text-teams-text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 mr-4">
            <button className="text-teams-secondarytext hover:text-teams-text">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>
        
        {/* Main content area (3/4 width on desktop) */}
        <div className="md:col-span-3 flex flex-col h-full border-r border-teams-border">
          {/* Copilot header */}
          <div className="flex items-center p-4 border-b border-teams-border">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded overflow-hidden mr-3">
                <img 
                  src="/lovable-uploads/c0f6869a-1dcf-48ab-b261-ac174354c81c.png" 
                  alt="Copilot Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h1 className="text-xl font-semibold">Systems Explorer</h1>
            </div>
            <div className="ml-auto">
              <button className="px-4 py-2 bg-teams-highlight text-white rounded-md hover:bg-teams-accent transition-colors flex items-center">
                <MessageSquare size={16} className="mr-2" />
                New chat
              </button>
            </div>
          </div>
          
          {selectedSystem ? (
            renderSystemDetails()
          ) : (
            <div className="p-8">
              <div className="flex justify-center mb-12">
                <div className="w-16 h-16 rounded overflow-hidden">
                  <img 
                    src="/lovable-uploads/c0f6869a-1dcf-48ab-b261-ac174354c81c.png" 
                    alt="Systems Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-6 text-center">Systems Explorer</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSystems.map(system => (
                  <div 
                    key={system.id}
                    className="bg-teams-darkgray border border-teams-border rounded-lg p-4 hover:bg-teams-gray cursor-pointer transition-colors"
                    onClick={() => handleSystemClick(system)}
                  >
                    <div className="flex items-start mb-2">
                      <Server size={18} className="text-teams-accent mr-2 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-medium">{system.name}</h3>
                        <p className="text-teams-secondarytext text-sm">{system.department}</p>
                      </div>
                      <ChevronRight size={18} className="text-teams-secondarytext" />
                    </div>
                    <div className="mt-4 flex -space-x-2">
                      {system.owners.map((owner: any) => (
                        <div key={owner.id} className="w-8 h-8 rounded-full overflow-hidden border-2 border-teams-darkgray">
                          <img 
                            src={owner.avatarUrl} 
                            alt={owner.name} 
                            className="w-full h-full object-cover" 
                            title={owner.name}
                          />
                        </div>
                      ))}
                      <div className="ml-2 flex items-center text-teams-secondarytext text-sm">
                        <span className="ml-1">{system.owners.length} owner{system.owners.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar (1/4 width on desktop) */}
        <div className="hidden md:block bg-teams-darkgray">
          <div className="p-4 border-b border-teams-border">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2">
                <img 
                  src="/lovable-uploads/c0f6869a-1dcf-48ab-b261-ac174354c81c.png" 
                  alt="Systems Logo"
                  className="w-full h-full object-cover" 
                />
              </div>
              <h2 className="font-medium">Systems</h2>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-sm font-medium mb-2">Departments</h3>
            
            <div className="space-y-2 mb-6">
              {departments.map(dept => (
                <button 
                  key={dept.id}
                  className="text-sm text-teams-secondarytext hover:text-teams-text w-full text-left truncate flex items-center"
                >
                  <Building size={14} className="mr-2" />
                  {dept.name} ({dept.systems.length})
                </button>
              ))}
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Data Domains</h3>
              
              <div className="space-y-2">
                {dataDomains.map(domain => (
                  <button 
                    key={domain.id}
                    className="text-sm text-teams-secondarytext hover:text-teams-text w-full text-left truncate flex items-center"
                  >
                    <Database size={14} className="mr-2" />
                    {domain.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copilot;
