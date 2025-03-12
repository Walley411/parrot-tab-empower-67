
import React from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { Bird } from 'lucide-react';

const Parrot = () => {
  // Extract the userId from params to ensure proper navigation
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="animate-fade-in">
      <div className="teams-card mb-4">
        <div className="flex items-center text-teams-text mb-4">
          <Bird size={20} className="mr-2 text-teams-accent" />
          <h2 className="text-lg font-semibold">Parrot AI Assistant</h2>
        </div>
        <p className="text-teams-secondarytext mb-4">
          Explore and interact with the Parrot AI Assistant, view data sources, domains, and tell Parrot what you need.
        </p>
        <Outlet />
      </div>
    </div>
  );
};

export default Parrot;
