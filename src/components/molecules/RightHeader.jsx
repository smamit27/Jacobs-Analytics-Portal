import React from 'react';
import styled from 'styled-components/macro';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '../atoms';

import { colors, device } from '../../theme';

import { useDispatch, useSelector } from "react-redux";
import { toggleUserProfile, toggleNotifications } from "./../../redux/common/action";
import { getNotificationsUpdate } from '../../redux/common/action';

export const NavWrapper = styled.nav`
  width: 50%;
`;

export const NavUnorderListWrapper = styled.ul`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
`;

export const NavListWrapper = styled.li`
display:flex;
  &:first-child{
    button{
      padding-left: 0px;
    }
  }
  img{
    width: 24px;
    height: 24px;
    margin: 0 25px 0 25px;
    @media only screen and ${device.tabletM}{
      margin: 0 25px;
    }
  }
  @media only screen and ${device.mobileL} {
    &:first-child span{
      display: block;
      line-height: 24px;
    }
  }
`;

export const LinkWrapper = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  margin-left: 25px;
  button{
    padding-left: 0;
    padding-right: 0;
    text-indent: -99999em;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-transform: none;
    @media only screen and ${device.tabletM} {
      text-indent: 0;
    }
    div{
      margin-left: 0px;
      @media only screen and ${device.mobileL} {
        margin-left: 25px;  
      }
    }
  }
`;

export const TextWrapper = styled.span`
  text-align: right;
  white-space: nowrap;
  display: none;
  strong{
    display: block;
  }
  @media only screen and ${device.tabletM} {
    display: block;
  }
`;

export const ActiveWrapper = styled.span`
  height: 8px;
  width: 100%;
  background: ${colors.primary.themep2};
  position: absolute;
  left: 0;
  bottom: -6px;
  @media only screen and ${device.mobileL} {
    bottom: -21px;
  }
`


const LoaderWrapper = styled.div`
width:100%;
display:flex;
justify-content:center
`


const NotificationRedDot = styled.div`
  position:absolute;
  top:-1px;
  right:8px;
  width:8px;
  height:8px;
  border-radius:50%;
  background-color:${colors.primary.red100}
`
export const RightHeader = (props) => {

  const dispatch = useDispatch();
  const { notificationsList } = useSelector(({ filter }) => filter);
  const { employeeDetails, profileLoader, userProfile } = useSelector(state => ({ ...state.common, ...state.filter }))

  const openUserProfile = () => {
    if (document.body.classList.value.indexOf("ovflw--hide") === -1 && document.body.offsetWidth <= 480) {
      document.body.classList.add("ovflw--hide");
    } else {
      document.body.classList.remove("ovflw--hide");
    }
    dispatch(toggleUserProfile())
  }


  const openNotifications = () => {
    if (document.body.classList.value.indexOf("ovflw--hide") === -1 && document.body.offsetWidth <= 480) {
      document.body.classList.add("ovflw--hide");
    } else {
      document.body.classList.remove("ovflw--hide");
    }

    if(notificationsList[0]?.NotificationFlag  === 'Y' && notificationsList[0]?.PopupFlag === "Y") {
      const notificationMessage = [{...notificationsList[0], NotificationFlag: 'Y', PopupFlag: 'N' }]
      dispatch(getNotificationsUpdate("N","Y", notificationMessage))
    } else {
      dispatch(toggleNotifications());
    }
  }

  return (
    <NavWrapper>
      <NavUnorderListWrapper>
        <NavListWrapper>
          <LinkWrapper onClick={() => openUserProfile()}>
            {profileLoader && <LoaderWrapper>
              <CircularProgress size="2rem" />
            </LoaderWrapper>}
            <TextWrapper>
              <strong>{employeeDetails?.FULL_NAME}</strong>
            </TextWrapper>
            <Button text="" icon="userprofile" aria-label="User Profile" iconcolor={colors.white} color={colors.white} bg={colors.transparent} />
          </LinkWrapper>
          <LinkWrapper onClick={() => openNotifications()}>
            {notificationsList?.length > 0 && notificationsList.map((message,id)=>(
              <div key={id}>{message.NotificationFlag === 'Y' && <NotificationRedDot />}</div>
            ))}
            <TextWrapper>
              <strong>Messages</strong>
            </TextWrapper>
            <Button text="" icon="notification" aria-label="Notifications" iconcolor={colors.white} color={colors.white} bg={colors.transparent} />
            {userProfile && <ActiveWrapper></ActiveWrapper>}
          </LinkWrapper>
        </NavListWrapper>
      </NavUnorderListWrapper>
    </NavWrapper>
  );
};

RightHeader.defaultProps = {

};

export default RightHeader;