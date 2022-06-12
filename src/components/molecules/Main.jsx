import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { Image, Text, Input, Button, Modal, Icon } from '../atoms';
import { CategoryFilter, } from '../molecules';
import {RequestAccess} from '../organisms';
import {SystemStatus} from '../molecules';
import mainLayout from '../../json/main.json';
import sharemobile from '../../assets/images/icon__share__1x.png';
import sharetablet from '../../assets/images/icon__share__2x.png';
import sharedesktop from '../../assets/images/icon__share__3x.png';
import tagmobile from '../../assets/images/icon__tag__1x.png';
import tagtablet from '../../assets/images/icon__tag__2x.png';
import tagdesktop from '../../assets/images/icon__tag__3x.png';
import foldermobile from '../../assets/images/icon__folder__1x.png';
import foldertablet from '../../assets/images/icon__folder__2x.png';
import folderdesktop from '../../assets/images/icon__folder__3x.png';
import commentmobile from '../../assets/images/icon__comment__1x.png';
import commenttablet from '../../assets/images/icon__comment__2x.png';
import commentdesktop from '../../assets/images/icon__comment__3x.png';
import rightarrowmobile from '../../assets/images/icon__rightarrow__1x.png';
import rightarrowtablet from '../../assets/images/icon__rightarrow__2x.png';
import rightarrowdesktop from '../../assets/images/icon__rightarrow__3x.png';
import lockIcon from '../../assets/images/lock_icon.png';
import favorites from '../../assets/images/favorites.svg';
import { device, colors } from '../../theme';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';


import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { flatten, orderBy } from 'lodash';
import { toggleFilter, setActive } from './../../redux/filter/action';
import {
    showPreview,
    setScrollValue,
    updateReportList,
    setSelectedSection,
    updateRolesList,
    toggleFavourite,
    getReportAccess
} from '../../redux/common/action';
import DialogContent from '@material-ui/core/DialogContent';

/*Material Ui */
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import {Tooltip,createMuiTheme, MuiThemeProvider} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        boxShadow: 'none',
    },
    summary: {
        padding: 0,
    },
    headWrapper: {
        width: '100%',
    },
    reportTop: {
        marginTop: 10
    }
}));
/*Material UI */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const connectedProps = (state) => ({
    open: state.filter.open,
    active: state.filter.active,
    selectedReport: state.common.previewData,
    isAllRoleSelected: state.common.isSelectedAllRoles,
    reportList: state.common.reportList,
    reportLoader: state.common.reportLoader,
    selectedSection: state.common.selectedSection,
    areaList: state.filter.areaList,
    rolesList: state.common.rolesList,
    reportAccessList: state.common.reportAccessList,
    refreshDates: state.common.refreshDates
});

const connectionActions = {
    toggleFilter: toggleFilter,
    showPreview: showPreview,
    setActive: setActive,
    setScrollValue: setScrollValue,
    updateReportList,
    setSelectedSection,
    updateRolesList,
    toggleFavourite,
    getReportAccess
};

var connector = connect(connectedProps, connectionActions);

const FilterWithMainWrapper = styled.div`
  width: 100%;
  padding-top: 40px;
  @media ${device.tablet} {
    &.move--left {
      width: calc(100% - 375px);
      margin-left: 375px;
    }
  }
  & .popover {
    border-radius: 0;
  }
`;

const ItemFilterSection = styled.div`
  &.list-item {
    display: flex;
    filter: none;
    border: none;
    border-bottom: ${(props) => '1px solid' + props.borderColor};
    padding-bottom: 20px;
    margin-bottom: 15px;
    margin-right: 0px;
   
  }
  &.carousel-item {
    
  }

  &.grid-item {
    flex-wrap: ${(props) => (props.item ? 'wrap' : 'nowrap')};
    margin-right: 0px;
    margin-top:19px;
    @media ${device.mobile} {
      width: 100%;
    }
    @media ${device.tablet} {
      margin-right: 19px;
      width: calc(50% - ${(props) => (props.item ? '19px' : '16px')});
    }
    @media ${device.tabletM} {
      margin-right: 19px;
      width: calc(33.33% - ${(props) => (props.item ? '19px' : '16px')});
    }
    @media ${device.laptopM} {
      width: calc(20% - ${(props) => (props.item ? '19px' : '16px')});
    }
    @media ${device.laptopXL} {
      width: calc(20% - ${(props) => (props.item ? '19px' : '16px')});
    }
    
  }
  border: ${(props) => '1px solid' + props.borderColor};
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15));
  margin-bottom: 22px;
  margin-top: 20px;
  @media ${device.mobile} {
    margin-right: 16px;
  }
  @media ${device.tablet} {
    margin-right: 24px;
  }
  
`;
const TextWrapper = styled.div`
  font-size: 25px;
  line-height: 38px;
  color: #010101;
  padding-bottom: 16px;
  font-weight: 500;
`;

const ViewAllWrapper = styled.div`
  font-size: 14px;
  color:  ${colors.primary.themep4};
  padding-bottom: 20px;
  font-weight: 500;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const HeadWrapper = styled.div`
  border-bottom: 2px solid #e4e4e4;
  align-items: center;
  display: flex;
  margin-bottom: 0px;
  justify-content: space-between;
  margin-left: 16px;
  margin-right: 16px;
  @media ${device.tablet} {
    margin-left: 40px;
    margin-right: 40px;
  }
`;

const ReportList = styled.div`
  display: flex;
  &.grid-item {
    flex-wrap: ${(props) => (props.item ? 'wrap' : 'nowrap')};
    overflow: hidden;
    margin-left: 16px;
    margin-right: 16px;
    @media ${device.tablet} {
      margin-left: 40px;
      margin-right: 25px;
    }
  }

  &.list-item {
    overflow-x: hidden;
    display: block;
    margin-left: 0px;
    margin-right: 0px;
    @media ${device.tablet} {
      margin-left: 40px;
      margin-right: 40px;
    }
  }
  &.sliderItems {
    @media ${device.mobile} {
      margin-left: 16px;
      margin-right: 10px;
    }
    @media ${device.tablet} {
      margin-left: 40px;
      margin-right: 40px;
    }
  }
  scroll-behavior: smooth;
  position: relative;
  margin-bottom: 40px;
  margin-left: 40px;
  margin-right: 40px;
  overflow-x: auto;
  position: relative;
  scrollbar-color: #ddd;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    height: 14px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.primary.themep4};
    border-radius: 4px;
  }
`;
const LockIcon = styled.div`
    position:absolute;
    display:flex;
    justify-content:flex-end;
    align-items:baseline;
    padding:5px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    transition: all 1s;
    -webkit-transition: all 1s;
    z-index: 2;
    &.list-item{
        justify-content:center;
        align-items:center;
        height: 85%;

    }
    img{
        width: 25px;
      }
  `;
const ReportName = styled.div`
  font-size: 16px;
  color: #010101;
  margin-left: 16px;
  font-weight: 600;
  margin-top: 15px;
  @media ${device.tablet} {
    margin-left: 15px;
  }
  &.grid-text {
    // position: absolute;
    // display: flex;
    bottom: 50px;
    z-index: 1;

  }
  &.carousel-text {
    // position: absolute;
    // display: flex;
    bottom: 30px;
    z-index: 1;
  }
`;

const Date = styled.div`
  font-size: 14px;
  color: #a5a5a5;
  margin-bottom: 10px;
  margin-left: 16px;
  @media ${device.tablet} {
    margin-left: 15px;
  }
`;

const OverlaySection = styled.div`
  &.list-item {
     position: relative;
    // background: #fff;
    //flex-direction: row;
     //align-items: flex-start;
    display:flex;
  }
  position: absolute;
//   display: flex;
// justify-content: space-between;
//  align-items: flex-end;
  background: rgba(255, 255, 255, 0.8);
  width: 100%;
  bottom: 0px;
`;

const Expand = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;
  padding: 5px 15px 0px 0px;
//   margin-bottom: 8px;
  margin-right: 0px;
  :nth-child(3) {
    z-index: 3;
  }
  &.grid-item{
    svg{
        @media ${device.mobile} {
            margin-bottom: 20px;
        }
        @media ${device.tablet} {
            margin-bottom: 10px;

            }
        @media ${device.desktop} {
            margin-bottom: 0px;

            }
        }
  }
  svg{
      margin-bottom: 10px;
  &:hover {
    opacity: 0.7;
    stroke: ${colors.black};
  }
}

`;

const MoreSection = styled.div`
  display: flex;
  justify-content: space-between;
  &.list-item {
    align-self: flex-end;
    align-items: center;
    & > div {
      margin-bottom: 0px;
    }
  }

`;

const ListSection = styled.div`
  position: relative;
`;

const TitleSection = styled.div`
  display: flex;
  width: 75%;
  &.grid-item {
      width: 100%;
  }
`;

const Description = styled.div`
  font-size: 16px;
  color: #000000;
  margin-left: 15px;
  @media ${device.tablet} {
    margin-left: 15px;
  }
`;
const PopoverContent = styled.div`
  // border: 1px solid #C8C8C8;
  box-shadow: 0px 10px 10px rgb(58 92 144 / 14%);
  min-width: 340px;
  padding: 16px;
`;

const PopoverItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 7px;
  padding-bottom: 7px;
  font-size: 16px;
  align-items: center;
  &.border {
    border-bottom: 1px solid #eeeeee;
  }
  &.cursor {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const ShowMore = styled.div`
  color:  ${colors.primary.themep4};
  text-align: center;
  font-size: 14px;
  padding-top: 17px;
  font-weight: 600;
`;

const LayoutWrapper = styled.div`
  position: relative;
  max-width: 1920px;
  margin: auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
  button {
    margin: auto;
    color: # ${colors.white};
    background:${colors.primary.themep4};
    border: 1px solid ${colors.primary.themep4};
    font-weight: 600;
  }
`;
const DialogPopup = styled.div`
  & .MuiBackdrop-root {
    background: transparent;
  }

  & .MuiDialog-paper {
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 10px rgb(0 0 0 / 15%);
    padding: 4px;
    width: 400px;
    margin: 0px;
    @media ${device.tablet} {
      margin: 32px;
    }
  }
`;
const HeaderDialog = styled.div`
  font-weight: 600;
  font-size: 22px;
`;

const SubHeaderDialog = styled.div`
  font-size: 16px;
  color: #010101;
`;

const AddButtonWrapper = styled.div`
  button {
    width: 100%;
    margin: auto;
    justify-content: center;
    color: #fff;
    background: #ffb41e;
    margin-top: 20px;
    box-shadow: 0px 2px 4px rgb(58 92 144 / 14%), 0px 3px 4px rgb(58 92 144 / 12%),
      0px 1px 5px rgb(58 92 144 / 20%);
  }
`;

const CoverImageWrapper = styled.div`
  width: 300px;
  height: 150px;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  overflow: hidden;
  &.list-item {
    height: 123px;
    border: 1px solid #e4e4e4;
    filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.15));
    display: none;
    @media ${device.tablet} {
      display: block;
    }
  }
  &.grid-item {
    width: 100%;
  }
`;

const CoverImageText = styled.h3`
  font-size: 18rem;
  line-height: 16rem;
  font-style: italic;
  font-weight: bold;
  color: ${(props) => props.color};
  box-shadow: none !important;
`;
const CancelWrapper = styled.div`
  button {
    color:  ${colors.primary.themep4};
    margin: auto;
    justify-content: center;
    background: #fff;
    margin-top: 16px;
    font-weight: 500;
  }
`;

const InputWrapper = styled.div`
  input {
    width: 100%;
    margin-top: 12px;
    padding: 10px;
  }
`;

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 200px;
`;

const CloseButton = styled.div`
    position:absolute;
    right: 10px;
    background-color:${colors.white};
    top: 10px;
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    height:24px;
    border-radius:50%;
    padding:8px;
    box-sizing:border-box;
`

const RequestModalWrapper = styled.span`
    display: flex;
    width: 100%;
    font-weight:bold;
    align-items: center; 
    justify-content: center;
    margin-top:10px;

    @media ${device.tablet} {
        margin-top:10%;
    }

	 @media ${device.laptop} {
        margin-top:10%;
	 } 
`

const RequestModalContent = styled.span`
    position:relative;
    background-color:${colors.white};
    padding:20px 20px;
    color:${colors.black};
    display: flex; 
    justify-content: center; 
    align-items: center;

    h4{
        font-weight:bold;
        font-size:1.4em;
    }

    @media ${device.mobile} {
        width: 90%;
        }
    @media ${device.tablet} {
        width:80%;
        }
    @media ${device.laptop} {
        width:50%;
    }`

export const Main = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(true);
    const theme = createMuiTheme({
        overrides: {
            MuiTooltip: {
                tooltip: {
                    fontSize: "1.1rem",
                }
            }
        }
    });
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [mainList, setMainList] = useState(mainLayout.reportList);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [moreLike, setMoreLike] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [requestModal, setRequestModal] = useState(false)
    const rolesCategoryList = flatten(
        props.rolesList.filter((role) => role.selected).map((cat) => cat.categories),
    );

    const handleOpenDialog = () => {
        setAnchorEl(null);
        setMoreLike(null);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const toggleFavourites = (report, section) => {
        props.toggleFavourite(report);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleMoreLikeClick = (event) => {
        setMoreLike(event.currentTarget);
    };

    const handleMoreLikeClose = () => {
        setMoreLike(null);
    };

    const moreLikeOpen = Boolean(moreLike);
    const moreLikeId = open ? 'more-like-popover' : undefined;

    const handlePreview = (child) => {
        props.setScrollValue(window.pageYOffset);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        props.showPreview(child);
    };

    const setViewAll = (activeIndex) => {
        props.setSelectedSection(activeIndex);
        let main = props.reportList;
        main.forEach((element, index) => {
            if (`${activeIndex}` === element.id) {
                element.isViewAll = true;
            }
        });

        props.updateReportList([...main]);
    };

    useEffect(() => {
        if (props.active.indexOf(2) > -1 || props.active.indexOf(6) > -1) {
            let main = mainList;
            main.forEach((element, index) => {
                if (main[index].isViewAll) {
                    main[index].isViewAll = false;
                }
            });
            setMainList([...main]);
        }
        if (props.active.indexOf(4) !== -1 && document.querySelectorAll('.reportList')) {
            try {
                let reportList = document.querySelectorAll('.reportList');

                reportList.forEach((report, index) => {
                    reportList[index].scrollTo(0, 0);
                });
            } catch (e) {
                console.error(e);
            }
        }
    }, [props.active]);

    const categoriesFromArea = flatten(
        Object.keys(props.areaList)
            .filter((area) => props.areaList[area].selected === true)
            .map((area) => [...props.areaList[area].categoryList]),
    )
        .filter((category) => rolesCategoryList.includes(category.id))
        .filter((category) => category.selected)
        .map((category) => `${category.id}`);

    const defaultIndexes = [0, '100', '101'];

    const filterReports = props.reportList.filter((sec) => categoriesFromArea.includes(sec.id));
    const favAndUpdated = orderBy(
        props.reportList.filter((sec) => defaultIndexes.includes(sec.id)),
        'title',
        'asc',
    );

    const isSomeRolesDeSelected = props.rolesList.some((role) => !role.selected);

    const handleViewLess = () => {
        props.setSelectedSection('all');
        let main = props.reportList;
        const updatedValues = main.map((element) => ({ ...element, isViewAll: false }));
        props.updateReportList([...updatedValues]);
    };

    const showHidden = () => {
        const updatedRoles = props.rolesList.map((role) => ({ ...role, selected: true }));

        const filterReportsSelected = props.reportList.filter(
            (sec) => defaultIndexes.includes(sec.id) || categoriesFromArea.includes(sec.id),
        );

        const filterReportsUnselected = props.reportList.filter(
            (sec) => !defaultIndexes.includes(sec.id) && !categoriesFromArea.includes(sec.id),
        );

        const updatedReports = [...filterReportsSelected, ...filterReportsUnselected];

        props.updateReportList([...updatedReports]);
        props.updateRolesList(updatedRoles);
    };
    const activeGrid = () => {
        if (props.active.indexOf(6) !== -1) {
            return 'list-item';
        } else if (props.active.indexOf(4) !== -1) {
            return 'grid-item';
        } else {
            return 'carousel-item';
        }
    };
    const viewTextTag = () => {
        if (props.active.indexOf(4) !== -1) {
            return 'grid-text';
        } else {
            return 'carousel-text';
        }
    }
    const activeGridReportList = () => {
        if (props.active.indexOf(6) !== -1) {
            return 'list-item';
        } else if (props.active.indexOf(4) !== -1) {
            return 'grid-item reportList';
        } else {
            return 'sliderItems reportList';
        }
    };
    const openReportUrl = (e, child) => {
        e.stopPropagation();
        if (child?.ReportURL !== '') {
            window.open(child?.ReportURL, '_blank').focus();
        }
    };


    const handleRequestAccess = (e,child) => {
        e.stopPropagation();
        props.getReportAccess(child.AccessTypeId);
        setRequestModal(true)
    }

    const layoutWidthRef = useRef(null);

    return (
        <MuiThemeProvider theme={theme}>
        <LayoutWrapper ref={layoutWidthRef}>

            {/* Request Access Modal Start Here */}
            {requestModal && props.reportAccessList.length > 0 && props.reportAccessList.map((child, childIndex) => (
            <Modal modalStatus={requestModal} handleModal={() => setRequestModal(false)} key={childIndex}>
                <RequestModalWrapper onClick={() => setRequestModal(false)}>
                    <RequestModalContent>
                        <CloseButton onClick={() => setRequestModal(false)}>
                              <Icon name="close" ></Icon>
                        </CloseButton>
                        <RequestAccess child={child}/>

                    </RequestModalContent>
                </RequestModalWrapper>
            </Modal>
            ))}

            {/* Request Access Modal End Here */}


            {/* Category filter component start here */}

            {props.open && <Modal modalStatus={props.open} handleModal={props.toggleFilter}>
                <CategoryFilter />
            </Modal>}

            {/* Category filter component end here */}

            <div>
                <DialogPopup
                    as={Dialog}
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    className="folder-dialog"
                >
                    <DialogContent>
                        <HeaderDialog>
                            <Text text={'Add Folder'} />
                        </HeaderDialog>
                        <SubHeaderDialog>
                            <Text text={'Create a personal report folder'} />
                        </SubHeaderDialog>
                        <InputWrapper>
                            <Input />
                        </InputWrapper>
                        <div>
                            <AddButtonWrapper onClick={handleDialogClose}>
                                <Button color="primary" text={'ADD FOLDER'} />
                            </AddButtonWrapper>
                            <CancelWrapper onClick={handleDialogClose}>
                                <Button color="primary" text={'CANCEL'} />
                            </CancelWrapper>
                        </div>
                    </DialogContent>
                </DialogPopup>
            </div>
            <FilterWithMainWrapper>
                <Popover
                    id={moreLikeId}
                    open={moreLikeOpen}
                    className={'popover'}
                    anchorEl={moreLike}
                    onClose={handleMoreLikeClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <PopoverContent>
                        <PopoverItem className="border">
                            <Text text={'By category'} />
                        </PopoverItem>
                        <PopoverItem className="border">
                            <Text text={'By type'} />
                        </PopoverItem>
                        <PopoverItem className="border">
                            <Text text={'By role'} />
                        </PopoverItem>
                        <PopoverItem>
                            <Text text={'By owner'} />
                        </PopoverItem>
                        <ShowMore>
                            <Text text={'SHOW ALL OPTIONS'} />
                        </ShowMore>
                    </PopoverContent>
                </Popover>
                <Popover
                    id={id}
                    open={open}
                    className={'popover'}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <PopoverContent>
                        <PopoverItem className="border">
                            <Text text={'Comments'} />
                            <Image
                                mobilesrcfile={commentmobile}
                                tabletsrcfile={commenttablet}
                                desktopsrcfile={commentdesktop}
                                height={'auto'}
                                width={'20px'}
                            />
                        </PopoverItem>
                        <PopoverItem className="border">
                            <Text text={'Add to favourites'} />
                            <Image
                                mobilesrcfile={favorites}
                                tabletsrcfile={favorites}
                                desktopsrcfile={favorites}
                                height={'20px'}
                                width={'auto'}
                            />
                        </PopoverItem>
                        <PopoverItem className="border cursor" onClick={handleOpenDialog}>
                            <Text text={'Add to a folder'} />
                            <Image
                                mobilesrcfile={foldermobile}
                                tabletsrcfile={foldertablet}
                                desktopsrcfile={folderdesktop}
                                height={'auto'}
                                width={'20px'}
                            />
                        </PopoverItem>
                        <PopoverItem className="border">
                            <Text text={'Share'} />
                            <Image
                                mobilesrcfile={sharemobile}
                                tabletsrcfile={sharetablet}
                                desktopsrcfile={sharedesktop}
                                height={'auto'}
                                width={'20px'}
                            />
                        </PopoverItem>
                        <PopoverItem className="border">
                            <Text text={'Tags'} />
                            <Image
                                mobilesrcfile={tagmobile}
                                tabletsrcfile={tagtablet}
                                desktopsrcfile={tagdesktop}
                                height={'auto'}
                                width={'20px'}
                            />
                        </PopoverItem>
                        <PopoverItem>
                            <Text text={'Find more like this...'} />
                            <IconWrapper onClick={handleMoreLikeClick}>
                                <Image
                                    mobilesrcfile={rightarrowmobile}
                                    tabletsrcfile={rightarrowtablet}
                                    desktopsrcfile={rightarrowdesktop}
                                    height={'auto'}
                                    width={'20px'}
                                />
                            </IconWrapper>
                        </PopoverItem>
                    </PopoverContent>
                </Popover>
                {favAndUpdated.map((item, index) => {
                    return props.selectedSection === 'all' || props.selectedSection === item.id ? (
                        <div key={index}>
                            {props.active.indexOf(6) !== -1 ? (
                                <Accordion
                                    className={classes.root}
                                    expanded={expanded === item.id}
                                    onChange={handleChange(item.id)}
                                >
                                    <AccordionSummary
                                        className={classes.summary}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <HeadWrapper className={classes.headWrapper}>
                                            <TextWrapper>
                                                <Text
                                                    tag="p"
                                                    text={item.title}
                                                    bold="bold"
                                                    color={colors.primary.black90}
                                                />
                                            </TextWrapper>
                                            <Icon name={expanded === item.id ? 'chevronup' : 'chevrondown'} color={colors.black} />

                                        </HeadWrapper>
                                    </AccordionSummary>

                                    <ListSection>
                                        <ReportList item={item.isViewAll} className={activeGridReportList()}>
                                            {item.reportList.map((child, childIndex) => (

                                                <ItemFilterSection
                                                    onClick={(e) => child.AccessFlg === "Y" ? openReportUrl(e, child) : handleRequestAccess(e,child)}
                                                    item={item.isViewAll}
                                                    isAccessible={child.AccessFlg}
                                                    key={childIndex}
                                                    borderColor={
                                                        props.selectedReport?.ReportId === child.ReportId
                                                            ? '#FFA014'
                                                            : '#E4E4E4'
                                                    }
                                                    className={activeGrid()}
                                                >

                                            { child.AccessFlg === "N" && (
                                                    <LockIcon className={activeGrid()}>
                                                    <Image alt="Lock Icon" mobilesrcfile={lockIcon} tabletsrcfile={lockIcon} desktopsrcfile={lockIcon} />
                                                    </LockIcon>)}
                                            
                                                    <OverlaySection className={activeGrid()}>
                                                        <TitleSection >
                                                            <div>
                                                                <ReportName className={`${activeGrid()} ${classes.reportTop}`} >
                                                                    <Text
                                                                        tag="p"
                                                                        text={
                                                                            child.ReportName.length > 21 &&
                                                                                (props.active.indexOf(4) !== -1 ||
                                                                                    props.active.indexOf(2) !== -1)
                                                                                ? `${child.ReportName.slice(0, 17)}...`
                                                                                : child.ReportName
                                                                        }
                                                                        color={colors.primary.black90}
                                                                    />
                                                                </ReportName>
                                                                {props.active.indexOf(6) !== -1 && (
                                                                    <Description>
                                                                        <Text tag="p" text={child.ReportDesc} />
                                                                    </Description>
                                                                )}
                                                                {props.active.indexOf(6) === -1 && (
                                                                    <Date>
                                                                        <Text
                                                                            tag="p"
                                                                            text={`Updated ${dayjs(child.ModifiedDate).format(
                                                                                'DD MMM YYYY',
                                                                            )}`}
                                                                        />
                                                                    </Date>
                                                                )}
                                                            </div>
                                                        </TitleSection>
                                                        <MoreSection className={activeGrid()}>
                                                            
                                                            <Expand> 
                                                            {props.active.indexOf(6) !== -1 && (
                                                                <Date>
                                                                    <Text
                                                                        tag="p"
                                                                        text={`Updated ${dayjs(child.ModifiedDate).format(
                                                                            'DD MMM YYYY',
                                                                        )}`}
                                                                    />
                                                                </Date>
                                                            )}
                                                            </Expand>
                                                            <Tooltip title={child.IsFavFlg === 'Y' ? 'Favorites Selected': 'Favorites'}>
                                                            <Expand
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleFavourites(child, item);
                                                                }}
                                                            >
                                                                {child.IsFavFlg === 'Y' ? (<Icon name={'favSelected'} />) : (<Icon name={'favorites'} />)}

                                                            </Expand>
                                                            </Tooltip>
                                                            <Tooltip title='Open Detail'>
                                                            <Expand
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handlePreview(child);
                                                                }}
                                                            >

                                                                <Icon name={'expand'} />
                                                            </Expand>
                                                            </Tooltip>
                                                            <Tooltip title='Open Report'>
                                                            <Expand
                                                                onClick={(e) => {
                                                                    openReportUrl(e, child);
                                                                }}
                                                            >

                                                                <Icon name={'maximize'} />

                                                            </Expand>
                                                            </Tooltip>
                                                        </MoreSection>
                                                    </OverlaySection>
                                                </ItemFilterSection>
                                            ))}
                                        </ReportList>
                                    </ListSection>
                                </Accordion>
                            ) : (
                                <>
                                    <HeadWrapper className={activeGrid()}>
                                        <TextWrapper>
                                            <Text tag="p" text={item.title} bold="bold" color={colors.primary.black90} />
                                        </TextWrapper>
                                        {props.active.indexOf(4) !== -1 &&
                                            !item.isViewAll &&
                                            item.reportList.length > 1 &&
                                            layoutWidthRef?.current?.offsetWidth <= 320 * item.reportList.length && (
                                                <ViewAllWrapper onClick={() => setViewAll(item.id)}>
                                                    <Text tag="p" text={item.viewAll} bold="bold" />
                                                </ViewAllWrapper>
                                            )}

                                        {props.active.indexOf(6) !== -1 &&
                                            !item.isViewAll &&
                                            item.reportList.length > 3 && (
                                                <ViewAllWrapper onClick={() => setViewAll(item.id)}>
                                                    <Text tag="p" text={item.viewAll} bold="bold" />
                                                </ViewAllWrapper>
                                            )}

                                        {item.isViewAll && (
                                            <ViewAllWrapper onClick={() => handleViewLess()}>
                                                <Text tag="p" text="BACK" bold="bold" />
                                            </ViewAllWrapper>
                                        )}
                                    </HeadWrapper>
                                    <ListSection>
                                        <ReportList item={item.isViewAll} className={activeGridReportList()}>
                                            {item.reportList.map((child, childIndex) => (

                                                <ItemFilterSection
                                                    onClick={(e) => child.AccessFlg === "Y" ? openReportUrl(e, child) : handleRequestAccess(e,child)}
                                                    item={item.isViewAll}
                                                    isAccessible={child.AccessFlg}
                                                    key={childIndex}
                                                    borderColor={
                                                        props.selectedReport?.ReportId === child.ReportId
                                                            ? '#FFA014'
                                                            : '#E4E4E4'
                                                    }
                                                    className={activeGrid()}
                                                >

                                            { child.AccessFlg === "N" && (
                                                    <LockIcon className={activeGrid()}>
                                                    <Image alt="Lock Icon" mobilesrcfile={lockIcon} tabletsrcfile={lockIcon} desktopsrcfile={lockIcon} />
                                                    </LockIcon>)}
                                                   
                                                    {props.active.indexOf(6) === -1 && (
                                                        <CoverImageWrapper
                                                            backgroundImage={child.ImageURL}
                                                            className={activeGrid()}
                                                        >
                                                            <CoverImageText index={childIndex} color={'transparent'}>
                                                                {child.ReportName}
                                                            </CoverImageText>
                                                        </CoverImageWrapper>
                                                        
                                                    )}



                                                    <OverlaySection className={activeGrid()}>

                                                        <TitleSection className={activeGrid()}>
                                                            <div>
                                                                <ReportName className={viewTextTag()}>

                                                                    <Text
                                                                        tag="p"
                                                                        text={
                                                                            child.ReportName.length > 21 &&
                                                                                (props.active.indexOf(4) !== -1 ||
                                                                                    props.active.indexOf(2) !== -1)
                                                                                ? `${child.ReportName.slice(0, 17)}...`
                                                                                : child.ReportName
                                                                        }
                                                                        color={colors.primary.black90}
                                                                    />
                                                                </ReportName>
                                                                
                                                            </div>
                                                        </TitleSection>
                                                        <MoreSection className={activeGrid()}>
                                                            
                                                             <Expand > 
                                                             {props.active.indexOf(6) === -1 && (
                                                                <Date>
                                                                    <Text
                                                                        tag="p"
                                                                        text={`Updated ${dayjs(child.ModifiedDate).format(
                                                                            'DD MMM YYYY',
                                                                        )}`}
                                                                    />
                                                                </Date>
                                                            )} 
                                                            </Expand>
                                                            <Tooltip title={child.IsFavFlg === 'Y' ? 'Favorites Selected': 'Favorites'}>
                                                            <Expand className={activeGrid()}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleFavourites(child, item);
                                                                }}
                                                            >
                                                                {child.IsFavFlg === 'Y' ? <Icon name={'favSelected'} /> : <Icon name={'favorites'} />}
                                                            </Expand>
                                                            </Tooltip>
                                                            <Tooltip title='Open Detail'>
                                                            <Expand className={activeGrid()}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handlePreview(child);
                                                                }}
                                                            >
                                                                <Icon name={'expand'} />
                                                            </Expand>
                                                            </Tooltip>
                                                            <Tooltip title='Open Report'>
                                                            <Expand className={activeGrid()}
                                                                onClick={(e) => {
                                                                    openReportUrl(e, child);
                                                                }}
                                                            >
                                                                <Icon name={'maximize'} />
                                                            </Expand>
                                                            </Tooltip>
                                                        </MoreSection>
                                                    </OverlaySection>
                                                </ItemFilterSection>
                                            ))}
                                        </ReportList>
                                    </ListSection>
                                </>
                            )}
                        </div>
                    ) : null;
                })}

                {filterReports.map((item, index) => {
                    return props.selectedSection === 'all' || props.selectedSection === item.id ? (
                        <div key={index}>
                            {props.active.indexOf(6) !== -1 ? (
                                <Accordion
                                    className={classes.root}
                                    expanded={expanded === item.id}
                                    onChange={handleChange(item.id)}
                                >
                                    <AccordionSummary
                                        className={classes.summary}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <HeadWrapper className={classes.headWrapper}>
                                            <TextWrapper>
                                                <Text tag="p" text={item.title} bold="bold" color={colors.primary.black90} />
                                            </TextWrapper>
                                            <Icon name={expanded === item.id ? 'chevronup' : 'chevrondown'} color={colors.black} />

                                            {props.active.indexOf(4) !== -1 &&
                                                !item.isViewAll &&
                                                item.reportList.length > 1 &&
                                                layoutWidthRef?.current?.offsetWidth <= 320 * item.reportList.length && (
                                                    <ViewAllWrapper onClick={() => setViewAll(item.id)}>
                                                        <Text tag="p" text={item.viewAll} bold="bold" />
                                                    </ViewAllWrapper>
                                                )}

                                            {item.isViewAll && (
                                                <ViewAllWrapper onClick={() => handleViewLess()}>
                                                    <Text tag="p" text="BACK" bold="bold" />
                                                </ViewAllWrapper>
                                            )}
                                        </HeadWrapper>
                                    </AccordionSummary>
                                    <ListSection>
                                        <ReportList item={item.isViewAll} className={activeGridReportList()}>
                                            {item.reportList.map((child, childIndex) => (
                                                <ItemFilterSection
                                                    onClick={(e) => child.AccessFlg === "Y" ? openReportUrl(e, child) : handleRequestAccess(e,child)}
                                                    isAccessible={child.AccessFlg}
                                                    item={item.isViewAll}
                                                    key={childIndex}
                                                    borderColor={
                                                        props.selectedReport?.ReportId === child.ReportId ? '#FFA014' : '#E4E4E4'
                                                    }
                                                    className={activeGrid()}
                                                >
                                                   { child.AccessFlg === "N" && (
                                                    <LockIcon className={activeGrid()}>
                                                    <Image alt="Lock Icon" mobilesrcfile={lockIcon} tabletsrcfile={lockIcon} desktopsrcfile={lockIcon} />
                                                    </LockIcon>)}
                                                    {props.active.indexOf(6) === -1 && child.ImageURL ? (
                                                        <CoverImageWrapper
                                                            backgroundImage={child.ImageURL}
                                                            className={activeGrid()}
                                                        >
                                                            <CoverImageText index={childIndex} color={'transparent'}>
                                                                {child.ReportName}
                                                            </CoverImageText>
                                                        </CoverImageWrapper>
                                                    ) : (
                                                        props.active.indexOf(6) === -1 && (
                                                            <CoverImageWrapper className={activeGrid()}>
                                                                <CoverImageText index={childIndex} color={colors.primary.themep3}>
                                                                    {child.ReportName}
                                                                </CoverImageText>
                                                            </CoverImageWrapper>
                                                        )
                                                    )}
                                                    <OverlaySection className={activeGrid()}>
                                                        <TitleSection className={activeGrid()}>
                                                            <div>
                                                                <ReportName className={activeGrid()}>
                                                                    <Text
                                                                        tag="p"
                                                                        text={
                                                                            child.ReportName.length > 21 &&
                                                                                (props.active.indexOf(4) !== -1 || props.active.indexOf(2) !== -1)
                                                                                ? `${child.ReportName.slice(0, 17)}...`
                                                                                : child.ReportName
                                                                        }
                                                                        color={colors.primary.black90}
                                                                    />
                                                                </ReportName>
                                                                {props.active.indexOf(6) !== -1 && (
                                                                    <Description>
                                                                        <Text tag="p" text={child.ReportDesc} />
                                                                    </Description>
                                                                )}
                                                                {props.active.indexOf(6) === -1 && (
                                                                    <Date>
                                                                        <Text
                                                                            tag="p"
                                                                            text={`Updated ${dayjs(child.ModifiedDate).format(
                                                                                'DD MMM YYYY',
                                                                            )}`}
                                                                        />
                                                                    </Date>
                                                                )}
                                                            </div>
                                                        </TitleSection>
                                                        <MoreSection className={activeGrid()}>
                                                            <Expand>
                                                            {props.active.indexOf(6) !== -1 && (
                                                                <Date>
                                                                    <Text
                                                                        tag="p"
                                                                        text={`Updated ${dayjs(child.ModifiedDate).format('DD MMM YYYY')}`}
                                                                    />
                                                                </Date>
                                                            )}
                                                            </Expand>
                                                            <Tooltip title={child.IsFavFlg === 'Y' ? 'Favorites Selected': 'Favorites'}>
                                                            <Expand
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleFavourites(child, item);
                                                                }}
                                                            >
                                                                {child.IsFavFlg === 'Y' ? <Icon name={'favSelected'} /> : <Icon name={'favorites'} />}
                                                            </Expand>
                                                            </Tooltip>
                                                            <Tooltip title='Open Detail'>
                                                            <Expand
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handlePreview(child);
                                                                }}
                                                            >
                                                                <Icon name={'expand'} />
                                                            </Expand>
                                                            </Tooltip>
                                                            <Tooltip title='Open Report'>
                                                            <Expand
                                                                onClick={(e) => {
                                                                    openReportUrl(e, child);
                                                                }}
                                                            >
                                                                <Icon name={'maximize'} />
                                                            </Expand>
                                                            </Tooltip>
                                                        </MoreSection>
                                                    </OverlaySection>
                                                </ItemFilterSection>
                                            ))}
                                        </ReportList>
                                    </ListSection>

                                </Accordion>
                            ) : (
                                <>
                                    <HeadWrapper className={activeGrid()}>
                                        <TextWrapper>
                                            <Text tag="p" text={item.title} bold="bold" color={colors.primary.black90} />
                                        </TextWrapper>
                                        {props.active.indexOf(4) !== -1 &&
                                            !item.isViewAll &&
                                            item.reportList.length > 1 &&
                                            layoutWidthRef?.current?.offsetWidth <= 320 * item.reportList.length && (
                                                <ViewAllWrapper onClick={() => setViewAll(item.id)}>
                                                    <Text tag="p" text={item.viewAll} bold="bold" />
                                                </ViewAllWrapper>
                                            )}

                                        {props.active.indexOf(6) !== -1 && !item.isViewAll && item.reportList.length > 3 && (
                                            <ViewAllWrapper onClick={() => setViewAll(item.id)}>
                                                <Text tag="p" text={item.viewAll} bold="bold" />
                                            </ViewAllWrapper>
                                        )}

                                        {item.isViewAll && (
                                            <ViewAllWrapper onClick={() => handleViewLess()}>
                                                <Text tag="p" text="BACK" bold="bold" />
                                            </ViewAllWrapper>
                                        )}
                                    </HeadWrapper>
                                    <ListSection>
                                        <ReportList item={item.isViewAll} className={activeGridReportList()}>
                                            {item.reportList.map((child, childIndex) => (
                                                <ItemFilterSection
                                                    onClick={(e) => child.AccessFlg === "Y" ? openReportUrl(e, child) : handleRequestAccess(e,child)}
                                                    isAccessible={child.AccessFlg}
                                                    item={item.isViewAll}
                                                    key={childIndex}
                                                    borderColor={
                                                        props.selectedReport?.ReportId === child.ReportId ? '#FFA014' : '#E4E4E4'
                                                    }
                                                    className={activeGrid()}
                                                >

                                            { child.AccessFlg === "N" && (
                                                    <LockIcon className={activeGrid()}>
                                                    <Image alt="Lock Icon" mobilesrcfile={lockIcon} tabletsrcfile={lockIcon} desktopsrcfile={lockIcon} />
                                                    </LockIcon>)}
                                                    
                                                    {props.active.indexOf(6) === -1 && child.ImageURL ? (
                                                        <CoverImageWrapper
                                                            backgroundImage={child.ImageURL}
                                                            className={activeGrid()}
                                                        >
                                                            <CoverImageText index={childIndex} color={'transparent'}>
                                                                {child.ReportName}
                                                            </CoverImageText>
                                                        </CoverImageWrapper>
                                                    ) : (
                                                        props.active.indexOf(6) === -1 && (
                                                            <CoverImageWrapper className={activeGrid()}>
                                                                <CoverImageText index={childIndex} color={colors.primary.themep3}>
                                                                    {child.ReportName}
                                                                </CoverImageText>
                                                            </CoverImageWrapper>
                                                        )
                                                    )}


                                                    <OverlaySection className={activeGrid()}>
                                                        <TitleSection className={activeGrid()}>
                                                            <div>
                                                                <ReportName className={viewTextTag()}>
                                                                    <Text
                                                                        tag="p"
                                                                        text={
                                                                            child.ReportName.length > 21 &&
                                                                                (props.active.indexOf(4) !== -1 || props.active.indexOf(2) !== -1)
                                                                                ? `${child.ReportName.slice(0, 17)}...`
                                                                                : child.ReportName
                                                                        }
                                                                        color={colors.primary.black90}
                                                                    />
                                                                </ReportName>
                                                                {props.active.indexOf(6) !== -1 && (
                                                                    <Description>
                                                                        <Text tag="p" text={child.ReportDesc} />
                                                                    </Description>
                                                                )}
                                                               
                                                            </div>
                                                        </TitleSection>
                                                        <MoreSection className={activeGrid()}>
                                                            <Expand>
                                                            <Date>
                                                            <Text
                                                                    tag="p"
                                                                    text={`Updated ${dayjs(child.ModifiedDate).format(
                                                                        'DD MMM YYYY',
                                                                    )}`}
                                                                />
                                                            </Date>

                                                            </Expand>
                                                           
                                                            <Tooltip title={child.IsFavFlg === 'Y' ? 'Favorites Selected': 'Favorites'}>
                                                            <Expand className={activeGrid()}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleFavourites(child, item);
                                                                }}
                                                            >

                                                                {child.IsFavFlg === 'Y' ? <Icon name={'favSelected'} /> : <Icon name={'favorites'} />}
                                                            </Expand>
                                                            </Tooltip>
                                                            <Tooltip title='Open Detail'>
                                                            <Expand className={activeGrid()}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handlePreview(child);
                                                                }}
                                                            >

                                                                <Icon name={'expand'} />
                                                            </Expand>
                                                            </Tooltip>
                                                            <Tooltip title='Open Report'>
                                                            <Expand className={activeGrid()}
                                                                onClick={(e) => {
                                                                    openReportUrl(e, child);
                                                                }}
                                                            >

                                                                <Icon name={'maximize'} />
                                                            </Expand>
                                                            </Tooltip>
                                                        </MoreSection>
                                                    </OverlaySection>
                                                </ItemFilterSection>
                                            ))}
                                        </ReportList>
                                    </ListSection>

                                </>
                            )}


                        </div>
                    ) : null;
                })}

                {props.reportLoader && (
                    <LoaderWrapper>
                        <CircularProgress color="primary" size="5rem" />
                    </LoaderWrapper>
                )}

                {isSomeRolesDeSelected && (
                    <ButtonWrapper onClick={() => showHidden()}>
                        <Button text={'Show hidden categories'}></Button>
                    </ButtonWrapper>
                )}
            </FilterWithMainWrapper>
            {props.refreshDates.length > 0 &&  (
                <SystemStatus  systemDateTime={props.refreshDates}/>

            )}

        </LayoutWrapper>
   </MuiThemeProvider>
    );
};

Main.defaultProps = {};

export default connector(Main);
