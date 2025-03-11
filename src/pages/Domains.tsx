
import React, { useState } from 'react';
import { Globe, ChevronDown, ChevronRight, Database, FolderTree } from 'lucide-react';
import AvatarStatus from '@/components/AvatarStatus';
import { dataDomains } from '@/data/mockData';

const Domains = () => {
  const [expandedDomains, setExpandedDomains] = useState<string[]>([]);

  const toggleDomain = (domainId: string) => {
    setExpandedDomains(prev => 
      prev.includes(domainId) 
        ? prev.filter(id => id !== domainId)
        : [...prev, domainId]
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="teams-card">
        <div className="flex items-center text-teams-text mb-4">
          <Globe size={20} className="mr-2" />
          <h2 className="text-lg font-semibold">Data Domains</h2>
        </div>
        
        <div className="space-y-4">
          {dataDomains.map((domain) => (
            <div key={domain.id} className="border border-teams-border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-teams-darkgray cursor-pointer hover:bg-teams-gray"
                onClick={() => toggleDomain(domain.id)}
              >
                <div className="flex items-center">
                  <Globe size={16} className="mr-3 text-teams-secondarytext" />
                  <div>
                    <span className="font-medium">{domain.name}</span>
                    <p className="text-xs text-teams-secondarytext">{domain.description}</p>
                  </div>
                </div>
                {expandedDomains.includes(domain.id) ? 
                  <ChevronDown size={18} /> : 
                  <ChevronRight size={18} />
                }
              </div>
              
              {expandedDomains.includes(domain.id) && (
                <div className="animate-slide-in">
                  <div className="p-3 bg-teams-gray border-t border-teams-border">
                    {/* Domain Stewards */}
                    <div className="mb-4">
                      <div className="flex items-center text-teams-secondarytext mb-2">
                        <Database size={16} className="mr-2" />
                        <span className="text-sm font-medium">Domain Stewards</span>
                      </div>
                      
                      <div className="space-y-2 mt-2">
                        {domain.stewards.map((steward) => (
                          <div key={steward.id} className="flex items-center p-2 rounded-md hover:bg-teams-lightgray">
                            <AvatarStatus 
                              avatarUrl={steward.avatarUrl} 
                              status={steward.status as 'available' | 'away' | 'busy' | 'offline'} 
                              size="small" 
                            />
                            <div className="ml-3 flex-1">
                              <p className="font-medium text-sm">{steward.name}</p>
                              <p className="text-xs text-teams-secondarytext">{steward.title}</p>
                            </div>
                            <div className="flex items-center px-2 py-1 bg-teams-lightgray rounded text-xs">
                              <Globe size={12} className="mr-1 text-teams-accent" />
                              {steward.role}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Subdomains */}
                    {domain.subdomains.length > 0 && (
                      <div>
                        <div className="flex items-center text-teams-secondarytext mb-2">
                          <FolderTree size={16} className="mr-2" />
                          <span className="text-sm font-medium">Subdomains</span>
                        </div>
                        
                        <div className="space-y-2 mt-2">
                          {domain.subdomains.map((subdomain) => (
                            <div key={subdomain.id} className="border border-teams-border rounded-md overflow-hidden">
                              <div className="p-2 bg-teams-lightgray">
                                <span className="text-sm font-medium">{subdomain.name}</span>
                              </div>
                              
                              <div className="bg-teams-gray p-2">
                                <div className="text-xs text-teams-secondarytext mb-1">Stewards</div>
                                {subdomain.stewards.map((steward) => (
                                  <div key={steward.id} className="flex items-center p-2 rounded-md hover:bg-teams-lightgray">
                                    <AvatarStatus 
                                      avatarUrl={steward.avatarUrl} 
                                      status={steward.status as 'available' | 'away' | 'busy' | 'offline'} 
                                      size="small" 
                                    />
                                    <div className="ml-3 flex-1">
                                      <p className="font-medium text-sm">{steward.name}</p>
                                      <p className="text-xs text-teams-secondarytext">{steward.title}</p>
                                    </div>
                                    <div className="flex items-center px-2 py-1 bg-teams-darkgray rounded text-xs">
                                      <FolderTree size={12} className="mr-1 text-teams-accent" />
                                      {steward.role}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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

export default Domains;
