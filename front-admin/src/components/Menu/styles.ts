import styled from 'styled-components';

import LogoSVG from '../../assets/logo.svg';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: 0;
    background: none;
    padding: 16px;
  }
`;

export const Logo = styled.img.attrs(() => ({
  src: LogoSVG,
  alt: 'Traveller',
}))`
  height: 40px;
`;
