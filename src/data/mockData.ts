// User data
export const users = [
  {
    id: '1',
    name: 'Dominic Rebello',
    title: 'PCS External Contractor',
    department: 'PCS External Contractors',
    email: 'dominic.rebello@powerlink.com',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'available',
    company: 'Randstad',
    location: 'Virginia',
    workHours: '8:00 AM - 5:00 PM',
    managers: [
      {
        id: '10',
        name: 'Joziah Daley',
        title: 'Portfolio Manager',
        department: 'People and Corporate Services',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'away'
      }
    ]
  },
  {
    id: '2',
    name: 'Joziah Daley',
    title: 'Portfolio Manager',
    department: 'People and Corporate Services',
    email: 'joziah.daley@powerlink.com',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
    status: 'away',
    company: 'Powerlink',
    location: 'Brisbane',
    workHours: '9:00 AM - 5:00 PM',
    managers: [
      {
        id: '11',
        name: 'Brendon Kirby',
        title: 'Program Portfolio Director',
        department: 'People and Corporate Services',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'available'
      }
    ]
  }
];

// Departments data
export const departments = [
  {
    id: '1',
    name: 'Information Technology',
    systems: [
      {
        id: '101',
        name: 'ERP System',
        owners: [
          {
            id: '1001',
            name: 'Blair Dumbell',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'available'
          },
          {
            id: '1002',
            name: 'Kyle Donnison',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'away'
          }
        ]
      },
      {
        id: '102',
        name: 'CRM System',
        owners: [
          {
            id: '1003',
            name: 'Nigel Stewart',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'busy'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Finance',
    systems: [
      {
        id: '201',
        name: 'Accounting System',
        owners: [
          {
            id: '2001',
            name: 'Matthew Peppin',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'available'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Human Resources',
    systems: [
      {
        id: '301',
        name: 'HRIS',
        owners: [
          {
            id: '3001',
            name: 'Liezel Pieters',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'away'
          }
        ]
      },
      {
        id: '302',
        name: 'Onboarding System',
        owners: [
          {
            id: '3002',
            name: 'Ghia Assanova',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'available'
          },
          {
            id: '3003',
            name: 'Roselle Abano',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'available'
          }
        ]
      }
    ]
  }
];

// Data domains
export const dataDomains = [
  {
    id: '1',
    name: 'Customer Data',
    description: 'Personal and account information of customers',
    stewards: [
      {
        id: '2',
        name: 'Joziah Daley',
        title: 'Portfolio Manager',
        department: 'People and Corporate Services',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'away',
        role: 'Domain Steward'
      }
    ],
    subdomains: [
      {
        id: '1-1',
        name: 'Personal Information',
        stewards: [
          {
            id: '3001',
            name: 'Liezel Pieters',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'away',
            role: 'Subdomain Steward'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Account Information',
        stewards: [
          {
            id: '3002',
            name: 'Ghia Assanova',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'available',
            role: 'Subdomain Steward'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Product Data',
    description: 'Information about products and services',
    stewards: [
      {
        id: '1',
        name: 'Dominic Rebello',
        title: 'PCS External Contractor',
        department: 'PCS External Contractors',
        avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'available',
        role: 'Domain Steward'
      }
    ],
    subdomains: [
      {
        id: '2-1',
        name: 'Product Specifications',
        stewards: [
          {
            id: '1001',
            name: 'Blair Dumbell',
            title: 'PCS External Contractor',
            avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
            status: 'available',
            role: 'Subdomain Steward'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Financial Data',
    description: 'Revenue, cost, and financial transaction data',
    stewards: [
      {
        id: '2001',
        name: 'Matthew Peppin',
        title: 'PCS External Contractor',
        avatarUrl: 'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        status: 'available',
        role: 'Domain Steward'
      }
    ],
    subdomains: []
  }
];
