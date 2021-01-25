import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import Button from '../../components/Button';

import * as Styled from './styles';

import Card from './Card';

interface City {
  id: string;
  name: string;
  locals: number;
  image: string;
}

const Dashboard: React.FC = () => {
  const { colors } = useTheme();
  const headerRef = useRef(null);

  const [cities, setCities] = useState<City[] | null>(null);

  useEffect(() => {
    setCities([
      {
        id: '1',
        name: 'Águas Mornas',
        locals: 13,
        image:
          'https://hweb-upload.s3-sa-east-1.amazonaws.com/587fc4cec19a4713c4c007d7/af3c29b0b50a4a6aa134f44946ca0ffc.jpg',
      },
      {
        id: '15',
        name: 'Bombinhas',
        locals: 21,
        image:
          'https://hweb-upload.s3-sa-east-1.amazonaws.com/587fc4cec19a4713c4c007d7/af3c29b0b50a4a6aa134f44946ca0ffc.jpg',
      },
      {
        id: '14',
        name: 'Blumenau',
        locals: 22,
        image:
          'https://hweb-upload.s3-sa-east-1.amazonaws.com/587fc4cec19a4713c4c007d7/af3c29b0b50a4a6aa134f44946ca0ffc.jpg',
      },
      {
        id: '13',
        name: 'Florianópolis',
        locals: 98,
        image:
          'https://hweb-upload.s3-sa-east-1.amazonaws.com/587fc4cec19a4713c4c007d7/af3c29b0b50a4a6aa134f44946ca0ffc.jpg',
      },
      {
        id: '12',
        name: 'Imbituba',
        locals: 61,
        image:
          'https://hweb-upload.s3-sa-east-1.amazonaws.com/587fc4cec19a4713c4c007d7/af3c29b0b50a4a6aa134f44946ca0ffc.jpg',
      },
    ]);
  }, []);

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
