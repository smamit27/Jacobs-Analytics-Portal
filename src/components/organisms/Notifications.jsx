import React,  { useState, useEffect }  from 'react';
import styled from 'styled-components/macro';
import { getNotificationsUpdate } from '../../redux/common/action';
import { toggleNotifications } from "./../../redux/filter/action";
import { useDispatch, useSelector } from 'react-redux'
import { colors, device } from '../../theme';
import { Button } from '../atoms'

const UserProfileWrapper = styled.section`
  background: ${colors.primary.themep2};
  position: fixed;
  top: 80px;
  width: 100%;
  overflow-y:overlay;
  max-height: calc(100% - 80px);
  padding: 0px;
  right: 0;
  z-index: 3;
  @media only screen and ${device.mobileL} {
    width: 375px;
    top: 104px;
    position: absolute;
    margin: auto;
    left: 0px;
    max-height: calc(100% - 96px);
  }
`


const NotificationMessge = styled.div`
    background: ${colors.primary.themep2};
    padding:3px 8px;
    cursor:pointer;
    display: flex;
    justify-content:space-between;
    align-items:center;
    color:${colors.white};
    margin-bottom:5px;

`

const CloseButtonWrapper = styled.span`

`

const NotificationContentWrapper = styled.span`

`

const NotificationContent = styled.h5`
    color:${colors.white};
    font-weight: bold;
    padding-left: 15px;
    
    &.center{
        text-align:center
    }
`




export const Notifications = () => {
    const dispatch = useDispatch()
    const { notificationsList, notifications } = useSelector(({ filter }) => filter);

    useEffect(() => {
        if(notificationsList[0]?.NotificationFlag  === 'Y' && notificationsList[0]?.PopupFlag === "Y") {
            dispatch(getNotificationsUpdate("N","Y", notificationsList))
        }
       
      }, [notificationsList?.[0]])

    const handleArchiveNotification = (popup,notification) => {
        if(notificationsList[0]?.NotificationFlag  === 'Y' && notificationsList[0]?.PopupFlag === "N") {
            const notificationMessage = [{...notificationsList[0], NotificationFlag: 'N', PopupFlag: 'N' }]
            dispatch(getNotificationsUpdate(popup,notification, notificationMessage))
        }
        if(notifications) {
            dispatch(toggleNotifications())
        }
    }
    
    return (
        <>
        {notificationsList?.length > 0 && notificationsList.map((message, id) => (
            <UserProfileWrapper key={id}>
             { ((notificationsList[0]?.NotificationFlag  === 'Y' && notificationsList[0]?.PopupFlag === "Y") || notifications) && (

                <NotificationMessge >
                    <NotificationContentWrapper>
                        <NotificationContent>{message.Notification}</NotificationContent>
                    </NotificationContentWrapper>
                    <CloseButtonWrapper onClick={() => handleArchiveNotification("N","N")}>
                        <Button text="" iconcolor={colors.white} bg={colors.transparent} color={colors.white} icon='close' />
                    </CloseButtonWrapper>
                </NotificationMessge>
             )}
                </UserProfileWrapper>
        ))}

        {/* {(!notificationLoader && notificationsList.length === 0) && <NotificationContent className="center">No Messages</NotificationContent>} */}
    </>
    );

};

Notifications.defaultProps = {
};

export default Notifications;