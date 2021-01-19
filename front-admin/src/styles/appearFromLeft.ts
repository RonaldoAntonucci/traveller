import { keyframes, Keyframes } from 'styled-components';

export default (x: number): Keyframes => keyframes`
  from{
    opacity: 0;
    transform: ${`translateX(-${x}px)`};
  }

  to{
    opacity: 1;
    transform: translateX(0);
  }
`;
