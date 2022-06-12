import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Button, Text,Modal } from '../atoms';
import dayJs from 'dayjs'
import { omit, pick } from 'lodash'
import CircularProgress from '@material-ui/core/CircularProgress';
import { colors, device } from '../../theme';
import userprofileinfo from "../../json/userprofileinfo.json";
import { Tooltip, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import { toggleUserProfile, updateRolesList } from "./../../redux/common/action";


const UserProfileWrapper = styled.section`
  background: ${colors.black};
  position: fixed;
  top: 80px;
  width: 100%;
  overflow-y:overlay;
  height: calc(100% - 80px);
  padding: 25px 15px;
  right: 0;
  z-index: 3;
  @media only screen and ${device.mobileL} {
    width: 375px;
    top: 96px;
    position: absolute;
    height: calc(100% - 96px);
    overflow: auto;
  }
`

const HeadingWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: ${colors.primary.n5};
  display: flex;
  justify-content: space-between;
  align-items: center;
  button{
    padding-left: 0;
    padding-right: 0;
  }
`

const UserRoleListContWrapper = styled.div`
  &.no--border > div:first-child{
    border-top: 0;
  }
`

const UserRoleListHeadingWrapper = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: ${colors.primary.n5};
  margin: 30px 0 15px;
`

const RolelistWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: ${(props) => props.index === 0 ? 'solid 1px' + colors.primary.themep3 : 'solid 1px' + colors.white};
  flex-wrap: wrap;
  button{
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    padding-left: 0;
    padding-right: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    text-transform: none;
    &:first-child{
      div{
        margin-right: 10px;
      }
    }
  }
  h5, p{
    padding: 10px 0;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
  }
  p{
    font-weight: bold;
  }
`

const RolebtnWrapper = styled.div`
  button{
    width: 100%;
    justify-content: center;
  }
`

const ExpandCollapseWrapper = styled.div`
  button{
    width: auto!important;
    div{
      margin-right: 0!important;
    }
  }
`
const LoaderWrapper = styled.div`
width:100%;
display:flex;
justify-content:center
`

const SelectRoleWrapper = styled.div`
  width: 90%;
  button{
    text-align:left
  }
`


const LogoutButton = styled.a`
  width:100%;
  background-color: ${colors.primary.themep2};
  color: ${colors.white};
  border: none;
  padding: 8px;
  // text-transform: uppercase;
  text-align:center;
  display: flex;
  align-items: center;
  justify-content:center;
  position: relative;
  cursor: pointer;
  font-weight: bold;
`;
const SaveButton = styled.div`
  width:100%;
  background-color: ${colors.primary.themep2};
  color: ${colors.white};
  border: none;
  padding: 8px;
  // text-transform: uppercase;
  text-align:center;
  display: flex;
  align-items: center;
  justify-content:center;
  position: relative;
  cursor: pointer;
  font-weight: bold;
`;


const SubRolelistWrapper = styled.div`

`



export const UserProfileInfo = () => {
  const dispatch = useDispatch()
  const { rolesList, employeeDetails, profileLoader, rolesLoader } = useSelector(state => state.common)
  const [userProfileData] = useState(userprofileinfo);
  const [loclRolesList, setLocalRolesList] = useState(JSON.parse(JSON.stringify(rolesList)))
  const isSelectedAllRole = loclRolesList.every(role => role.selected === true)
  const isSelectedSomeRole = loclRolesList.some(role => role.selected === true)
  const [viewMoreButton, toggleViewMoreButton] = useState(false)
  const [requestModal, setRequestModal] = useState(true)

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: "1.1rem",
        }
      }
    }
  });


  const selectRole = () => {
    let oldValue = loclRolesList
    const isSelectedAll = oldValue.every(role => role.selected === true)
    const updatedValue = oldValue.map(role => ({ ...role, selected: !isSelectedAll }))
    setLocalRolesList([...updatedValue])
  }

  const selectSubRole = (index, subindex) => {
    let oldValue = loclRolesList
    oldValue[subindex].selected = !oldValue[subindex].selected;
    setLocalRolesList([...oldValue])

  }

  const [showhide, setShowhide] = useState({ role: {} });
  const expandCollapse = (index) => {
    let oldValue = showhide;
    oldValue.role[index] = !oldValue.role[index];
    setShowhide({
      role: oldValue.role
    });
  }

  const checkAllRolesSelected = () => {
    return isSelectedAllRole ? colors.primary.themep3 : colors.primary.n1
  }


  const handleSaveButton = () => {
    dispatch(toggleUserProfile())
    dispatch(updateRolesList([...loclRolesList]))
  }
  const userProfileHandler = () =>  {
    setRequestModal(false);
    dispatch(toggleUserProfile());
  }



  const userProfileDirectory = {
    ADJUSTED_SERVICE_DT: "Adjusted Service Date",
    BUSN_LOC_NUM: "Business Location Number",
    EMP_HIRE_DT: "Employee Hire Date",
    HR_REGION_DESC: "Human Resource Region Description",
    JOB_DESC: "Job Description",
    EMAIL_ADDR: 'Email Address',
    LOB: "LOB",
    EMPLOYEE_NUM: 'Employee Number',
    MOBILE_NUM: 'Mobile Number'
  }
  const baseUrl = window.location.href === 'http://localhost:3000/' ? 'https://jacobsanalyticslanding.jacobs.com/' : window.location.href

  const updatedProfileData = employeeDetails && { ...pick(employeeDetails, ['FULL_NAME', 'JOB_DESC', 'LOB', 'BUSINESS_UNIT', 'SUB_UNIT', 'PERFORMANCE_UNIT']), ...omit(employeeDetails, ['FULL_NAME', 'JOB_DESC', 'MOBILE_NUM', 'BUSINESS_UNIT', 'SUB_UNIT', 'PERFORMANCE_UNIT']) }

  return <Modal modalStatus={requestModal} handleModal={userProfileHandler}>

  <UserProfileWrapper >
    <MuiThemeProvider theme={theme}>
      <HeadingWrapper>
        <Text tag="h3" text={userProfileData.heading} color={colors.primary.n5} />
        <div onClick={() => dispatch(toggleUserProfile())}>
          <Button text="" icon="close" bg={colors.transparent} iconcolor={colors.white} />
        </div>
      </HeadingWrapper>

      <UserRoleListContWrapper>
        <UserRoleListHeadingWrapper>
          <Text tag="h4" text={userProfileData.allroles.heading} color={colors.primary.n5} />
        </UserRoleListHeadingWrapper>
        {!profileLoader && userProfileData.allroles.rolelist.map((item, index) =>
          <div key={index}>
            <RolelistWrapper index={index}>
              <SelectRoleWrapper onClick={() => selectRole()}>
                <Button text={item.type} icon="select" bg={colors.transparent} color={colors.primary.n5} opacity="1" iconcolor={checkAllRolesSelected()} />
              </SelectRoleWrapper>
              <ExpandCollapseWrapper onClick={() => expandCollapse(index)}>
                <Button text="" icon={showhide.role[index] ? 'chevronup' : 'chevrondown'} bg={colors.transparent} iconcolor={colors.white} />
              </ExpandCollapseWrapper>
            </RolelistWrapper>
            {
              showhide.role[index] &&
              <SubRolelistWrapper>
                {loclRolesList.length > 0 && loclRolesList.map((subitem, subindex) =>
                 <div key={subindex}>
                   {subitem.AccessFlag === 'Y' && (
                      <RolelistWrapper >
                          <SelectRoleWrapper onClick={() => selectSubRole(index, subindex)}>
                            <Button text={subitem.ApplicationRole} icon="select" bg={colors.transparent} color={colors.primary.n5} opacity="1" iconcolor={subitem.selected ? colors.primary.n5 : colors.primary.n1} />
                          </SelectRoleWrapper>
                      </RolelistWrapper>
                  )}
                  </div>                 
                )}
              </SubRolelistWrapper>
            }
          </div>
        )}
        {profileLoader && <LoaderWrapper>
          <CircularProgress color="secondary" size="2rem" />
        </LoaderWrapper>}
        {!profileLoader && isSelectedSomeRole && <RolebtnWrapper>
            {/* <Button text="Save" bg={colors.primary.themep2} color={colors.white}  /> */}
            <SaveButton onClick={() => handleSaveButton()}>Save</SaveButton>
        </RolebtnWrapper>}
        {
          !isSelectedSomeRole && <RolebtnWrapper>
            <Tooltip title="Please select any of the Roles">
              <div>
                <Button text="Save" bg={colors.primary.themep2} color={colors.white}  />
              </div>
            </Tooltip>
          </RolebtnWrapper>
        }
      </UserRoleListContWrapper>
      <UserRoleListContWrapper>
        <UserRoleListHeadingWrapper>
          <Text tag="h4" text={userProfileData.info.heading} color={colors.primary.n5} />
        </UserRoleListHeadingWrapper>
        {rolesLoader && <LoaderWrapper>
          <CircularProgress color="secondary" size="2rem" />
        </LoaderWrapper>}
        {updatedProfileData &&
          Object.keys(updatedProfileData)
            .slice(0, viewMoreButton === true ? Object.keys(updatedProfileData).length : 5)
            .map((item, index) =>
              <RolelistWrapper key={index} index={index} >
                <Text className="capitalize" tag="h5" text={
                  userProfileDirectory[item] || item.charAt(0).toUpperCase() + item.toLowerCase().slice(1).replaceAll('_', ' ')
                } color={colors.primary.n5} />
                <Text tag="p" text={item === 'ADJUSTED_SERVICE_DT' || item === 'EMP_HIRE_DT' ? dayJs(updatedProfileData[item]).format('MM/DD/YYYY') : updatedProfileData[item]} color={colors.primary.n5} />
              </RolelistWrapper>
            )}
        {!rolesLoader && Object.keys(updatedProfileData).length > 0 && !viewMoreButton && <RolebtnWrapper>
          <Button text="View more In My Jacobs" bg={colors.transparent} color={colors.primary.themep3} action={() => toggleViewMoreButton(true)} />
        </RolebtnWrapper>}

        <RolebtnWrapper>
          <LogoutButton  href={`${baseUrl}.auth/logout`}>
            Logout
          </LogoutButton>
        </RolebtnWrapper>
      </UserRoleListContWrapper>
    </MuiThemeProvider>
  </UserProfileWrapper>;
  </Modal>

};

UserProfileInfo.defaultProps = {
};

export default UserProfileInfo;