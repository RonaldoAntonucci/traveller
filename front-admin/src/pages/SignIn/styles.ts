import styled from 'styled-components';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Form as UnformForm } from '@unform/web';
import Inpt from '../../components/Input';
import ApperFromLeft from '../../styles/appearFromLeft';

import SignImg from '../../assets/signInImg.png';

interface CheckboxProps {
  value: boolean;
}

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: row;
  align-items: stretch;

  span {
    color: #617480;
    line-height: 22px;
  }
`;

export const Background = styled.div`
  background: url(${SignImg}) no-repeat center;
  background-size: cover;
  display: flex;
  flex: 1;

  animation: ${ApperFromLeft(100)} 1.5s;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding: 16px;
  flex-wrap: nowrap;
`;

export const ArrowLeft = styled(AiOutlineArrowLeft)``;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
`;

export const Form = styled(UnformForm)`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;

  .inputContainer {
    display: flex;
    flex-direction: column;
  }

  .rememberContainer {
    display: inline-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px 40px;
  }
`;

export const Input = styled(Inpt)`
  &:first-child {
    border-radius: 10px 10px 0px 0px;
  }

  &:last-child {
    border-top: 0px;
    border-radius: 0px 0px 10px 10px;
  }
`;

export const Checkbox = styled.div<CheckboxProps>`
  display: flex;

  > button {
    width: 24px;
    height: 24px;
    background-color: ${(props) =>
      props.value ? props.theme.colors.check : props.theme.colors.white};
    margin-right: 8px;
    border-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #dce2e6;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  span {
    margin-left: 16px;
    width: 50%;
  }
`;
