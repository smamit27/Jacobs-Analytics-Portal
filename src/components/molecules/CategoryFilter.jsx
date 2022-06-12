import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { Text, Icon, Button } from './../atoms';
import filterlist from "../../json/categoryfilter.json";
import { flatten, orderBy } from 'lodash'
import { device, colors } from '../../theme';
import { Tooltip, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { connect } from "react-redux";
import { toggleFilter, updateViewingOrder, clearFilter, updateAreaList } from "./../../redux/filter/action";

const connectedProps = (state) => ({
    open: state.filter.open,
    viewingOrder: state.filter.viewingOrder,
    viewingItem: state.filter.viewingItem,
    areaList: state.filter.areaList,
    rolesList: state.common.rolesList
});

const connectionActions = {
    toggleFilter: toggleFilter,
    updateViewingOrder: updateViewingOrder,
    clearFilter,
    updateAreaList
}

var connector = connect(connectedProps, connectionActions);

export const CategoryFilterWrapper = styled.section`
    background: ${colors.primary.themep2};
    padding: 20px 0px 20px 25px ;
    scroll-behavior: smooth;
    top: 0;
    width: 100%;
    z-index: 3;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height: 100vh;
    @media only screen and ${device.mobileL} {
        min-width: 375px;
        position: absolute;
    }
    @media only screen and ${device.tabletM}{
        width: 245px;
    }
    &::-webkit-scrollbar {
        width: 5px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${colors.black};
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`

export const FilterHeading = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: ${colors.white};
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;

    &.with-margin{
        width:93%;
    }
`

export const FilterTypeList = styled.div`
    border-bottom: solid 1px ${colors.primary.white20};
`

export const FilterTypeHeading = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    align-items: center;
    cursor: pointer;
    &.last--subcat{
        border-bottom: 0;
    }
`

export const FilterSubTypeListCont = styled.div`    
`

export const SubCategoryList = styled.div`
    
`

export const FilterSubTypeList = styled.div`
    button{
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
        padding-left: 0;
        padding-right: 0;
        width: 100%;
        border-bottom:  ${(props) => (!props.brdrn ? 'solid 1px ' + colors.primary.white20 : 'none')} ;
        text-align: left;
        div{
            margin-right: 10px;
        }
    }
    .last--subcat{
        button{
            border-bottom: 0;
        }
    }
`

export const ShowMoreLessWrapper = styled.div`
    button{
        justify-content: center;
        text-align: center;
        border-bottom: 0;
    }
`

export const ButtonWrapper = styled.div`
    padding-top: 55px;
    margin-right: 25px;
    button{
        width: 100%;
        text-align: center;
        justify-content: center;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 18px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.01em;
        &:hover {
            opacity: 0.8;
        }
    }
`

export const MobileCloseWrapper = styled.div`
    button{
        padding-top: 0 !important;
        padding-right: 0;        
    }
`

const FilterActionSection = styled.div`
  
`
const FiltersWrapper = styled.div`
    max-height: calc(100vh - 250px);
    padding-right: 25px;
    overflow-y: auto;
`

export const CategoryFilter = (props) => {
    const [showMore, setShowMore] = useState(false);
    const [enableApplyFilter, setEnableApplyFilter] = useState(true);
    const [filterByCatList] = useState(filterlist);
    const [showhide, setShowhide] = useState({ cat: {} });
    const [showSortingOrder, setSortingOrder] = useState(false)
    const [showViewingItem,setViewingItem] = useState(false);
    const [sortingType, setSortingType] = useState(JSON.parse(JSON.stringify(props.viewingOrder)))
    const [viewingType, setViewingType] = useState(JSON.parse(JSON.stringify(props.viewingItem)))
    const [areaType, setArea] = useState(JSON.parse(JSON.stringify(props.areaList)))
    const filterRef = useRef(null)
    const rolesCategoryList = flatten(props.rolesList.filter(role => role.selected).map(cat => cat.categories))

    const showMoreCategories = () => {
        setShowMore(!showMore);
    };


    const theme = createMuiTheme({
        overrides: {
            MuiTooltip: {
                tooltip: {
                    fontSize: "1.1rem",
                }
            }
        }
    });

    const handleSelectSortingOrder = (type) => {
        setEnableApplyFilter(true);
        setSortingType(type)
        setSortingOrder(false)
    }
    const handleSelectViewingItem = (type) => {
       setEnableApplyFilter(true);
        setViewingType(type)
        setViewingItem(false)
    }

    const ToggleClearFilter = async () => {
        await props.clearFilter()
        await props.toggleFilter()
    }

    const expandCollapse = (index) => {
        let oldValue = showhide;
        oldValue.cat[index] = !oldValue.cat[index];
        setShowhide({
            cat: oldValue.cat
        });
    }

    const saveFilter = async () => {
        await props.updateAreaList(areaType)
        await props.toggleFilter()
        sortingType.subtype !== 'None' && viewingType.subtype !== 'None' && await props.updateViewingOrder(sortingType, areaType,viewingType)

    }

    const categoriesFromArea = flatten(Object.keys(areaType)
        .filter(area => areaType[area].selected === true)
        .map(area => [...areaType[area].categoryList]))
        .filter(cate => rolesCategoryList.includes(cate.id))

    const sortedCategoriesData = orderBy(categoriesFromArea, 'name', 'asc')
    const isAllCategorySelected = () => categoriesFromArea.length > 0 && categoriesFromArea.every(category => category.selected === true)
    const isAllAreaSelected = Object.keys(areaType).length > 0 && Object.keys(areaType).every(area => areaType[area].selected === true)
    const isSomeAreaSelected = Object.keys(areaType).length > 0 && Object.keys(areaType).some(area => areaType[area].selected === true)
    const isSomeCategorySelected = categoriesFromArea.length > 0 && categoriesFromArea.some(category => category.selected === true)
    const toggleAllCategories = async () => {
        const oldData = {}
        const updatedData = {}
        Object.keys(areaType).forEach(area => {
            if (areaType[area].selected === true) {
                oldData[area] = areaType[area]
            }
        })

        const isAllSelected = await isAllCategorySelected()

        Object.keys(oldData).forEach(area => {
            updatedData[area] = {
                ...oldData[area],
                categoryList: oldData[area].categoryList.map(category => ({ ...category, selected: !isAllSelected }))
            }
        })

        setArea({ ...updatedData })


    }


    const toggleAllArea = () => {
        let currentArea = props.areaList
        const updatedData = {}
        Object.keys(currentArea).forEach(area => {
            updatedData[area] = { ...currentArea[area], selected: !isAllAreaSelected }
        })

        setArea({ ...updatedData })

    }


    const selectArea = (selectedArea) => {
        let currentArea = areaType

        currentArea[selectedArea].selected = !currentArea[selectedArea].selected
        setArea({ ...currentArea })
    }


    const toggleSelectedCategory = (subitem) => {
        let currentArea = areaType

        currentArea[subitem.areaId] = {
            ...currentArea[subitem.areaId],
            categoryList: currentArea[subitem.areaId].categoryList.map(cate => cate.id === subitem.id ? {
                ...cate,
                selected: !cate.selected
            } : cate)
        }

        setArea({ ...currentArea })

    }

    const sortedArea = orderBy(Object.keys(areaType).map(area => areaType[area]), 'name', 'asc')

    return (
        <CategoryFilterWrapper ref={filterRef}>
            <MuiThemeProvider theme={theme}>


                <FilterActionSection>
                    <FilterHeading className="with-margin">
                        <Text tag="h4" text={filterByCatList.categories.heading} color={colors.white} />
                        <MobileCloseWrapper onClick={() => props.toggleFilter()}>
                            <Button text="" iconcolor={colors.white} bg={colors.transparent} color={colors.white} icon='close' />
                        </MobileCloseWrapper>
                    </FilterHeading>
                    <FiltersWrapper>
                        <FilterTypeList key={0}>
                            <FilterTypeHeading onClick={() => expandCollapse(0)}>
                                <Text tag="h5" text="Area" color={colors.white} />
                                <Icon name={showhide.cat[0] ? 'chevronup' : 'chevrondown'} color={colors.white} />
                            </FilterTypeHeading>
                            {
                                showhide.cat[0] &&
                                <FilterSubTypeListCont>
                                    <FilterSubTypeList>
                                        <SubCategoryList onClick={() => toggleAllArea()}>
                                            <Button text="All   Area" bg={colors.transparent} iconcolor={isAllAreaSelected ? colors.primary.themep3 : colors.white} icon="select" opacity={isAllAreaSelected ? "1" : "0.2"} />
                                        </SubCategoryList>
                                        {sortedArea.map((subitem, subindex) =>
                                            <SubCategoryList className={((showMore && subindex === sortedArea.length - 1) ? "last--subcat" : '')} onClick={() => selectArea(subitem.id)} key={subindex}>
                                                <Button text={subitem.name} bg={colors.transparent} iconcolor={subitem.selected ? colors.primary.themep3 : colors.white} opacity={subitem.selected ? "1" : "0.2"} icon="select" />
                                            </SubCategoryList>
                                        )}
                                    </FilterSubTypeList>
                                </FilterSubTypeListCont>
                            }
                        </FilterTypeList>


                        {isSomeAreaSelected && (
                            <FilterTypeList key={1}>
                                <FilterTypeHeading onClick={() => expandCollapse(1)}>
                                    <Text tag="h5" text="Categories" color={colors.white} />
                                    <Icon name={showhide.cat[1] ? 'chevronup' : 'chevrondown'} color={colors.white} />
                                </FilterTypeHeading>
                                {
                                    showhide.cat[1] &&
                                    <FilterSubTypeListCont>
                                        <FilterSubTypeList>
                                            <SubCategoryList onClick={() => toggleAllCategories()}>
                                                <Button text="All Categories" bg={colors.transparent} iconcolor={isAllCategorySelected() ? colors.primary.themep3 : colors.white} icon="select" opacity={isAllCategorySelected() ? "1" : "0.2"} />
                                            </SubCategoryList>
                                            {sortedCategoriesData.map((subitem, subindex) =>
                                                <SubCategoryList className={((showMore && subindex === sortedCategoriesData.length - 1) ? "last--subcat" : '')} onClick={() => toggleSelectedCategory(subitem)} key={subindex}>
                                                    <Button text={subitem.name} bg={colors.transparent} iconcolor={subitem.selected ? colors.primary.themep3 : colors.white} opacity={subitem.selected ? "1" : "0.2"} icon="select" />
                                                </SubCategoryList>
                                            )}
                                        </FilterSubTypeList>
                                    </FilterSubTypeListCont>
                                }
                            </FilterTypeList>
                        )}
                        <FilterHeading>
                            <Text tag="h4" text={filterByCatList.sorting.heading} color={colors.white} />
                        </FilterHeading>
                        {filterByCatList.sorting.view.map((item, index) =>
                            <FilterTypeList key={index}>
                                <FilterTypeHeading onClick={() => setViewingItem(!showViewingItem)} className={index === filterByCatList.sorting.view.length - 1 ? "last--subcat" : ""}>
                                    <Text tag="h5" text={viewingType?.subtype} color={colors.white} />
                                    {item.lock && <Icon name="lock" color={colors.white} />}
                                    {!item.lock && <Icon name="chevrondown" color={colors.white} />}                                    
                                </FilterTypeHeading>
                                {
                                    item.subcategories.length > 0 && showViewingItem &&
                                    <FilterSubTypeListCont>
                                        <FilterSubTypeList brdrn={true}>
                                            {item.subcategories.map((subview, subindex) =>
                                             
                                                <SubCategoryList className={(!showMore && subindex === 8) || (showMore && subindex === item.subcategories.length ) ? "last--subcat" : ""} onClick={() => handleSelectViewingItem(subview)} key={subindex}>
                                                    {
                                                        ((item.type === 'View' || item.type === "All") && showMore && subindex >= 9) &&
                                                        <Button text={subview.subtype} bg={colors.transparent} />
                                                        
                                                    }
                                                    {
                                                        ((item.type === 'View' || item.type === "All") && subindex < 9) &&
                                                        <Button text={subview.subtype} bg={colors.transparent} />
                                                    }
                                                </SubCategoryList>
                                            )}
                                            {
                                                item.type === "Categories" &&
                                                <ShowMoreLessWrapper onClick={() => showMoreCategories()}>
                                                    <Button text={showMore ? "Show Less" : "Show More"} color={colors.primary.themep2} bg={colors.transparent} />
                                                </ShowMoreLessWrapper>
                                            }
                                        </FilterSubTypeList>
                                    </FilterSubTypeListCont>
                                }
                            </FilterTypeList>
    
                        )}
                        {filterByCatList.sorting.list.map((item, index) =>
                            <FilterTypeList key={index}>
                                <FilterTypeHeading onClick={() => setSortingOrder(!showSortingOrder)} className={index === filterByCatList.sorting.list.length - 1 ? "last--subcat" : ""}>
                                    <Text tag="h5" text={sortingType?.subtype} color={colors.white} />
                                    {item.lock && <Icon name="lock" color={colors.white} />}
                                    {!item.lock && <Icon name="chevrondown" color={colors.white} />}
                                </FilterTypeHeading>
                                {
                                    item.subcategories.length > 0 && showSortingOrder &&
                                    <FilterSubTypeListCont>
                            
                                        <FilterSubTypeList brdrn={true}>
                                            {item.subcategories.map((subitem, subindex) =>
                                                <SubCategoryList className={(!showMore && subindex === 8) || (showMore && subindex === item.subcategories.length - 1) ? "last--subcat" : ""} onClick={() => handleSelectSortingOrder(subitem)} key={subindex}>
                                                    {
                                                        ((item.type === 'Sorting' || item.type === "A-Z") && showMore && subindex >= 9) &&
                                                        <Button text={subitem.subtype} bg={colors.transparent} />
                                                    }
                                                    {
                                                        ((item.type === 'Sorting' || item.type === "A-Z") && subindex < 9) &&
                                                        <Button text={subitem.subtype} bg={colors.transparent} />
                                                    }
                                                </SubCategoryList>
                                            )}
                                            {
                                                item.type === "Categories" &&
                                                <ShowMoreLessWrapper onClick={() => showMoreCategories()}>
                                                    <Button text={showMore ? "Show Less" : "Show More"} color={colors.primary.themep2} bg={colors.transparent} />
                                                </ShowMoreLessWrapper>
                                            }
                                        </FilterSubTypeList>
                                    </FilterSubTypeListCont>
                                }
                            </FilterTypeList>
                        
                        
                        )}

                    </FiltersWrapper>
                </FilterActionSection>
                {(isSomeAreaSelected && isSomeCategorySelected) && (<ButtonWrapper categoryExpand={showhide} mainRef={filterRef}>
                    {/* <div onClick={() => applyFilter()}> */}
                    <div onClick={() => saveFilter()}>
                        <Button text={filterByCatList.applyfilter} color={enableApplyFilter ? colors.black : colors.black} bg={enableApplyFilter ? colors.white : colors.white} />
                    </div>
                    <div onClick={() => ToggleClearFilter()}>
                        <Button text={filterByCatList.clearfilter} color={enableApplyFilter ? colors.white : colors.white} bg={colors.transparent} />
                    </div>
                </ButtonWrapper>)}


                {(!isSomeAreaSelected || !isSomeCategorySelected) && (<ButtonWrapper categoryExpand={showhide} mainRef={filterRef}>
                    {/* <div onClick={() => applyFilter()}> */}
                    <Tooltip title="Please select any area/category">
                        <div>
                            <Button text={filterByCatList.applyfilter} color={enableApplyFilter ? colors.black : colors.black} bg={enableApplyFilter ? colors.white : colors.white} />
                        </div>
                    </Tooltip>
                    <Tooltip title="Please select any area/category">
                        <div>
                            <Button text={filterByCatList.clearfilter} color={enableApplyFilter ? colors.white : colors.white} bg={colors.transparent} />
                        </div>
                    </Tooltip>
                </ButtonWrapper>)}
            </MuiThemeProvider>
        </CategoryFilterWrapper>




    );
};

CategoryFilter.defaultProps = {};

export default connector(CategoryFilter);