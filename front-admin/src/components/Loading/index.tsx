import React from 'react';

import * as Styled from './styles';

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <Styled.Container active={loading}>
      <Styled.LoadingIcon />
    </Styled.Container>
  );
};

export default Loading;
