import React from 'react';
import useAuth from '../../hooks/useAuth';

import Container from '../../styles/Container';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <h1>DASHBOARD</h1>
      <button type="button" onClick={signOut}>
        LOGOUT
      </button>
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>{' '}
      <h1>DASHBOARD</h1> <h1>DASHBOARD</h1> <h1>DASHBOARD</h1>
    </Container>
  );
};

export default Dashboard;
