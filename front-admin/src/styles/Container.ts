import styled from 'styled-components';
import appearFromLeft from './appearFromLeft';
import appearFromTop from './appearFromTop';

export default styled.div`
  animation: ${appearFromTop(100)} 1.5s;

  @media (min-width: 768px) {
    margin-left: 56px;

    animation: ${appearFromLeft(100)} 1.5s;
  }
`;
