import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import Button from '../../components/Button';

import * as Styled from './styles';

import Card from './Card';
import useCities from '../../hooks/useCities';

interface City {
  id: string;
  name: string;
  locals: number;
  image: string;
}

const Dashboard: React.FC = () => {
  const { colors } = useTheme();
  const headerRef = useRef(null);

  const { cities, loadCities } = useCities();

  useEffect(() => {
    loadCities();
  }, [loadCities]);

  return (
    <Styled.Container>
      <Styled.Header ref={headerRef}>
        <h1>Cidades</h1>
        <Button color={colors.check}>+ Adicionar um perfil</Button>
      </Styled.Header>
      <Styled.Section>
        {cities?.map((city) => (
          <Card
            key={city.id}
            name={city.name}
            image={city.image}
            locals={city.locals}
          />
        ))}
      </Styled.Section>
    </Styled.Container>
  );
};

export default Dashboard;
