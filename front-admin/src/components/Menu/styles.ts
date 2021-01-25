import styled from 'styled-components';
import appearFromLeft from '../../styles/appearFromLeft';
import appearFromTop from '../../styles/appearFromTop';

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

  animation: ${appearFromTop(100)} 1.5s;

  @media (min-width: 768px) {
    animation: ${appearFromLeft(100)} 1.5s;

    height: 100vh;
    width: fit-content;
    padding: 40px 0;

    left: 0;
    position: fixed;
  }
`;
