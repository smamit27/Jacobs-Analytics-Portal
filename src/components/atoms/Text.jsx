import * as React from 'react';
import styled, { css } from 'styled-components/macro';

import { device, textSize, lineHeight } from '../../theme';
import { respCss } from '../../helper';

export const TextItem = styled.span`
  display: block;
  position: relative;
  font-size: ${(props) => props.size ? textSize[props.size]['mobile'] : 'inherit'};
  line-height: ${(props) => props.size ? lineHeight[props.size]['mobile'] : 'inherit'};
  font-weight: ${(props) => (props.bold ? props.bold : 'inherit')};
  color: ${(props) => props.color ? props.color : 'inherit'};
 
  &.capitalize{
    text-transform: capitalize;
  }
  @media ${device.tablet} {
    font-size: ${(props) => props.size ? textSize[props.size]['tablet'] : 'inherit'};
    line-height: ${(props) => props.size ? lineHeight[props.size]['tablet'] : 'inherit'};
  }

  @media ${device.laptop} {
    font-size: ${(props) => props.size ? textSize[props.size]['laptop'] : 'inherit'};
    line-height: ${(props) => props.size ? lineHeight[props.size]['laptop'] : 'inherit'};
  }

  ${css`
    ${(props) => respCss('margin', props.margin)}
  `}

  ${css`
    ${(props) => respCss('text-align', props.align)}
  `}
`;

export const Text = ({ bold, color, margin, size, text, tag, align, className }) => {
  return (
    <TextItem className={className} as={tag} size={size} color={color} margin={margin} align={align} bold={bold} >
      {text}
    </TextItem>
  );
};

Text.defaultProps = {
  bold: false,
  tag: 'span',
  size: '',
  color: '',
  margin: '10px',
  text: 'lorem ipsum',
};
