import React from 'react';

import { useTheme } from 'styled-components';

import * as Styled from './styles';
import MenuToggle from './MenuToggle';
import useAuth from '../../hooks/useAuth';

const Menu: React.FC = () => {
  const { colors } = useTheme();
  const { signOut } = useAuth();

  return (
    <Styled.Container>
      <MenuToggle />
    </Styled.Container>
  );
};

export default Menu;
