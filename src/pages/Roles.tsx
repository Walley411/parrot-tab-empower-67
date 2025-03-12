import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { UserCog, ChevronDown, ChevronRight, Shield, Database, ArrowRight, Globe, FolderTree } from 'lucide-react';
import { dataDomains, departments } from '@/data/mockData';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    title: 'System Owner',
    description: 'Responsible for the overall management, development, and maintenance of a system. Ensures system compliance with data governance policies.',
    responsibilities: [
      'Manage system development and maintenance',
      'Ensure system compliance with data policies',
      'Monitor system performance and data quality',
      'Coordinate with Data Stewards and Data Owners'
    ]
  },
  {
    id: '4',
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
    id: '5',
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
    id: '6',
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

const Roles = () => {
  const user = useOutletContext<any>();
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [expandedRoles, setExpandedRoles] = useState<string[]>([]);
  const [expandedUserRoles, setExpandedUserRoles] = useState<string | null>(null);

  const userDomains = dataDomains.filter(domain => 
    domain.stewards.some(steward => steward.id === userId)
  );

  const userSubdomains = dataDomains.flatMap(domain => 
    domain.subdomains.filter(subdomain => 
      subdomain.stewards.some(steward => steward.id === userId)
    ).map(subdomain => ({
      ...subdomain,
      parentDomain: domain.name,
      parentDomainId: domain.id
    }))
  );

  const userSystems = departments.flatMap(dept => 
    dept.systems.filter(system => 
      system.owners.some(owner => owner.id === userId)
    ).map(system => ({
      ...system,
      department: dept.name,
      departmentId: dept.id
    }))
  );

  const hasUserRoles = userDomains.length > 0 || userSubdomains.length > 0 || userSystems.length > 0;

  const toggleRole = (roleId: string) => {
    setExpandedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const toggleUserRole = (section: string) => {
    setExpandedUserRoles(expandedUserRoles === section ? null : section);
  };

  const navigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const navigateToSystem = (systemId: string) => {
    navigate(`/profile/${userId}/governance/systems?system=${systemId}`);
  };

  const navigateToDomain = (domainId: string) => {
    navigate(`/profile/${userId}/governance/domains?domain=${domainId}`);
  };

  return (
    <div className="animate-fade-in">
      {hasUserRoles && (
        <div className="mb-6">
          <div className="teams-card">
            <div className="flex items-center text-teams-text mb-4">
              <Shield size={20} className="mr-2 text-teams-accent" />
              <h2 className="text-lg font-semibold">{user?.name}'s Governance Roles</h2>
            </div>
            
            {userDomains.length > 0 && (
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between text-teams-secondarytext mb-2 cursor-pointer p-2 hover:bg-teams-lightgray rounded-md"
                  onClick={() => toggleUserRole('domains')}
                >
                  <div className="flex items-center">
                    <Globe size={16} className="mr-2" />
                    <span className="text-sm font-medium">Domain Steward</span>
                  </div>
                  {expandedUserRoles === 'domains' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                
                {expandedUserRoles === 'domains' && (
                  <div className="space-y-2 animate-slide-in pl-6">
                    {userDomains.map(domain => (
                      <div 
                        key={domain.id} 
                        className="flex items-center justify-between p-2 bg-teams-darkgray rounded-md hover:bg-teams-gray cursor-pointer"
                        onClick={() => navigateToDomain(domain.id)}
                      >
                        <div className="flex items-center">
                          <Globe size={16} className="mr-2 text-teams-accent" />
                          <div>
                            <p className="font-medium">{domain.name}</p>
                            <p className="text-xs text-teams-secondarytext">{domain.description}</p>
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <ArrowRight size={16} className="text-teams-secondarytext hover:text-teams-text" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View domain details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {userSubdomains.length > 0 && (
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between text-teams-secondarytext mb-2 cursor-pointer p-2 hover:bg-teams-lightgray rounded-md"
                  onClick={() => toggleUserRole('subdomains')}
                >
                  <div className="flex items-center">
                    <FolderTree size={16} className="mr-2" />
                    <span className="text-sm font-medium">Subdomain Steward</span>
                  </div>
                  {expandedUserRoles === 'subdomains' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                
                {expandedUserRoles === 'subdomains' && (
                  <div className="space-y-2 animate-slide-in pl-6">
                    {userSubdomains.map(subdomain => (
                      <div 
                        key={subdomain.id} 
                        className="flex items-center justify-between p-2 bg-teams-darkgray rounded-md hover:bg-teams-gray cursor-pointer"
                        onClick={() => navigateToDomain(subdomain.parentDomainId)}
                      >
                        <div className="flex items-center">
                          <FolderTree size={16} className="mr-2 text-teams-accent" />
                          <div>
                            <p className="font-medium">{subdomain.name}</p>
                            <p className="text-xs text-teams-secondarytext">Part of {subdomain.parentDomain}</p>
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <ArrowRight size={16} className="text-teams-secondarytext hover:text-teams-text" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View subdomain details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {userSystems.length > 0 && (
              <div>
                <div 
                  className="flex items-center justify-between text-teams-secondarytext mb-2 cursor-pointer p-2 hover:bg-teams-lightgray rounded-md"
                  onClick={() => toggleUserRole('systems')}
                >
                  <div className="flex items-center">
                    <Database size={16} className="mr-2" />
                    <span className="text-sm font-medium">System Owner</span>
                  </div>
                  {expandedUserRoles === 'systems' ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                
                {expandedUserRoles === 'systems' && (
                  <div className="space-y-2 animate-slide-in pl-6">
                    {userSystems.map(system => (
                      <div 
                        key={system.id} 
                        className="flex items-center justify-between p-2 bg-teams-darkgray rounded-md hover:bg-teams-gray cursor-pointer"
                        onClick={() => navigateToSystem(system.id)}
                      >
                        <div className="flex items-center">
                          <Database size={16} className="mr-2 text-teams-accent" />
                          <div>
                            <p className="font-medium">{system.name}</p>
                            <p className="text-xs text-teams-secondarytext">{system.department}</p>
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <ArrowRight size={16} className="text-teams-secondarytext hover:text-teams-text" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View system details</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Data Governance Roles</h2>
        <p className="text-teams-secondarytext text-sm mb-4">
          Learn about the different data governance roles and their responsibilities in the organization.
        </p>
        
        <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default Roles;
