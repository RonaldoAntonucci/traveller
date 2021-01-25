import styled from 'styled-components';

export const Span = styled.span`
  background: ${(props) => props.theme.colors.primary};
  padding: 8px;
  border-radius: 4px;
  font-size: 1.4rem;
  font-weight: 500px;
  width: 160px;
  opacity: 0;
  transition: opacity 0.4s;
  visibility: hidden;

  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);

  color: ${(props) => props.theme.colors.white};

  &::before {
    content: '';
    border-style: solid;
    border-color: ${(props) => props.theme.colors.primary} transparent;
    border-width: 6px 6px 0 6px;
    top: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const Container = styled.div`
  position: relative;

  ${Span} {
  }

  &:hover ${Span} {
    opacity: 1;
    visibility: visible;
  }
`;
