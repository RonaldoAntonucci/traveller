import styled from 'styled-components';

export const Container = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 16px;
  font-weight: bold;
  font-family: 'Heebo';
  font-size: 1.8rem;

  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.white};
`;
