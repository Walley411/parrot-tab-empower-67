import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, ChevronRight, Database, Users, Laptop, Shield, Network, TrendingUp, Workflow, MessageCircle, GitBranch } from 'lucide-react';
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
    relatedProjects: ['Digital Transformation', 'Finance Modernization'],
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
    relatedProjects: ['Workplace Modernization', 'Remote Work Initiative'],
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
    relatedProjects: ['Customer 360', 'Sales Enablement'],
    dataOwners: [
      {
        id: '1001',
        name: 'Blair Dumbell',
        title: 'PCS External Contractor',
        role: 'Data Owner',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767798-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
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
    relatedProjects: ['IT Modernization', 'Self-Service Portal'],
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
    relatedProjects: ['HR Uplift Strategy 2025', 'Employee Experience'],
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

// Mock data flow for overview
const dataFlowRelations = [
  { source: "SAP ERP", target: "Microsoft 365", description: "Customer data synchronization" },
  { source: "SAP ERP", target: "Salesforce", description: "Order and invoice data" },
  { source: "Salesforce", target: "ServiceNow", description: "Support ticket creation" },
  { source: "Workday", target: "SAP ERP", description: "Employee time records" },
  { source: "Microsoft 365", target: "Workday", description: "Document approvals" },
  { source: "ServiceNow", target: "Microsoft 365", description: "Notification emails" },
];

// Mock data insights
const systemInsights = [
  {
    id: "1",
    title: "Data Quality",
    current: "72% of critical data fields meet quality standards",
    future: "Target 95% data quality for all critical fields by Q4",
    icon: <TrendingUp size={16} className="text-green-500" />
  },
  {
    id: "2",
    title: "System Integration",
    current: "Manual intervention required for 30% of data transfers",
    future: "Implement API-driven integration to reduce manual steps to 5%",
    icon: <Network size={16} className="text-amber-500" />
  },
  {
    id: "3",
    title: "Data Governance",
    current: "60% of data domains have assigned owners",
    future: "Complete ownership assignment and implement governance tools",
    icon: <Shield size={16} className="text-blue-500" />
  },
  {
    id: "4",
    title: "System Architecture",
    current: "Legacy systems cause data silos in 3 departments",
    future: "Migrate to cloud-based architecture with unified data lake",
    icon: <Database size={16} className="text-purple-500" />
  },
  {
    id: "5",
    title: "Process Automation",
    current: "25% of data workflows are fully automated",
    future: "Increase automation to 75% of all routine data processes",
    icon: <Workflow size={16} className="text-indigo-500" />
  }
];

// Mock user feedback data
const userFeedback = [
  {
    id: '1',
    system: 'SAP ERP',
    user: {
      name: 'Jamie Edwards',
      department: 'Finance',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    date: '2023-06-15',
    rating: 4,
    comment: 'The system is working well for financial reporting, but we need better integration with our budgeting tools.',
    status: 'Under Review'
  },
  {
    id: '2',
    system: 'Microsoft 365',
    user: {
      name: 'Jordan Smith',
      department: 'Marketing',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    date: '2023-07-22',
    rating: 5,
    comment: 'The new Teams integration has significantly improved our collaboration across departments.',
    status: 'Acknowledged'
  },
  {
    id: '3',
    system: 'Salesforce',
    user: {
      name: 'Alex Rivera',
      department: 'Sales',
      avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    date: '2023-08-05',
    rating: 3,
    comment: 'We need better mobile access to customer data when in the field. Current app is too slow.',
    status: 'In Progress'
  },
  {
    id: '4',
    system: 'ServiceNow',
    user: {
      name: 'Taylor Wong',
      department: 'IT Support',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    date: '2023-09-12',
    rating: 4,
    comment: 'Ticket routing has improved but we still need better knowledge base integration.',
    status: 'Planned'
  },
  {
    id: '5',
    system: 'Workday',
    user: {
      name: 'Morgan Chen',
      department: 'Human Resources',
      avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    },
    date: '2023-10-03',
    rating: 5,
    comment: 'The new performance review module has streamlined our annual review process significantly.',
    status: 'Implemented'
  }
];

const Sources = () => {
  const [expandedSoftware, setExpandedSoftware] = useState<string[]>([]);
  const [filteredSoftware, setFilteredSoftware] = useState(enterpriseSoftware);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [expandedInsights, setExpandedInsights] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'systems', 'insights', or 'feedback'

  const toggleSoftware = (softwareId: string) => {
    setExpandedSoftware(prev => 
      prev.includes(softwareId) 
        ? prev.filter(id => id !== softwareId)
        : [...prev, softwareId]
    );
  };

  const toggleInsight = (insightId: string) => {
    setExpandedInsights(prev => 
      prev.includes(insightId) 
        ? prev.filter(id => id !== insightId)
        : [...prev, insightId]
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

  // Get data flows for a specific system
  const getSystemDataFlows = (systemName: string) => {
    // Get flows where this system is either the source or target
    return dataFlowRelations.filter(flow => 
      flow.source === systemName || flow.target === systemName
    );
  };

  // Get feedback for a specific system
  const getFeedbackForSystem = (systemName: string) => {
    return userFeedback.filter(feedback => feedback.system === systemName);
  };

  useEffect(() => {
    let result = [...enterpriseSoftware];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(software => 
        software.name.toLowerCase().includes(query) ||
        software.description.toLowerCase().includes(query) ||
        software.dataOwners.some(owner => owner.name.toLowerCase().includes(query)) ||
        software.relatedProjects.some(project => project.toLowerCase().includes(query))
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

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <div key={star} className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}>★</div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex border-b border-teams-border mb-4">
        <button
          className={`flex items-center px-4 py-2 ${activeTab === 'overview' ? 'text-teams-accent border-b-2 border-teams-accent' : 'text-teams-secondarytext hover:text-teams-text'}`}
          onClick={() => setActiveTab('overview')}
        >
          <Network size={16} className="mr-2" />
          Overview
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === 'systems' ? 'text-teams-accent border-b-2 border-teams-accent' : 'text-teams-secondarytext hover:text-teams-text'}`}
          onClick={() => setActiveTab('systems')}
        >
          <Database size={16} className="mr-2" />
          Systems
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === 'insights' ? 'text-teams-accent border-b-2 border-teams-accent' : 'text-teams-secondarytext hover:text-teams-text'}`}
          onClick={() => setActiveTab('insights')}
        >
          <TrendingUp size={16} className="mr-2" />
          Insights
        </button>
        <button
          className={`flex items-center px-4 py-2 ${activeTab === 'feedback' ? 'text-teams-accent border-b-2 border-teams-accent' : 'text-teams-secondarytext hover:text-teams-text'}`}
          onClick={() => setActiveTab('feedback')}
        >
          <MessageCircle size={16} className="mr-2" />
          User Feedback
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="animate-fade-in">
          <p className="text-teams-secondarytext text-sm mb-4">
            This overview shows how data flows between different enterprise systems. Each connection represents data exchange between systems.
          </p>
          
          <div className="bg-teams-darkgray p-4 rounded-md border border-teams-border mb-4">
            <h3 className="font-medium text-teams-text mb-3 flex items-center">
              <Workflow size={16} className="mr-2 text-teams-accent" />
              System Data Flow
            </h3>
            
            {/* Simple visual representation of data flow */}
            <div className="grid gap-2">
              {dataFlowRelations.map((relation, index) => (
                <div key={index} className="bg-teams-gray p-3 rounded-md border border-teams-border">
                  <div className="flex items-center text-teams-text">
                    <div className="bg-teams-lightgray px-2 py-1 rounded-md flex items-center">
                      <Database size={14} className="mr-1 text-teams-secondarytext" />
                      <span className="text-sm font-medium">{relation.source}</span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center text-teams-secondarytext mx-2">
                      <div className="h-0.5 bg-teams-border flex-1"></div>
                      <ChevronRight size={16} className="mx-1" />
                      <div className="h-0.5 bg-teams-border flex-1"></div>
                    </div>
                    
                    <div className="bg-teams-lightgray px-2 py-1 rounded-md flex items-center">
                      <Database size={14} className="mr-1 text-teams-secondarytext" />
                      <span className="text-sm font-medium">{relation.target}</span>
                    </div>
                  </div>
                  <p className="text-xs text-teams-secondarytext mt-2 text-center">
                    {relation.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-teams-darkgray p-4 rounded-md border border-teams-border">
            <h3 className="font-medium text-teams-text mb-3 flex items-center">
              <Database size={16} className="mr-2 text-teams-accent" />
              Systems Summary
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(softwareByCategory).map(([category, softwares]) => (
                <div key={category} className="bg-teams-gray p-3 rounded-md border border-teams-border">
                  <h4 className="text-sm font-medium text-teams-text mb-2 flex items-center">
                    <Laptop size={14} className="mr-2 text-teams-secondarytext" />
                    {category} ({softwares.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {softwares.map(software => (
                      <div key={software.id} className="bg-teams-lightgray px-2 py-1.5 rounded text-sm">
                        {software.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
                            {/* Related Projects Section */}
                            <div className="mb-4">
                              <div className="flex items-center text-teams-secondarytext mb-2">
                                <GitBranch size={16} className="mr-2" />
                                <span className="text-sm font-medium">Related Projects</span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {software.relatedProjects.map((project, index) => (
                                  <div key={index} className="bg-teams-lightgray text-xs px-3 py-1 rounded-full flex items-center">
                                    <span>{project}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Data Flow Section */}
                            {getSystemDataFlows(software.name).length > 0 && (
                              <div className="mb-4">
                                <div className="flex items-center text-teams-secondarytext mb-2">
                                  <Workflow size={16} className="mr-2" />
                                  <span className="text-sm font-medium">Data Flows</span>
                                </div>
                                <div className="space-y-2 mt-2">
                                  {getSystemDataFlows(software.name).map((flow, index) => (
                                    <div key={index} className="bg-teams-lightgray p-2 rounded-md border border-teams-border">
                                      <div className="flex items-center text-teams-text">
                                        <div className={`px-2 py-1 rounded-md flex items-center ${flow.source === software.name ? 'bg-teams-darkgray font-medium' : ''}`}>
                                          <Database size={14} className="mr-1 text-teams-secondarytext" />
                                          <span className="text-sm">{flow.source}</span>
                                        </div>
                                        
                                        <div className="flex-1 flex items-center justify-center text-teams-secondarytext mx-2">
                                          <div className="h-0.5 bg-teams-border flex-1"></div>
                                          <ChevronRight size={14} className="mx-1" />
                                          <div className="h-0.5 bg-teams-border flex-1"></div>
                                        </div>
                                        
                                        <div className={`px-2 py-1 rounded-md flex items-center ${flow.target === software.name ? 'bg-teams-darkgray font-medium' : ''}`}>
                                          <Database size={14} className="mr-1 text-teams-secondarytext" />
                                          <span className="text-sm">{flow.target}</span>
                                        </div>
                                      </div>
                                      <p className="text-xs text-teams-secondarytext mt-2 text-center">
                                        {flow.description}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* User Feedback Section */}
                            {getFeedbackForSystem(software.name).length > 0 && (
                              <div className="mb-4">
                                <div className="flex items-center text-teams-secondarytext mb-2">
                                  <MessageCircle size={16} className="mr-2" />
                                  <span className="text-sm font-medium">User Feedback</span>
                                </div>
                                <div className="space-y-2 mt-2">
                                  {getFeedbackForSystem(software.name).map(feedback => (
                                    <div key={feedback.id} className="bg-teams-lightgray p-2 rounded-md border border-teams-border">
                                      <div className="flex items-start">
                                        <img 
                                          src={feedback.user.avatarUrl} 
                                          alt={feedback.user.name} 
                                          className="w-6 h-6 rounded-full mr-2"
                                        />
                                        <div>
                                          <div className="flex items-center">
                                            <p className="text-xs font-medium">{feedback.user.name}</p>
                                            <div className="ml-2 flex">
                                              {renderStars(feedback.rating)}
                                            </div>
                                          </div>
                                          <p className="text-xs text-teams-secondarytext">{feedback.user.department} • {feedback.date}</p>
                                          <p className="text-xs mt-1">{feedback.comment}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Data Governance Section */}
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

      {activeTab === 'insights' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-teams-secondarytext text-sm mb-4">
            System insights provide an overview of the current state and future plans for enterprise systems and data governance.
          </p>
          
          {systemInsights.map(insight => (
            <div key={insight.id} className="border border-teams-border rounded-md overflow-hidden">
              <div 
                className="flex items-center justify-between p-3 bg-teams-darkgray cursor-pointer hover:bg-teams-gray"
                onClick={() => toggleInsight(insight.id)}
              >
                <div className="flex items-center">
                  {insight.icon}
                  <span className="font-medium ml-2">{insight.title}</span>
                </div>
                {expandedInsights.includes(insight.id) ? 
                  <ChevronDown size={18} /> : 
                  <ChevronRight size={18} />
                }
              </div>
              
              {expandedInsights.includes(insight.id) && (
                <div className="animate-slide-in">
                  <div className="p-4 bg-teams-gray border-t border-teams-border">
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-teams-secondarytext mb-1">Current State:</h4>
                      <p className="text-teams-text">{insight.current}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-teams-secondarytext mb-1">Future State:</h4>
                      <p className="text-teams-text">{insight.future}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-teams-secondarytext text-sm mb-4">
            User feedback helps us understand how systems are performing and identify areas for improvement.
          </p>
          
          {userFeedback.map(feedback => (
            <div key={feedback.id} className="border border-teams-border rounded-md overflow-hidden">
              <div className="p-3 bg-teams-darkgray">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Database size={16} className="mr-2 text-teams-secondarytext" />
                    <span className="font-medium">{feedback.system}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(feedback.rating)}
                    <div className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      feedback.status === 'Implemented' ? 'bg-green-100 text-green-800' :
                      feedback.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      feedback.status === 'Planned' ? 'bg-purple-100 text-purple-800' :
                      feedback.status === 'Under Review' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {feedback.status}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-teams-gray border-t border-teams-border">
                <div className="flex items-start mb-3">
                  <img 
                    src={feedback.user.avatarUrl} 
                    alt={feedback.user.name} 
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium">{feedback.user.name}</p>
                    <p className="text-xs text-teams-secondarytext">{feedback.user.department} • {feedback.date}</p>
                  </div>
                </div>
                
                <p className="text-teams-text text-sm">{feedback.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sources;
