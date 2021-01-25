import React from 'react';

import * as Styled from './styles';
import MenuToggle from './MenuToggle';

const Menu: React.FC = () => {
  return (
    <Styled.Container>
      <MenuToggle />
    </Styled.Container>
  );
};

export default Menu;
