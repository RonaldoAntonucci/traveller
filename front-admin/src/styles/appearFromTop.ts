import { keyframes, Keyframes } from 'styled-components';

export default (y: number): Keyframes => keyframes`
  from{
    opacity: 0;
    transform: ${`translateY(-${y}px)`};
  }

  to{
    opacity: 1;
    transform: translateY(0);
  }
`;
