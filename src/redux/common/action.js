
import {
    getReportListService,
    getUserRolesListService,
    getUserDetailsService,
    toggleFavouriteService,
    getAuthenticationDetailsService,
    getReportAccessService,
    getRefreshDatesService,
    getNotificationsService,
    getNotificationsUpdateService,
    logoutService
} from '../../services/httpService'
import { uniqBy } from 'lodash'
// import { notifications } from '../../json/main.json'
import { GET_AREA_LIST_SUCCESS } from '../filter/action'
import { viewingOrder } from '../../helper'

export const START_NOTIFY_ME_FETCH = "START_NOTIFY_ME_FETCH";
export const END_NOTIFY_ME_FETCH = "END_NOTIFY_ME_FETCH";
export const RESET_NOTIFY_ME_FETCH = "RESET_NOTIFY_ME_FETCH";
export const TOGGLE_SETTINGS = "TOGGLE_SETTINGS";
export const SHOW_PREVIEW = 'SHOW_PREVIEW';
export const HIDE_PREVIEW = 'HIDE_PREVIEW';
export const OPEN_SNACK_BAR = 'OPEN_SNACK_BAR';
export const CLOSE_SNACK_BAR = 'CLOSE_SNACK_BAR';
export const TOGGLE_USER_PROFILE = "TOGGLE_USER_PROFILE";
export const TOGGLE_NOTIFICATIONS = "TOGGLE_NOTIFICATIONS";
export const GET_NOTIFICATIONS_REQUEST = "GET_NOTIFICATIONS_REQUEST";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_UPDATE = "GET_NOTIFICATIONS_UPDATE";
export const GET_NOTIFICATIONS_FAILURE = "GET_NOTIFICATIONS_FAILURE";
export const ARCHIVE_NOTIFICATION_REQUEST = "ARCHIVE_NOTIFICATION_REQUEST";
export const ARCHIVE_NOTIFICATION_SUCCESS = "ARCHIVE_NOTIFICATION_SUCCESS";
export const ARCHIVE_NOTIFICATION_FAILURE = "ARCHIVE_NOTIFICATION_FAILURE";
export const TOGGLE_HELP = "TOGGLE_HELP";
export const SET_SCROLL_VALUE = "SET_SCROLL_VALUE"
export const TOGGLE_ALL_ROLES_BUTTON = 'TOGGLE_ALL_ROLES_BUTTON'
export const GET_REPORT_LIST_REQUEST = 'GET_REPORT_LIST_REQUEST'
export const GET_REPORT_LIST_SUCCESS = 'GET_REPORT_LIST_SUCCESS'
export const GET_REPORT_LIST_ACCESS  = 'GET_REPORT_LIST_ACCESS'
export const GET_REFRESH_DATES = 'GET_REFRESH_DATES'
export const UPDATE_REPORT_LIST = 'UPDATE_REPORT_LIST'
export const UPDATE_MASTER_REPORT_LIST = 'UPDATE_MASTER_REPORT_LIST'
export const GET_REPORT_LIST_FAILURE = 'GET_REPORT_LIST_FAILURE'
export const GET_ROLES_LIST_REQUEST = 'GET_ROLES_LIST_REQUEST'
export const GET_ROLES_LIST_SUCCESS = 'GET_ROLES_LIST_SUCCESS'
export const GET_ROLES_LIST_FAILURE = 'GET_ROLES_LIST_FAILURE'
export const UPDATE_ROLES_LIST = 'UPDATE_ROLES_LIST'
export const GET_USER_DETAILS_REQUEST = 'GET_USER_DETAILS_REQUEST'
export const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS'
export const GET_USER_DETAILS_FAILED = 'GET_USER_DETAILS_FAILED'
export const SET_SELECTED_SECTION = 'SET_SELECTED_SECTION'
export const TOGGLE_FAVOURITE_REPORT_REQUEST = 'TOGGLE_FAVOURITE_REPORT_REQUEST'
export const CLEAR_ALL_SECTION = 'CLEAR_ALL_SECTION'
export const UPDATE_SNACKBAR_STATUS = 'UPDATE_SNACKBAR_STATUS'
export const GET_AUTH_DETAILS_REQUEST = 'GET_AUTH_DETAILS_REQUEST'
export const GET_AUTH_DETAILS_SUCCESS = 'GET_AUTH_DETAILS_SUCCESS'
export const GET_AUTH_DETAILS_FAILURE = 'GET_AUTH_DETAILS_FAILURE'
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE'


export function showPreview(payload) {
    return {
        type: SHOW_PREVIEW,
        payload: payload
    };
}

export function hidePreview() {
    return {
        type: HIDE_PREVIEW,
        payload: {
        }
    };
}

export function resetNotifyMeFetch() {
    return {
        type: RESET_NOTIFY_ME_FETCH,
        payload: null
    };
}

export function toggleSettings() {
    return {
        type: TOGGLE_SETTINGS,
    };
}

export function openSnackBar(payload = {}) {
    return {
        type: OPEN_SNACK_BAR,
        payload: payload
    };
}

export function closeSnackBar(payload = {}) {
    return {
        type: CLOSE_SNACK_BAR,
        payload: payload
    }
}

export const toggleUserProfile = () => async (dispatch) => {
    dispatch({ type: TOGGLE_USER_PROFILE })
}


export const toggleNotifications = () => async (dispatch) =>
    dispatch({ type: TOGGLE_NOTIFICATIONS })

export function toggleHelp() {
    return {
        type: TOGGLE_HELP,
    };
}

export function setScrollValue(scrollvalue) {
    return {
        type: SET_SCROLL_VALUE,
        payload: scrollvalue
    }
}


export function toggleSelectAllRoles(status) {
    return {
        type: TOGGLE_ALL_ROLES_BUTTON,
        payload: status
    }
}


export const getNotifications = () => async (dispatch) => {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST })

    await getNotificationsService().then(async (res) => {
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: res.Notifications })
    })
    .catch(err => {
       // dispatch(toggleSnackbar('getReportAccess not updated'))
    })

}
export const getNotificationsUpdate = (popup,notification, notificationList) => async (dispatch) => {

    await getNotificationsUpdateService(popup,notification, notificationList).then(async (res) => {
        dispatch({ type: GET_NOTIFICATIONS_UPDATE, payload: notificationList })
    })
    .catch(err => {
       // dispatch(toggleSnackbar('getReportAccess not updated'))
    })

}

export const archiveNotification = (notificationId) => async (dispatch, getState) => {
    dispatch({ type: ARCHIVE_NOTIFICATION_REQUEST })
    const { filter: { notificationsList } } = getState()
    const updatedList = notificationsList.filter(notification => notification.NotificationFlag !== notificationId)
    dispatch({ type: ARCHIVE_NOTIFICATION_SUCCESS, payload: updatedList })
}

export const getReportList = () => async (dispatch, getState) => {
    dispatch({ type: GET_REPORT_LIST_REQUEST })
    await getReportListService()
        .then(async ({ AreaList }) => {

            const { filter } = getState()

            let categories = uniqBy(AreaList.map(category => ({ id: category.CategoryId, title: category.CategoryName, isViewAll: false, viewAll: "VIEW ALL", })), 'id')

            let updatedData = []

            const favouriteReports = await AreaList.filter(repo => repo.IsFavFlg === 'Y')

            const newReports = await AreaList.filter(repo => repo.NewFlg === 'Y' || repo.UpdateFlg === 'Y')

            if (favouriteReports.length > 0) {
                updatedData.push({
                    id: "100",
                    isViewAll: false,
                    title: "Favorites",
                    viewAll: "VIEW ALL",
                    reportList: favouriteReports
                })
            }
            if (newReports.length > 0) {
                updatedData.push({
                    id: "101",
                    isViewAll: false,
                    title: "New & Updated",
                    viewAll: "VIEW ALL",
                    reportList: newReports
                })
            }


            categories.forEach(category => {
                updatedData.push({
                    ...category,
                    reportList: AreaList.filter(report => report.CategoryId === category.id)
                })
            })


            if (updatedData.length === 0)
                dispatch(toggleSnackbar('Reports Not found'))

                const sortedData = viewingOrder[filter.viewingOrder.value](updatedData)


            dispatch({ type: GET_REPORT_LIST_SUCCESS, payload: sortedData })

            let areaAndCategories = {}
            AreaList.forEach(area => {
                if (areaAndCategories[area.AreaId]) {
                    areaAndCategories[area.AreaId] = {
                        ...areaAndCategories[area.AreaId],
                        categoryList: uniqBy([...areaAndCategories[area.AreaId].categoryList, { areaId: area.AreaId, id: area.CategoryId, name: area.CategoryName, selected: true }], 'id')
                    }
                } else {
                    areaAndCategories[area.AreaId] = {
                        id: area.AreaId,
                        name: area.AreaName,
                        selected: true,
                        categoryList: [{ areaId: area.AreaId, id: area.CategoryId, name: area.CategoryName, selected: true }]
                    }
                }

            })
            // setTimeout(() => {
            //     dispatch(toggleSnackbar('You have new message'))
            // }, 2000)
            dispatch({ type: GET_AREA_LIST_SUCCESS, payload: areaAndCategories })
        })
        .catch((err) => {
            dispatch(toggleSnackbar(err?.Message))
            dispatch({ type: GET_REPORT_LIST_FAILURE, payload: err })
        })
}

export const getRolesList = () => async (dispatch) => {
    dispatch({ type: GET_ROLES_LIST_REQUEST })
    await getUserRolesListService()
        .then(data => {
            const appRoles = data.AppRoles

            const uniQued = uniqBy(appRoles, 'Roleid')

            const finalResult = []

            uniQued.forEach(roles => {
                finalResult.push({
                    ...roles,
                    categories: appRoles.filter(role => role.Roleid === roles.Roleid).map(cate => cate.CategoryId)
                })
            })

            dispatch({ type: GET_ROLES_LIST_SUCCESS, payload: finalResult.map(role => ({ ...role, selected: true })) })
        })
        .catch(err => dispatch({ type: GET_ROLES_LIST_FAILURE, payload: err }))
}

export const getUserDetails = () => async (dispatch) => {
    dispatch({ type: GET_USER_DETAILS_REQUEST })
    await getUserDetailsService()
        .then(res => dispatch({ type: GET_USER_DETAILS_SUCCESS, payload: res?.EmpDetails[0] }))
        .catch(err => dispatch({ type: GET_USER_DETAILS_FAILED, payload: err }))
}

export const updateRolesList = (updatedList) => async (dispatch) => {
    dispatch({ type: UPDATE_ROLES_LIST })
    dispatch({ type: GET_ROLES_LIST_SUCCESS, payload: updatedList })
}

export const updateReportList = (updatedList) => async (dispatch) => {
    dispatch({ type: UPDATE_REPORT_LIST, payload: [...updatedList] })
}


export const setSelectedSection = (index) => async (dispatch) => {
    dispatch({ type: SET_SELECTED_SECTION, payload: index })
}

export const clearAllSelection = () => async (dispatch, getState) => {
    const { common: { reportList } } = getState()
    dispatch({ type: CLEAR_ALL_SECTION })
    const updatedReportList = reportList.map(report => ({ ...report, isViewAll: false }))
    dispatch({ type: UPDATE_REPORT_LIST, payload: updatedReportList })
}


export const toggleFavourite = (item, preview) => async (dispatch, getState) => {

    await toggleFavouriteService(item)
        .then(async (res) => {
            const message = item.IsFavFlg === 'Y' ? 'Removed from Favourites' : 'Added to Favourites'
            dispatch(toggleSnackbar(message))
            if (preview) {
                const updatedItem = item
                updatedItem.IsFavFlg = updatedItem.IsFavFlg === 'Y' ? 'N' : 'Y'
                dispatch({ type: SHOW_PREVIEW, payload: updatedItem })
            }
            dispatch(updateEntireReportList())
        })
        .catch(err => {
            dispatch(toggleSnackbar('Favourites not updated'))
        })
}
export const getReportAccess = (accessType) => async(dispatch,getState) => {

    await getReportAccessService(accessType).then(async (res) => {
        dispatch({ type: GET_REPORT_LIST_ACCESS, payload: res.GainAccessType })
    })
    .catch(err => {
       // dispatch(toggleSnackbar('getReportAccess not updated'))
    })
}
export const getRefreshDates = () => async(dispatch,getState) => {
    await getRefreshDatesService().then(async(res) => {
        dispatch({ type: GET_REFRESH_DATES, payload: res.RefreshDates })

    })
    .catch(err =>{
       // dispatch(toggleSnackbar('getRefreshDates not updated'))

    })
}


export const updateEntireReportList = (item) => async (dispatch, getState) => {
    await getReportListService()
        .then(async ({ AreaList }) => {
            const { common: { selectedSection } } = getState()
            let categories = uniqBy(AreaList.map(category => ({ id: category.CategoryId, title: category.CategoryName, isViewAll: selectedSection === category.CategoryId ? true : false, viewAll: "VIEW ALL", })), 'id')

            const { filter } = getState()

            let updatedData = []

            const favouriteReports = await AreaList.filter(repo => repo.IsFavFlg === 'Y')

            const newReports = await AreaList.filter(repo => repo.NewFlg === 'Y' || repo.UpdateFlg === 'Y')

            if (favouriteReports.length > 0) {
                updatedData.push({
                    id: "100",
                    isViewAll: selectedSection === "100" ? true : false,
                    title: "Favorites",
                    viewAll: "VIEW ALL",
                    reportList: favouriteReports
                })
            }
            if (newReports.length > 0) {
                updatedData.push({
                    id: "101",
                    isViewAll: selectedSection === "101" ? true : false,
                    title: "New & Updated",
                    viewAll: "VIEW ALL",
                    reportList: newReports
                })
            }


            categories.forEach(catego => {
                updatedData.push({
                    ...catego,
                    reportList: AreaList.filter(report => report.CategoryId === catego.id)
                })
            })

            const sortedData = viewingOrder[filter.viewingOrder.value](updatedData)

            dispatch({ type: GET_REPORT_LIST_SUCCESS, payload: sortedData })


        })
        .catch((err) => {
            dispatch(toggleSnackbar(err?.Message))
            dispatch({ type: GET_REPORT_LIST_FAILURE, payload: err })
        })
}


export const getAuthenticationDetails = () =>
    async (dispatch) => {
        dispatch({ type: GET_AUTH_DETAILS_REQUEST })
        await getAuthenticationDetailsService()
            .then(response => {
                dispatch({ type: GET_AUTH_DETAILS_SUCCESS, payload: response })
                dispatch(getReportList())
                dispatch(getRolesList())
                dispatch(getUserDetails())
                dispatch(getNotifications())
                dispatch(getRefreshDates())
            }).catch(error => {
                dispatch({ type: GET_AUTH_DETAILS_FAILURE, payload: error })
            })
    }


export const toggleSnackbar = (message) => async (dispatch) => {
    dispatch({
        type: UPDATE_SNACKBAR_STATUS, payload: {
            open: true,
            message
        }
    })

    setTimeout(() => {
        dispatch({
            type: UPDATE_SNACKBAR_STATUS, payload: {
                open: false,
                message
            }
        })
    }, 2000)
}

export const logoutUser = () =>
    async (dispatch) => {
        dispatch({ type: USER_LOGOUT_REQUEST })
        await logoutService()
            .then(() => {
                window.location.reload()
                dispatch({ type: USER_LOGOUT_SUCCESS })
            })
            .catch(err => dispatch({ type: USER_LOGOUT_FAILURE, payload: err }))
    }