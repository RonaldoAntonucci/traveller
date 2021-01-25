import React, { useCallback, useMemo, useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { FiMapPin } from 'react-icons/fi';
import { AiOutlineAppstore, AiOutlineClose } from 'react-icons/ai';
import { useTheme } from 'styled-components';
import { GoThreeBars } from 'react-icons/go';
import { RiShutDownLine } from 'react-icons/ri';

import * as Styled from './styles';
import useAuth from '../../../hooks/useAuth';

const MenuButtons: React.FC = () => {
  const { colors } = useTheme();
  const [show, setShow] = useState(false);

  const { signOut } = useAuth();

  const toggleMenu = useCallback(() => setShow((prev) => !prev), []);

  const toggleIcon = useMemo(
    () =>
      !show ? (
        <GoThreeBars color={colors.white} size={32} />
      ) : (
        <AiOutlineClose color={colors.white} size={32} />
      ),
    [colors.white, show],
  );

  return (
    <Styled.Container show={show}>
      <Styled.ToggleButton type="button" show={show} onClick={toggleMenu}>
        {toggleIcon}
      </Styled.ToggleButton>

      <nav>
        <ul>
          <li>
            <Styled.Logo />
          </li>
          <li>
            <button type="button">
              <FiMapPin color={colors.white} size={24} />
              <span>Cidade</span>
            </button>
          </li>
          <li>
            <button type="button">
              <AiOutlineAppstore color={colors.white} size={24} />
              <span>Categorias</span>
            </button>
          </li>

          <li>
            <button type="button">
              <BiComment color={colors.white} size={24} />
              <span>Comentários</span>
            </button>
          </li>

          <li>
            <button type="button" onClick={signOut}>
              <RiShutDownLine color={colors.white} size={24} />
            </button>
          </li>
        </ul>
      </nav>
    </Styled.Container>
  );
};

export default MenuButtons;
