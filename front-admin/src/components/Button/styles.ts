import styled from 'styled-components';

export const Container = styled.button`
  border: 0;
  border-radius: 10px;
  padding: 16px;
  font-weight: bold;
  font-family: 'Heebo';
  font-size: 18px;

  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.white};
`;
