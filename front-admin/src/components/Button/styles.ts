import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 16px;
  font-weight: bold;
  font-family: 'Heebo';
  font-size: 1.8rem;

  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.white};

  :hover {
    background-color: ${(props) => props.color && darken(0.1, props.color)};
  }
`;
