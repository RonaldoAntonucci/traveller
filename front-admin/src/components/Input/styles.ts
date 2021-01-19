import styled from 'styled-components';

import Tooltip from './Tooltip';

interface ContainerProps {
  focused: boolean;
}

export const Container = styled.div<ContainerProps>`
  border: 1px solid
    ${(props) => (props.focused ? props.theme.colors.primary : '#dce2e6')};
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 24px;
  background-color: #fff;
  position: relative;

  label {
    font-size: 15px;
    font-family: 'Heebo';
    color: #a0acb2;
  }
`;

export const Input = styled.input`
  font-size: 18px;
  display: flex;
  flex: 1;
  border: none;
  background-color: transparent;
  color: #617480;

  &::placeholder {
    color: #a0acb3;
  }
`;

export const VisibleButton = styled.button`
  position: absolute;
  right: 32px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Error = styled(Tooltip)`
  position: absolute;
  left: -32px;

  svg {
    margin: 0;
  }

  span {
    background: ${(props) => props.theme.colors.error};
    color: #fff;

    &::before {
      border-color: ${(props) => props.theme.colors.error} transparent;
    }
  }
`;
