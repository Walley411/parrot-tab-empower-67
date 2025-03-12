
import React from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Governance = () => {
  // Extract the userId from params to ensure proper navigation
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="animate-fade-in">
      <div className="teams-card mb-4">
        <div className="flex items-center text-teams-text mb-4">
          <ShieldCheck size={20} className="mr-2 text-teams-accent" />
          <h2 className="text-lg font-semibold">Governance</h2>
        </div>
        <p className="text-teams-secondarytext mb-4">
          Explore and interact with MicoSquawk governance information, view systems, departments, and data domains.
        </p>
        <Outlet />
      </div>
    </div>
  );
};

export default Governance;
