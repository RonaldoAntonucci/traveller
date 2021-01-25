import styled, { keyframes } from 'styled-components';

import Tooltip from './Tooltip';

interface ContainerProps {
  focused: boolean;
}

const ApperFromBottom = keyframes`
  from{
    opacity: 0;
    transform: translateY(-20);
  }

  to{
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div<ContainerProps>`
  border: 1px solid
    ${(props) => (props.focused ? props.theme.colors.primary : '#dce2e6')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 1.4em;
  background-color: #fff;
  position: relative;

  label {
    font-size: 1.5rem;
    font-family: 'Heebo';
    color: #a0acb2;

    animation: ${ApperFromBottom} 1s;
  }
`;

export const Input = styled.input`
  font-size: 1.8rem;
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
  right: 2em;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Error = styled(Tooltip)`
  position: absolute;
  left: -2em;

  svg {
    margin: 0;
  }

  span {
    background: ${(props) => props.theme.colors.error};
    color: ${(props) => props.theme.colors.white};

    &::before {
      border-color: ${(props) => props.theme.colors.error} transparent;
    }
  }
`;
