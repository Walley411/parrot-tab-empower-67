
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MessageSquare, 
  PenSquare, 
  Languages, 
  Thermometer, 
  Code, 
  Shield, 
  Send, 
  Calendar,
  MoreHorizontal, 
  AlertCircle
} from 'lucide-react';
import { departments, dataDomains } from '@/data/mockData';

const Copilot = () => {
  const { userId } = useParams<{ userId: string }>();
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set current date in format "Month Year"
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  }, []);

  const copilotSuggestions = [
    {
      id: '1',
      icon: <PenSquare size={18} className="text-blue-400" />,
      title: 'Stand out on socials',
      description: 'What are some tips for writing a great LinkedIn post?'
    },
    {
      id: '2',
      icon: <Calendar size={18} className="text-blue-400" />,
      title: 'Going on holiday?',
      description: 'Write some funny Out of Office email responses to use while I\'m on vacation from [March 8-15]'
    },
    {
      id: '3',
      icon: <Languages size={18} className="text-blue-400" />,
      title: 'Highlight the differences',
      description: 'Compare these files grouped by differences in formatting, structure, and content: [attach files]'
    },
    {
      id: '4',
      icon: <AlertCircle size={18} className="text-blue-400" />,
      title: 'Interview warning signs',
      description: 'What are some red flags to watch out for during an interview?'
    },
    {
      id: '5',
      icon: <Code size={18} className="text-blue-400" />,
      title: 'Code faster',
      description: 'Write a Python script to perform binary search'
    },
    {
      id: '6',
      icon: <Thermometer size={18} className="text-blue-400" />,
      title: 'Gauge the temperature',
      description: 'Give me a concise summary of recent news about [product or company]'
    }
  ];

  const governanceQueries = [
    {
      id: 'g1',
      text: 'What is data governance?',
      response: 'Data governance is the process of managing the availability, usability, integrity, and security of the data in enterprise systems. It includes the policies, procedures, and standards that ensure data is managed properly throughout the organization.'
    },
    {
      id: 'g2',
      text: 'Show me data domains',
      response: `Here are the main data domains:\n\n${dataDomains.map(domain => `• ${domain.name}: ${domain.description}`).join('\n\n')}`
    },
    {
      id: 'g3',
      text: 'List key governance roles',
      response: 'The key data governance roles include:\n\n• Data Owner: Accountable for the quality and security of data assets\n• Data Steward: Responsible for day-to-day management of data\n• System Owner: Manages systems that house the data\n• Data Protection Officer: Ensures compliance with privacy regulations\n• Data Governance Council: Establishes governance policies'
    },
    {
      id: 'g4',
      text: 'Which departments have data systems?',
      response: `These departments have data systems:\n\n${departments.map(dept => `• ${dept.name}: ${dept.systems.map(sys => sys.name).join(', ')}`).join('\n\n')}`
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to chat
    setChatMessages(prev => [...prev, `User: ${inputValue}`]);

    // Find if there's a matching governance query
    const matchingQuery = governanceQueries.find(query => 
      inputValue.toLowerCase().includes(query.text.toLowerCase())
    );

    // Add response after a small delay to simulate thinking
    setTimeout(() => {
      if (matchingQuery) {
        setChatMessages(prev => [...prev, `Copilot: ${matchingQuery.response}`]);
      } else {
        setChatMessages(prev => [
          ...prev, 
          "Copilot: I don't have specific information about that. Would you like to know about data governance roles, domains, or systems?"
        ]);
      }
    }, 500);

    setInputValue('');
  };

  const handleSuggestionClick = (description: string) => {
    setInputValue(description);
    // Focus the input field
    const inputField = document.getElementById('chat-input');
    if (inputField) {
      inputField.focus();
    }
  };

  return (
    <div className="animate-fade-in min-h-screen bg-teams-dark text-teams-text">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 min-h-screen">
        {/* Main content area (3/4 width on desktop) */}
        <div className="md:col-span-3 flex flex-col h-full">
          {/* Copilot header */}
          <div className="flex items-center p-4 border-b border-teams-border">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded overflow-hidden mr-3">
                <img 
                  src="/lovable-uploads/3fc9562d-39f2-44e7-be75-5d224b1edaf6.png" 
                  alt="Copilot Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h1 className="text-xl font-semibold">Copilot</h1>
            </div>
          </div>
          
          {/* Suggestions grid */}
          {chatMessages.length === 0 && (
            <div className="p-8">
              <div className="flex justify-center mb-12">
                <div className="w-16 h-16 rounded overflow-hidden">
                  <img 
                    src="/lovable-uploads/3fc9562d-39f2-44e7-be75-5d224b1edaf6.png" 
                    alt="Copilot Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {copilotSuggestions.map(suggestion => (
                  <div 
                    key={suggestion.id}
                    className="bg-teams-darkgray border border-teams-border rounded-lg p-4 hover:bg-teams-gray cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(suggestion.description)}
                  >
                    <div className="flex items-start mb-2">
                      {suggestion.icon}
                    </div>
                    <h3 className="font-medium mb-2">{suggestion.title}</h3>
                    <p className="text-teams-secondarytext text-sm">{suggestion.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Try asking about data governance:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {governanceQueries.map(query => (
                    <div 
                      key={query.id}
                      className="bg-teams-darkgray border border-teams-border rounded-lg p-3 hover:bg-teams-gray cursor-pointer transition-colors"
                      onClick={() => handleSuggestionClick(query.text)}
                    >
                      <div className="flex items-center">
                        <Shield size={16} className="text-teams-accent mr-2" />
                        <p className="text-sm">{query.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Chat messages */}
          {chatMessages.length > 0 && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 mb-20">
              {chatMessages.map((message, index) => {
                const isUser = message.startsWith('User:');
                return (
                  <div 
                    key={index} 
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-3xl p-3 rounded-lg ${
                        isUser 
                          ? 'bg-teams-accent text-white' 
                          : 'bg-teams-darkgray'
                      }`}
                    >
                      <p className="whitespace-pre-line">
                        {isUser ? message.substring(6) : message.substring(9)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Chat input */}
          <div className="fixed bottom-0 left-0 right-0 md:right-1/4 bg-teams-dark border-t border-teams-border p-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                id="chat-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-teams-darkgray border border-teams-border rounded-md py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-teams-accent"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teams-accent hover:text-teams-accenthover"
              >
                <Send size={20} />
              </button>
            </form>
            <div className="flex justify-between mt-2 text-xs text-teams-secondarytext">
              <span>0 / 8000</span>
              <div className="flex space-x-2">
                <button className="p-1 hover:bg-teams-gray rounded">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar (1/4 width on desktop) */}
        <div className="hidden md:block bg-teams-darkgray border-l border-teams-border">
          <div className="p-4 border-b border-teams-border">
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2">
                <img 
                  src="/lovable-uploads/3fc9562d-39f2-44e7-be75-5d224b1edaf6.png" 
                  alt="Copilot Logo"
                  className="w-full h-full object-cover" 
                />
              </div>
              <h2 className="font-medium">Copilot</h2>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-sm font-medium mb-2">Chats</h3>
            
            <div className="mb-6">
              <button className="text-sm text-teams-secondarytext hover:text-teams-text mb-2 w-full text-left">
                Previous 30 Days
              </button>
              
              <div className="space-y-2">
                <button className="text-sm text-teams-secondarytext hover:text-teams-text w-full text-left truncate">
                  what is my pay?
                </button>
                <button className="text-sm text-teams-secondarytext hover:text-teams-text w-full text-left truncate">
                  need to make a form in MS to s
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">{currentDate}</h3>
              
              <div className="space-y-2">
                <button className="text-sm text-teams-secondarytext hover:text-teams-text w-full text-left truncate">
                  as I'm installing purview into
                </button>
                <button className="text-sm text-teams-secondarytext hover:text-teams-text w-full text-left truncate">
                  After a talk with David I woul
                </button>
                <button className="text-sm text-teams-secondarytext hover:text-teams-text w-full text-left truncate">
                  fix i'd like to share an impor
                </button>
              </div>
              
              <button className="text-sm text-blue-400 hover:text-blue-500 mt-4">
                See more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copilot;
