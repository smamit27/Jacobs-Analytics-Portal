
import { UPDATE_REPORT_LIST, SET_SELECTED_SECTION } from '../common/action'
import { viewingItem, viewingOrder } from '../../helper'
import { flatten } from 'lodash'
export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const SET_ACTIVE = 'SET_ACTIVE';
export const UPDATE_VIEWING_ORDER = 'UPDATE_VIEWING_ORDER'
export const UPDATE_VIEWING_ITEM = 'UPDATE_VIEWING_ITEM'
export const GET_AREA_LIST_SUCCESS = 'GET_AREA_LIST_SUCCESS'
export const UPDATE_AREA_LIST_REQUEST = 'UPDATE_AREA_LIST_REQUEST'
export const TOGGLE_USER_PROFILE = 'TOGGLE_USER_PROFILE';
export const TOGGLE_NOTIFICATIONS = "TOGGLE_NOTIFICATIONS";

export const toggleFilter = () => async (dispatch) => {
    dispatch({ type: TOGGLE_FILTER })
}

export function setActive(payload) {
    return {
        type: SET_ACTIVE,
        payload: payload
    };
}

export const toggleNotifications = () => async (dispatch) =>
    dispatch({ type: TOGGLE_NOTIFICATIONS })


export const updateViewingOrder = (sortingType, areaList,viewingType) => async (dispatch, getState) => {
    const { common: { masterReportList, rolesList } } = getState()
    const rolesCategoryList = flatten(rolesList.filter(role => role.selected).map(cat => cat.categories))

    const categoriesFromArea = flatten(Object.keys(areaList)
        .filter(area => areaList[area].selected === true)
        .map(area => [...areaList[area].categoryList]))
        .filter(category => rolesCategoryList.includes(category.id))
        .filter(category => category.selected)
        .map(category => `${category.id}`)

    const defaultIndexes = ["100", "101"]

    const filteredReport = masterReportList.filter(sec => defaultIndexes.includes(sec.id) || categoriesFromArea.includes(sec.id))
    // if includes the favourite and new & updated index it will show the respective section sorted as well
    const sortedData = viewingOrder[sortingType.value](filteredReport);
    const filterViewItem = viewingItem[viewingType.value](sortedData);
    dispatch({ type: UPDATE_VIEWING_ORDER, payload: sortingType })
    dispatch({ type: UPDATE_VIEWING_ITEM, payload: viewingType })
    dispatch({ type: UPDATE_REPORT_LIST, payload: filterViewItem })
}


export const clearFilter = () => async (dispatch, getState) => {
    const { common: { masterReportList }, filter: { masterAreaList } } = getState()
    dispatch({ type: UPDATE_AREA_LIST_REQUEST, payload: { ...masterAreaList } })
    dispatch({ type: SET_SELECTED_SECTION, payload: 'all' })
    dispatch({ type: UPDATE_REPORT_LIST, payload: masterReportList })
    dispatch({ type: UPDATE_VIEWING_ORDER, payload: {
        subtype: 'Sorting',
        value: 'AZ'
    } })
    dispatch({ type: UPDATE_VIEWING_ITEM, payload: {
        subtype: 'View',
        value: 'ALL'
    } })
    
}

export const updateAreaList = (updatedList) => async (dispatch) => {
    dispatch({ type: UPDATE_AREA_LIST_REQUEST, payload: { ...updatedList } })
}