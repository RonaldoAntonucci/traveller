import React, { useCallback, useRef, useState } from 'react';
import { AiOutlineExclamationCircle, AiOutlineCheck } from 'react-icons/ai';
import { useTheme } from 'styled-components';
import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';

import Button from '../../components/Button';

import schema from './schema';

import * as Styled from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import useAuth from '../../hooks/useAuth';

const SignIn: React.FC = () => {
  const { colors } = useTheme();
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();

  const [remember, setRemember] = useState(false);

  const checkRemember = useCallback(() => setRemember((prev) => !prev), []);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        await schema.validate(data, { abortEarly: false });

        signIn({ email: data.email, password: data.password, remember });
      } catch (err) {
        if (err instanceof ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [remember, signIn],
  );

  return (
    <Styled.Container>
      <Styled.Background />
      <Styled.Content>
        <Styled.Card>
          <Styled.ArrowLeft />
          <Styled.Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Fazer login</h1>

            <div className="inputContainer">
              <Styled.Input
                name="email"
                placeholder="E-mail"
                label="E-mail"
                type="email"
              />
              <Styled.Input
                name="password"
                placeholder="Senha"
                type="password"
                label="Senha"
              />
            </div>
            <div className="rememberContainer">
              <Styled.Checkbox value={remember}>
                <button type="button" onClick={checkRemember}>
                  <AiOutlineCheck color={colors.white} size={18} />
                </button>
                <span>Lembrar-me</span>
              </Styled.Checkbox>

              <span>Esqueci minha senha</span>
            </div>

            <Button color={colors.primary}>Acessar plataforma</Button>
          </Styled.Form>
          <Styled.Footer>
            <AiOutlineExclamationCircle size={44} color={colors.primary} />
            <span>Acesso restrito à sócios e moderadores</span>
          </Styled.Footer>
        </Styled.Card>
      </Styled.Content>
    </Styled.Container>
  );
};

export default SignIn;
