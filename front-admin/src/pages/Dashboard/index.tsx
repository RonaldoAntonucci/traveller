import React from 'react';
import useAuth from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div>
      <h1>DASHBOARD</h1>
      <button type="button" onClick={signOut}>
        LOGOUT
      </button>
    </div>
  );
};

export default Dashboard;
