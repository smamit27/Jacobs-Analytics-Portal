import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Input, Button, Text } from '../atoms';
import { Tooltip, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { device, colors } from '../../theme';
import { connect } from "react-redux";
import { toggleFilter, setActive, } from "./../../redux/filter/action";
import { setSelectedSection, clearAllSelection } from '../../redux/common/action'
const connectedProps = (state) => ({
    open: state.filter.open,
    active: state.filter.active
});

const connectionActions = {
    toggleFilter: toggleFilter,
    setActive: setActive,
    setSelectedSection,
    clearAllSelection
}

var connector = connect(connectedProps, connectionActions);

const FilterWrapper = styled.div`
    display: flex;
    width: 100%;
    background: ${colors.primary.themep4};
    padding: 15px 10px;
    align-items: center;
    position: relative;
    &.guided--search{
        padding-bottom: 80px;
        @media only screen and ${device.mobileL} {
            padding-bottom: 15px;
        }
    }
`;

const ItemSection = styled.div`
    cursor: pointer;
    button {
        padding: 15px 12px;
    }
    &:first-child button{
        padding-left: 0;
        @media only screen and ${device.mobileL} {
            padding-left: 15px;
        }
    }
    &:hover {
        opacity: 0.7;
    }
`;

const LeftSection = styled.div`
    flex: 1;
    display: flex;
   
`;

const RightSection = styled.div`
    flex: 5;
    display: flex;
    justify-content: flex-end;
`;

const GuidedSearchWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and ${device.mobileL}{
        padding-bottom: 0
    }
    input{
        flex: 5;
        position: absolute;
        bottom: 20px;
        left: 20px;
        width: calc(100% - 115px);
        @media only screen and ${device.mobileL}{
            position: static;
            width: auto;
        }
    }
    button{
        margin: 0 15px;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        @media only screen and ${device.mobileL}{
            position: static;
        }
    }
    p{
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.01em;
        text-transform: uppercase;
    }
`;
const SearchDeskContainer = styled.div`
    button{
        display: none;
        @media only screen and ${device.tabletM}{
            display: block!important;
        }
        img{
            height: 15px!important
        }
    }
`;
const SearchMobTabContainer = styled.div`
    button{
        display: block!important;
        position: absolute;
        bottom: 20px;
        right: 20px;
        margin-right: 0;
        @media only screen and ${device.tabletM}{
            display: none!important;
        }
        @media only screen and ${device.mobileL}{
            position: static;
            margin-right: 20px;
        }
    }
`;

// const OpenGuidedSearch = styled.div`
//     button{
//         padding-right: 0;
//     }
// `;
const CloseGuidedSearch = styled.div`
    button{
        margin: 0;
        padding-right: 0;
    }
`;

export const Filter = (props) => {
    const [guidedSearch, setGuidedSearch] = useState(false);


    const theme = createMuiTheme({
        overrides: {
            MuiTooltip: {
                tooltip: {
                    fontSize: "1.1rem",
                }
            }
        }
    });

    const toggleSearch = () => {
        setGuidedSearch(!guidedSearch);
    };

    const handleSelection = (items) => {
        props.setSelectedSection('all')
        props.setActive(items)
        props.clearAllSelection()
    }
    return (
        <MuiThemeProvider theme={theme}>
            <FilterWrapper className={guidedSearch ? 'guided--search' : ''}>
                <LeftSection>
                    <ItemSection onClick={() => props.toggleFilter()}>
                        <Tooltip title="Filter">
                            <div>
                                <Button text="" ariaLabel="Toggle Filter Button" iconcolor={colors.white} bg={colors.transparent} color={colors.white} icon={props.open ? 'close' : 'openfilter'} />
                            </div>
                        </Tooltip>
                    </ItemSection>
                    {props.active.indexOf(1) !== -1 && <Tooltip title="Carousel View">
                        <div>
                            <ItemSection onClick={() => handleSelection([2, 3, 5])}>
                                <Button text="" ariaLabel="Carousel Button" iconcolor={colors.white} icon="carousel" bg={colors.transparent} color={colors.white} />
                            </ItemSection>
                        </div>
                    </Tooltip>}
                    {props.active.indexOf(2) !== -1 && <Tooltip title="Carousel View">
                        <div>
                            <ItemSection>
                                <Button text="" ariaLabel="Carousel Button" iconcolor={colors.primary.themep3} icon="carousel" bg={colors.transparent} color={colors.white} />
                            </ItemSection>
                        </div>
                    </Tooltip>}
                    {props.active.indexOf(3) !== -1 && <Tooltip title="Grid View">
                        <div>
                            <ItemSection onClick={() => handleSelection([1, 4, 5])}>
                                <Button text="" ariaLabel="Grid Button" iconcolor={colors.white} icon="gridview" bg={colors.transparent} color={colors.white} />
                            </ItemSection>
                        </div>
                    </Tooltip>}
                    {props.active.indexOf(4) !== -1 && <Tooltip title="Grid View">
                        <div>
                            <ItemSection>
                                <Button text="" ariaLabel="Grid Button" iconcolor={colors.primary.themep3} icon="gridview" bg={colors.transparent} color={colors.white} />
                            </ItemSection>
                        </div>
                    </Tooltip>}
                    {props.active.indexOf(5) !== -1 && <Tooltip title="List View">
                        <div>
                            <ItemSection onClick={() => handleSelection([1, 3, 6])}>
                                <Button text="" ariaLabel="List Button" iconcolor={colors.white} icon="listview" bg={colors.transparent} color={colors.white} />
                            </ItemSection>
                        </div>
                    </Tooltip>}
                    {props.active.indexOf(6) !== -1 && <Tooltip title="List View">
                        <div>
                            <ItemSection>
                                <Button text="" ariaLabel="List Button" iconcolor={colors.primary.themep3} icon="listview" bg={colors.transparent} color={colors.white} />
                            </ItemSection>
                        </div>
                    </Tooltip>}

                    {/* <Tooltip title="Jacobs classic site">
                        <div>
                            <ItemSection onClick={() => window.open('http://jacobsanalytics.jacobs.com/')}>
                                <Button text="" ariaLabel="List Button" iconcolor={colors.primary.themep3} icon="jacobs" bg={colors.transparent} color={colors.white} />
                            </ItemSection>
                        </div>
                    </Tooltip> */}
                </LeftSection>
                <RightSection>
                <Tooltip title="Jacobs classic site">
                        <div>
                            <ItemSection onClick={() => window.open('http://jacobsanalytics.jacobs.com/')}>
                                <Button text="" ariaLabel="List Button" iconcolor={colors.primary.themep3
                                } icon="jacobs" bg={colors.transparent} color={colors.white} />
                            </ItemSection>
                        </div>
                    </Tooltip>
                    {guidedSearch &&
                        <GuidedSearchWrapper>
                            <Input type="text" placeholder="Tell us what you’re looking for" />
                            <SearchMobTabContainer>
                                <Button text="" iconcolor={colors.white} icon="search" bg={colors.primary.themep4} color={colors.primary.themep3} />
                            </SearchMobTabContainer>
                            <SearchDeskContainer>
                                <Button text="Search" bg={colors.primary.themep4} color={colors.primary.themep3}></Button>
                            </SearchDeskContainer>
                            <Text tag="p" text="guided search" color={colors.white} />
                            <CloseGuidedSearch onClick={() => toggleSearch()}>
                                <Button text="" iconcolor={colors.white} icon="close" bg={colors.transparent} color={colors.white} />
                            </CloseGuidedSearch>
                        </GuidedSearchWrapper>
                    }

                </RightSection>
            </FilterWrapper>
        </MuiThemeProvider>
    );
};

Filter.defaultProps = {
};

export default connector(Filter);