import React from 'react';
import { FiTrash, FiEdit3 } from 'react-icons/fi';
import { useTheme } from 'styled-components';

import * as Styled from './styles';

interface CardProps {
  name: string;
  locals: number;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, image, locals }) => {
  const { colors } = useTheme();

  return (
    <Styled.Container>
      <Styled.ImageContainer>
        <img src={image} alt={name} />
      </Styled.ImageContainer>
      <Styled.Content>
        <strong>{name} </strong>
        <span>{locals} locais</span>
      </Styled.Content>
      <Styled.Buttons>
        <button type="button">
          <FiEdit3 size={24} color={colors.span} />
        </button>
        <button type="button">
          <FiTrash size={24} color={colors.span} />
        </button>
      </Styled.Buttons>
    </Styled.Container>
  );
};

export default Card;
