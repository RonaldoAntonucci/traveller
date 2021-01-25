import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
  flex-direction: column;

  top: 0;

  position: sticky;

  button {
    border: 0;
    background: none;
    padding: 16px;
  }

  @media (min-width: 768px) {
    height: 100vh;
    width: fit-content;
    padding: 40px 0;

    left: 0;
  }
`;
