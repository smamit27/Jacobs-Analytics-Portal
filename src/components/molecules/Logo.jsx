import React from 'react';
import styled from 'styled-components/macro';
import { device } from '../../theme';
import { Image } from '../atoms';
import defaultmobilesrcfile from "../../assets/images/logo__1x.png";
import defaulttabletsrcfile from "../../assets/images/logo__2x.png";
import defaultdesktopsrcfile from "../../assets/images/logo__3x.png";

export const LogoHeadingWrapper = styled.h1`
  width: 31px;
  height: 40px;
  @media only screen and ${device.tabletM}{
    width: 172px;
  }
`;
export const LinkWrapper = styled.a`
  float: left;
  width: 100%;
  height: 100%;
`;

export const Logo = ({ redirectionPath, titleInfo, mobilesrcfile, tabletsrcfile, desktopsrcfile }) => {
  return (
    <LogoHeadingWrapper>
      <LinkWrapper href={redirectionPath} title={titleInfo}>
        <Image alt="Jacob Logo" mobilesrcfile={mobilesrcfile} tabletsrcfile={tabletsrcfile} desktopsrcfile={desktopsrcfile} />
      </LinkWrapper>
    </LogoHeadingWrapper>
  );
};

Logo.defaultProps = {
  redirectionPath: "",
  titleInfo: "title",
  mobilesrcfile: defaultmobilesrcfile,
  tabletsrcfile: defaulttabletsrcfile,
  desktopsrcfile: defaultdesktopsrcfile
};
