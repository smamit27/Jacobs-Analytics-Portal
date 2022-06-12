import React from 'react';
import styled from 'styled-components/macro';
import { Icon, IconWrapper } from '../atoms/Icon';
import { colors, spacers } from '../../theme';
import { Text } from '../atoms/Text';

const ButtonContainer = styled.a`
  background-color: ${colors.accent.gray25};
  padding: ${spacers.spacer4} ${spacers.spacer5};
  display: flex;
  text-transform: uppercase;
  align-items: center;

  ${IconWrapper} {
    height: 85px;
    width: 85px;
    padding: 30px;
    border-radius: 50%;
    background-color: ${(props) => props.iconBg};
    margin-left: auto;
  }
`;

const ButtonText = styled.span`
  flex: 1;
  border-bottom: 1px solid ${colors.black};
  margin-right: -3px;
`;

export const ReadMoreButton = ({ iconBg, iconColor }) => {
  return (
    <ButtonContainer iconBg={iconBg}>
      <ButtonText>
        <Text text="read more" />
      </ButtonText>
      <Icon name="arrow" color={iconColor} rounded />
    </ButtonContainer>
  );
};

ReadMoreButton.defaultProps = {
  iconBg: colors.black,
  iconColor: 'white',
};
