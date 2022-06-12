import React from 'react';
import styled from 'styled-components/macro';
import { device, colors } from '../../theme';

const FooterWrapper = styled.footer`
    
`;

const ListFooterWrapper = styled.div`
  background: #333333;
  display: flex;
  padding: 10px;
  justify-content:center;
  flex-wrap: wrap;

  @media ${device.tablet} {
		padding: 13px 18  px;
	}
`

const FooterTitle = styled.h4`
  color: ${colors.white}
`

export const Footer = (props) => {
  return <FooterWrapper>
    <ListFooterWrapper>
      <FooterTitle>©2020 Jacobs | All rights reserved.</FooterTitle>
    </ListFooterWrapper>
  </FooterWrapper>;
};

Footer.defaultProps = {
};
