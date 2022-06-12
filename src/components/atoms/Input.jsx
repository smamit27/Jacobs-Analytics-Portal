import React from 'react';
import styled from 'styled-components/macro';
import { colors } from '../../theme';

export const InputWrapper = styled.input`
  background: ${colors.white};
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 1;
  padding: 15px 15px;
  min-width: 250px;
  font-family: Jacobs Chronos;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: ${colors.primary.n2};
`;

export const Input = ({ bg, color, placeholder, value, type }) => {
  return (
    <InputWrapper color={color} bg={bg} placeholder={placeholder} type={type}>
    </InputWrapper>
  );
};

Input.defaultProps = {
  color: colors.primary.n2,
  bg: colors.white,
  placeholder: '',
  value: '',
  type: ''
};
