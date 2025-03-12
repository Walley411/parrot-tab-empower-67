
import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, ChevronRight, Database, Users, Laptop, Shield, UserCog } from 'lucide-react';
import AvatarStatus from '@/components/AvatarStatus';
import SearchFilterBar from '@/components/SearchFilterBar';

// Mock data for governance roles and their responsibilities
const governanceRoles = [
  {
    id: '1',
    title: 'Data Owner',
    description: 'Accountable for the quality and security of specific data assets. Approves data access requests and ensures compliance with data policies.',
    responsibilities: [
      'Define data quality requirements',
      'Approve access to data',
      'Ensure regulatory compliance',
      'Coordinate with Data Stewards'
    ]
  },
  {
    id: '2',
    title: 'Data Steward',
    description: 'Responsible for day-to-day management of data assets. They implement data standards and resolve data quality issues.',
    responsibilities: [
      'Implement data standards',
      'Resolve data quality issues',
      'Document data lineage',
      'Assist with data access requests'
    ]
  },
  {
    id: '3',
    title: 'Data Protection Officer',
    description: 'Ensures organization complies with data privacy regulations. Oversees data privacy impact assessments and breach notification processes.',
    responsibilities: [
      'Monitor compliance with privacy laws',
      'Conduct privacy impact assessments',
      'Manage data breach notifications',
      'Train staff on data protection'
    ]
  },
  {
    id: '4',
    title: 'Data Governance Council',
    description: 'Cross-functional team that establishes data governance policies, standards, and processes for the organization.',
    responsibilities: [
      'Establish data governance policies',
      'Resolve cross-functional data issues',
      'Oversee data governance implementation',
      'Approve data governance initiatives'
    ]
  },
  {
    id: '5',
    title: 'Chief Data Officer',
    description: 'Executive responsible for enterprise-wide data strategy, governance, control, policy development, and effective data usage.',
    responsibilities: [
      'Develop data strategy',
      'Lead data governance initiatives',
      'Align data activities with business goals',
      'Oversee data management functions'
    ]
  }
];

// Mock enterprise software data with data owners and governance roles
const enterpriseSoftware = [
  {
    id: '1',
    name: 'SAP ERP',
    description: 'Enterprise Resource Planning system',
    category: 'Business Applications',
    dataOwners: [
      {
        id: '1',
        name: 'Alex Morgan',
        title: 'PCS External Contractor',
        role: 'Data Owner',
        avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'available'
      },
      {
        id: '2',
        name: 'Taylor Chen',
        title: 'Portfolio Manager',
        role: 'Data Steward',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'away'
      }
    ]
  },
  {
    id: '2',
    name: 'Microsoft 365',
    description: 'Productivity and collaboration platform',
    category: 'Productivity',
    dataOwners: [
      {
        id: '2',
        name: 'Taylor Chen',
        title: 'Portfolio Manager',
        role: 'Data Owner',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'away'
      }
    ]
  },
  {
    id: '3',
    name: 'Salesforce',
    description: 'Customer Relationship Management',
    category: 'Business Applications',
    dataOwners: [
      {
        id: '1001',
        name: 'Blair Dumbell',
        title: 'PCS External Contractor',
        role: 'Data Owner',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'available'
      },
      {
        id: '1002',
        name: 'Kyle Donnison',
        title: 'PCS External Contractor',
        role: 'Data Steward',
        avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'away'
      }
    ]
  },
  {
    id: '4',
    name: 'ServiceNow',
    description: 'IT Service Management',
    category: 'IT Applications',
    dataOwners: [
      {
        id: '3001',
        name: 'Liezel Pieters',
        title: 'PCS External Contractor',
        role: 'Data Owner',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'away'
      },
      {
        id: '3003',
        name: 'Roselle Abano',
        title: 'PCS External Contractor',
        role: 'Data Protection Officer',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'available'
      }
    ]
  },
  {
    id: '5',
    name: 'Workday',
    description: 'Human Capital Management',
    category: 'HR Applications',
    dataOwners: [
      {
        id: '3002',
        name: 'Ghia Assanova',
        title: 'PCS External Contractor',
        role: 'Data Owner',
        avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'available'
      }
    ]
  }
];

const Sources = () => {
  const [expandedSoftware, setExpandedSoftware] = useState<string[]>([]);
  const [filteredSoftware, setFilteredSoftware] = useState(enterpriseSoftware);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [expandedRoles, setExpandedRoles] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('systems'); // 'systems' or 'roles'

  const toggleSoftware = (softwareId: string) => {
    setExpandedSoftware(prev => 
      prev.includes(softwareId) 
        ? prev.filter(id => id !== softwareId)
        : [...prev, softwareId]
    );
  };

  const toggleRole = (roleId: string) => {
    setExpandedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  // Group software by category
  const softwareByCategory = filteredSoftware.reduce((acc, software) => {
    if (!acc[software.category]) {
      acc[software.category] = [];
    }
    acc[software.category].push(software);
    return acc;
  }, {} as Record<string, typeof enterpriseSoftware>);

  useEffect(() => {
    let result = [...enterpriseSoftware];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(software => 
        software.name.toLowerCase().includes(query) ||
        software.description.toLowerCase().includes(query) ||
        software.dataOwners.some(owner => owner.name.toLowerCase().includes(query))
      );
    }
    
    // Apply filter
    if (filterCategory) {
      result = result.filter(software => software.category === filterCategory);
    }
    
    setFilteredSoftware(result);
  }, [searchQuery, filterCategory]);

  const filterOptions = [
    { value: 'Business Applications', label: 'Business Applications' },
    { value: 'Productivity', label: 'Productivity' },
    { value: 'IT Applications', label: 'IT Applications' },
    { value: 'HR Applications', label: 'HR Applications' }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilter = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex border-b border-teams-border mb-4">
        <button
          className={`flex items-center px-4 py-2 ${activeTab === 'systems' ? 'text-teams-accent border-b-2 border-teams-accent' : 'text-teams-secondarytext hover:text-teams-text'}`}
          onClick={() => setActiveTab('systems')}
        >
          <Database size={16} className="mr-2" />
          Systems
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === 'roles' ? 'text-teams-accent border-b-2 border-teams-accent' : 'text-teams-secondarytext hover:text-teams-text'}`}
          onClick={() => setActiveTab('roles')}
        >
          <UserCog size={16} className="mr-2" />
          Roles
        </button>
      </div>

      {activeTab === 'systems' && (
        <>
          <SearchFilterBar 
            onSearch={handleSearch}
            onFilter={handleFilter}
            filterOptions={filterOptions}
            placeholder="Search software, descriptions or owners..."
          />
          
          {Object.keys(softwareByCategory).length === 0 ? (
            <div className="text-teams-secondarytext text-center py-6">
              No software found matching your criteria
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(softwareByCategory).map(([category, softwares]) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-sm text-teams-secondarytext font-medium flex items-center">
                    <Laptop size={16} className="mr-2" />
                    {category}
                  </h3>
                  
                  {softwares.map(software => (
                    <div key={software.id} className="border border-teams-border rounded-md overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-3 bg-teams-darkgray cursor-pointer hover:bg-teams-gray"
                        onClick={() => toggleSoftware(software.id)}
                      >
                        <div className="flex items-center">
                          <Database size={16} className="mr-3 text-teams-secondarytext" />
                          <div>
                            <span className="font-medium">{software.name}</span>
                            <p className="text-xs text-teams-secondarytext">{software.description}</p>
                          </div>
                        </div>
                        {expandedSoftware.includes(software.id) ? 
                          <ChevronDown size={18} /> : 
                          <ChevronRight size={18} />
                        }
                      </div>
                      
                      {expandedSoftware.includes(software.id) && (
                        <div className="animate-slide-in">
                          <div className="p-3 bg-teams-gray border-t border-teams-border">
                            <div className="flex items-center text-teams-secondarytext mb-2">
                              <Users size={16} className="mr-2" />
                              <span className="text-sm font-medium">Data Governance</span>
                            </div>
                            
                            <div className="space-y-2 mt-2">
                              {software.dataOwners.map(owner => (
                                <div key={owner.id} className="flex items-center p-2 rounded-md hover:bg-teams-lightgray">
                                  <AvatarStatus 
                                    avatarUrl={owner.avatarUrl} 
                                    status={owner.status as 'available' | 'away' | 'busy' | 'offline'} 
                                    size="small" 
                                  />
                                  <div className="ml-3 flex-1">
                                    <p className="font-medium text-sm">{owner.name}</p>
                                    <p className="text-xs text-teams-secondarytext">{owner.title}</p>
                                  </div>
                                  <div className="flex items-center px-2 py-1 bg-teams-lightgray rounded text-xs">
                                    <Shield size={12} className="mr-1 text-teams-accent" />
                                    {owner.role}
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
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'roles' && (
        <div className="space-y-4">
          <p className="text-teams-secondarytext text-sm mb-4">
            Learn about the different data governance roles and their responsibilities in the organization.
          </p>
          
          {governanceRoles.map(role => (
            <div key={role.id} className="border border-teams-border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-teams-darkgray cursor-pointer hover:bg-teams-gray"
                onClick={() => toggleRole(role.id)}
              >
                <div className="flex items-center">
                  <Shield size={16} className="mr-3 text-teams-accent" />
                  <span className="font-medium">{role.title}</span>
                </div>
                {expandedRoles.includes(role.id) ? 
                  <ChevronDown size={18} /> : 
                  <ChevronRight size={18} />
                }
              </div>
              
              {expandedRoles.includes(role.id) && (
                <div className="animate-slide-in">
                  <div className="p-4 bg-teams-gray border-t border-teams-border">
                    <p className="text-teams-text mb-3">
                      {role.description}
                    </p>
                    
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-teams-secondarytext mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-1 pl-5 list-disc text-sm text-teams-text">
                        {role.responsibilities.map((responsibility, index) => (
                          <li key={index}>{responsibility}</li>
                        ))}
                      </ul>
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

export default Sources;
