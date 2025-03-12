
import React, { useState } from 'react';
import { UserCog, ChevronDown, ChevronRight, Shield } from 'lucide-react';

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

const Roles = () => {
  const [expandedRoles, setExpandedRoles] = useState<string[]>([]);

  const toggleRole = (roleId: string) => {
    setExpandedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  return (
    <div>
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
  );
};

export default Roles;
