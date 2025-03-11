
import React, { PropsWithChildren } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  showBackButton?: boolean;
  showCloseButton?: boolean;
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ 
  children, 
  showBackButton = true,
  showCloseButton = true 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-teams-dark text-teams-text flex flex-col">
      <header className="flex justify-between items-center p-4 border-b border-teams-border">
        <div>
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)}
              className="p-2 text-teams-text hover:bg-teams-gray rounded-md transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
        </div>
        <div>
          {showCloseButton && (
            <button 
              onClick={() => navigate('/')}
              className="p-2 text-teams-text hover:bg-teams-gray rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
