import styled, { css } from 'styled-components';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  height: 62px;

  nav {
    display: ${(props) => (props.show ? 'block' : 'none')};
  }

  ul {
    list-style: none;
  }

  span {
    color: ${(props) => props.theme.colors.white};
    font-weight: bold;
    margin-left: 16px;
    font-size: 1.8rem;
  }

  li button {
    border: 2px solid ${(props) => props.theme.colors.white};
    border-radius: 16px;
    padding: 16px;

    font-size: 3rem;
    line-height: 4rem;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li + li {
    margin-top: 16px;
  }

  nav {
    display: ${(props) => (props.show ? 'flex' : 'none')};
  }

  ${(props) =>
    props.show &&
    css`
      position: absolute;
      top: 0;
      left: 0;

      width: 100vw;
      height: 100vh;

      z-index: 2;

      background-color: ${props.theme.colors.primary};

      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
    `}
`;

export const ToggleButton = styled.button<ContainerProps>`
  display: block;
  position: absolute;
  left: 0;
  top: 0;

  transition-duration: 0.3s;
`;
