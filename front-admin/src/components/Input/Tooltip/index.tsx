import React from 'react';
import { useTheme } from 'styled-components';

import { Container, Span } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  const { colors } = useTheme();

  return (
    <Container className={className}>
      {children}
      <Span style={{ color: colors.white }}>{title}</Span>
    </Container>
  );
};

export default Tooltip;
