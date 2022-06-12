import React from 'react';
import styled from 'styled-components/macro';
import { Image, Icon } from '../atoms';
import { colors, textSize } from '../../theme';

export const ButtonWrapper = styled.button`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  border: none;
  padding: 15px;
  text-transform: capitalize;
  font-size: ${textSize.body2.desktop};
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  
`;

export const Button = ({ ariaLabel = "Jacobs Button", bg, color, text, action, icon, image, iconcolor, opacity, mobilesrcfile, tabletsrcfile, desktopsrcfile }) => {
  return (
    <ButtonWrapper aria-label={ariaLabel} color={color} bg={bg} onClick={action} arial-lab>
      {text}
      {image && <Image mobilesrcfile={mobilesrcfile} tabletsrcfile={tabletsrcfile} desktopsrcfile={desktopsrcfile} height={'30px'} width={'auto'} />}
      {icon && <Icon name={icon} color={iconcolor} opacity={opacity} />}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  color: colors.white,
  bg: colors.primary.orange100,
  text: 'noText',
  mobilesrcfile: "",
  tabletsrcfile: "",
  desktopsrcfile: "",
  action: () => { return },
};
