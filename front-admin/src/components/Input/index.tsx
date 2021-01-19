import { useField } from '@unform/core';
import React, {
  useEffect,
  useRef,
  InputHTMLAttributes,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useTheme } from 'styled-components';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import * as Styled from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  const { colors } = useTheme();

  const [value, setValue] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const onChange = useCallback((data) => {
    setValue(!!data.target.value);
  }, []);

  const onFocusOrBlur = useCallback(() => {
    setFocused((prev) => !prev);
  }, []);

  const handleClickEye = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const passwordIcon = useMemo(() => {
    if (visible) {
      return <AiFillEyeInvisible color={colors.primary} size={24} />;
    }
    return <AiFillEye color={colors.primary} size={24} />;
  }, [colors.primary, visible]);

  const InputType = useMemo(() => {
    if (!visible) {
      return type;
    }

    return 'text';
  }, [type, visible]);

  return (
    <Styled.Container {...rest}>
      {(label && value && <label htmlFor={fieldName}>{label}</label>) ||
        (label && focused && <label htmlFor={fieldName}>{label}</label>)}

      <Styled.Input
        ref={inputRef}
        defaultValue={defaultValue}
        type={InputType}
        placeholder={focused ? undefined : placeholder}
        onChange={onChange}
        onFocus={onFocusOrBlur}
        onBlur={onFocusOrBlur}
      />

      {type === 'password' && (
        <Styled.VisibleButton type="button" onClick={handleClickEye}>
          {passwordIcon}
        </Styled.VisibleButton>
      )}
    </Styled.Container>
  );
};

export default Input;
