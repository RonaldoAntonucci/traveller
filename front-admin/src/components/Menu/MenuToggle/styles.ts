import styled, { css } from 'styled-components';

import LogoSVG from '../../../assets/logo.svg';
import appearFromTop from '../../../styles/appearFromTop';

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  height: 62px;

  nav {
    display: ${(props) => (props.show ? 'block' : 'none')};
    //animation: ${appearFromTop(250)} 2s;
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

  @media(min-width: 768px) {
    height: 100%;

    nav {
      display: block;
      height: 100%;
    }

    span {
      display: none;
    }

    li button {
      border: 0;
    }

    li + li {
      :hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    ul {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;

      li:first-child {
        margin-bottom: auto;
      }

      li:last-child {
        margin-top: auto;
      }
    }
  }
`;

export const ToggleButton = styled.button<ContainerProps>`
  display: block;
  position: absolute;
  left: 0;
  top: 0;

  transition-duration: 0.3s;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Logo = styled.img.attrs(() => ({
  src: LogoSVG,
  alt: 'Traveller',
}))`
  height: 56px;
  width: 100%;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;
