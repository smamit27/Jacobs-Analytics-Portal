import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Image } from '../atoms';
import bannerdesktopsrcfile1 from "../../assets/images/banner__image__5__3x.png";
import bannerdesktopsrcfile2 from "../../assets/images/banner__image__6__3x.png";
import bannerdesktopsrcfile3 from "../../assets/images/banner__image__7__3x.png";
import bannerdesktopsrcfile4 from "../../assets/images/banner__image__8__3x.png";
import bannertabletsrcfile1 from "../../assets/images/banner__image__5__2x.png";
import bannertabletsrcfile2 from "../../assets/images/banner__image__6__2x.png";
import bannertabletsrcfile3 from "../../assets/images/banner__image__7__2x.png";
import bannertabletsrcfile4 from "../../assets/images/banner__image__8__2x.png";
import bannermobilesrcfile1 from "../../assets/images/banner__image__5__1x.png";
import bannermobilesrcfile2 from "../../assets/images/banner__image__6__1x.png";
import bannermobilesrcfile3 from "../../assets/images/banner__image__7__1x.png";
import bannermobilesrcfile4 from "../../assets/images/banner__image__8__1x.png";

import { colors, device } from '../../theme';

export const BannerWrapper = styled.div`
  display: flex;
  width: 100%;
  justify: content;
  min-height: 50vh
`;

export const BannerListWrapper = styled.div`
  background: ${colors.white};
  border-left: solid 8px ${colors.primary.themep2};
  width: 100%;
  @media only screen and ${device.tabletM}{
    border-width: 15px;
  }
  :nth-child(2) {
    width: 4px!important;
    border-color: ${colors.primary.themep3}!important;
    background: ${colors.primary.themep3}!important;
    border-width: 0;
    @media only screen and ${device.mobileL}{
      width: 8px!important;
    }
    @media only screen and ${device.tabletM}{
      width: 25px!important;
    }
  }
  :nth-child(3) {
    width: 8px!important;
    border-color: ${colors.primary.themep1}!important;
    background: ${colors.primary.themep1}!important;
    border-width: 0;
    @media only screen and ${device.mobileL}{
      width: 16px!important;
    }
    @media only screen and ${device.tabletM}{
      width: 105px!important;
    }
  };
`;

export const BannerImageWrapper = styled.div`
  width: 80%;
  margin: 40px auto;
  overflow: auto;
  display: -webkit-box;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.black};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  @media only screen and ${device.tabletM}{
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
  picture{
    width: 100%;
    scroll-snap-align: start;
    transform-origin: center center;
    transform: scale(1);
    transition: transform 0.5s;
    @media only screen and ${device.tabletM}{
      width: 50%;
    }
  }
  img{
    width: 100%;
  }
`;

export const BannerHeading = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 37px;
  line-height: 47px;
  color: #010101;
  text-align: left;
  margin: 30px 0 0 25px;
`;

export const CarousalListcont = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and ${device.tabletM}{
    display: none;
  }
`;

export const CarousalLink = styled.a`
  margin: 5px 5px 40px;
  width: 8px;
  border-radius: 50%;
  height: 8px;
  background: ${colors.primary.redp3};
  text-indent: -99999em;
  &.active{
    background: ${colors.primary.redp1};
  }
`;

export const Banner = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const gotoSlide = (index) => {
    setSlideIndex(index);
    var slideElement = document.getElementById("slide--" + index);
    slideElement.scrollIntoView();
  }
  return (
    <BannerWrapper>
      <BannerListWrapper>
        <BannerHeading>My Analytics</BannerHeading>
        <BannerImageWrapper>
          <Image id="slide--0" mobilesrcfile={bannermobilesrcfile1} tabletsrcfile={bannertabletsrcfile1} desktopsrcfile={bannerdesktopsrcfile1}/>
          <Image id="slide--1" mobilesrcfile={bannermobilesrcfile2} tabletsrcfile={bannertabletsrcfile2} desktopsrcfile={bannerdesktopsrcfile2}/>
          <Image id="slide--2" mobilesrcfile={bannermobilesrcfile3} tabletsrcfile={bannertabletsrcfile3} desktopsrcfile={bannerdesktopsrcfile3}/>
          <Image id="slide--3" mobilesrcfile={bannermobilesrcfile4} tabletsrcfile={bannertabletsrcfile4} desktopsrcfile={bannerdesktopsrcfile4}/>
        </BannerImageWrapper>
        <CarousalListcont>
          <CarousalLink onClick={() => gotoSlide(0)} className={slideIndex === 0 ? "active" : ""}>0</CarousalLink>
          <CarousalLink onClick={() => gotoSlide(1)} className={slideIndex === 1 ? "active" : ""}>1</CarousalLink>
          <CarousalLink onClick={() => gotoSlide(2)} className={slideIndex === 2 ? "active" : ""}>2</CarousalLink>
          <CarousalLink onClick={() => gotoSlide(3)} className={slideIndex === 3 ? "active" : ""}>3</CarousalLink>
        </CarousalListcont>
      </BannerListWrapper>
      <BannerListWrapper></BannerListWrapper>
      <BannerListWrapper></BannerListWrapper>
    </BannerWrapper>
  );
};

Banner.defaultProps = {
  
};
