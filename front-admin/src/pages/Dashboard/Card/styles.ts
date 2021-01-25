import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  cursor: pointer;
  transition: all 0.3s ease 0s;

  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.white};

  overflow: hidden;

  :hover {
    transform: translateY(-7px);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  padding-top: 56.25%; /* 16:9 */

  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Content = styled.div`
  padding: 24px;
  display: flex;
  flex: 1;
  flex-direction: column;
  line-height: 2em;

  strong {
    font-size: 2rem;
  }

  span {
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.span};
  }
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;

  button {
    border: 0;
    background-color: ${(props) => props.theme.colors.background};

    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    padding: 16px;

    :first-child {
      margin-right: 4px;
      border-radius: 0px 10px 0px 0px;
    }

    :last-child {
      margin-left: 4px;
      border-radius: 10px 0px 0px 0px;
    }

    :hover {
      background-color: ${(props) =>
        darken(0.1, props.theme.colors.background)};
    }
  }
`;
