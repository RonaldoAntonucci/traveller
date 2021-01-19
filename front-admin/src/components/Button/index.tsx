import React, { BaseHTMLAttributes } from 'react';

import * as Styled from './styles';

interface ButtonProps extends BaseHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <Styled.Container {...rest}>{children}</Styled.Container>;
};

export default Button;
