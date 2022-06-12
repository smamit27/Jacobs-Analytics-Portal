
import {
    START_NOTIFY_ME_FETCH,
    END_NOTIFY_ME_FETCH,
    RESET_NOTIFY_ME_FETCH,
    TOGGLE_SETTINGS,
    SHOW_PREVIEW,
    HIDE_PREVIEW,
    OPEN_SNACK_BAR,
    CLOSE_SNACK_BAR,
    TOGGLE_HELP,
    SET_SCROLL_VALUE,
    TOGGLE_ALL_ROLES_BUTTON,
    GET_REPORT_LIST_REQUEST,
    GET_REPORT_LIST_SUCCESS,
    GET_REPORT_LIST_FAILURE,
    GET_ROLES_LIST_REQUEST,
    GET_ROLES_LIST_SUCCESS,
    GET_ROLES_LIST_FAILURE,
    GET_USER_DETAILS_FAILED,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_REPORT_LIST_ACCESS,
    GET_REFRESH_DATES,
    UPDATE_REPORT_LIST,
    SET_SELECTED_SECTION,
    UPDATE_MASTER_REPORT_LIST,
    UPDATE_SNACKBAR_STATUS,
    TOGGLE_NOTIFICATIONS,
    GET_AUTH_DETAILS_REQUEST,
} from "./action";

const initState = {
    notifyMeFetchInProgress: false,
    notifyMeFetchResponse: null,
    settingsOpen: false,
    userProfileOpen: false,
    preview: false,
    previewData: {},
    rolesLoader: false,
    reportLoader: false,
    masterReportList: [],
    reportList: [],
    reportAccessList: [],
    refreshDates: [],
    viewingOrder: {},
    scrollValue: 0,
    rolesList: [],
    selectedSection: 'all',
    profileLoader: false,
    employeeDetails: {},
    isSelectedAllRoles: false,
    helpOpen: false,
    snackBarOption: {
        open: false,
        vertical: 'top',
        horizontal: 'right',
        message: 'Added to Favourites'
    }
}

export function commonReducer(state = initState, { payload, type } = {}) {
    switch (type) {
        case SHOW_PREVIEW:
            return {
                ...state,
                preview: true,
                previewData: payload
            };

        case HIDE_PREVIEW:
            return {
                ...state,
                preview: false,
                previewData: {}
            };

        case START_NOTIFY_ME_FETCH:
            return {
                ...state,
                notifyMeFetchInProgress: true,
            };
        case END_NOTIFY_ME_FETCH:
            var response = payload?.success;
            let result = null;

            if (response != null) {
                result = response
            }
            return {
                ...state,
                notifyMeFetchInProgress: false,
                notifyMeFetchResponse: result
            };

        case RESET_NOTIFY_ME_FETCH:
            return {
                ...state,
                notifyMeFetchInProgress: false,
                notifyMeFetchResponse: null
            };

        case TOGGLE_SETTINGS:
            return {
                ...state,
                userProfileOpen: false,
                settingsOpen: !state.settingsOpen,
            };
        case OPEN_SNACK_BAR:
            return {
                ...state,
                snackBarOption: { ...state.snackBarOption, open: true },
            };
        case CLOSE_SNACK_BAR:
            return {
                ...state,
                snackBarOption: { ...state.snackBarOption, open: false },
            };

        case TOGGLE_HELP:
            return {
                ...state,
                settingsOpen: false,
                userProfileOpen: false,
                helpOpen: !state.helpOpen,
            };
        case SET_SCROLL_VALUE:
            return {
                ...state,
                scrollValue: payload
            }

        case TOGGLE_ALL_ROLES_BUTTON:
            return {
                ...state,
                isSelectedAllRoles: payload
            }
        case GET_ROLES_LIST_REQUEST:
            return {
                ...state,
                rolesLoader: true
            }
        case GET_ROLES_LIST_SUCCESS:
            return {
                ...state,
                rolesLoader: false,
                rolesList: payload
            }
        case GET_ROLES_LIST_FAILURE:
            return {
                ...state,
                rolesLoader: false
            }

        case GET_USER_DETAILS_REQUEST:
            return {
                ...state,
                profileLoader: true,
            }
        case GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                profileLoader: false,
                employeeDetails: payload
            }
        case GET_USER_DETAILS_FAILED:
            return {
                ...state,
                profileLoader: false
            }
        case GET_REPORT_LIST_REQUEST:
            return {
                ...state,
                reportLoader: true,
            }
        case GET_REPORT_LIST_SUCCESS:
            return {
                ...state,
                reportLoader: false,
                reportList: payload,
                masterReportList: payload
            }
        case GET_REPORT_LIST_ACCESS: 
            return{ 
                ...state,
                rolesLoader: false,
                reportAccessList: payload
            }
        case GET_REFRESH_DATES: 
            return{
                ...state,
                refreshDates: payload
            }
        case UPDATE_REPORT_LIST:
            return {
                ...state,
                reportList: payload
            }
        case GET_REPORT_LIST_FAILURE:
            return {
                ...state,
                reportLoader: false
            }
        case SET_SELECTED_SECTION:
            return {
                ...state,
                selectedSection: payload
            }
        case UPDATE_MASTER_REPORT_LIST:
            return {
                ...state,
                masterReportList: payload
            }



        case UPDATE_SNACKBAR_STATUS:
            {
                const updatedSnackbar = state.snackBarOption
                return {
                    ...state,
                    snackBarOption: {
                        ...updatedSnackbar,
                        open: payload.open,
                        message: payload.message
                    }

                }
            }
        default:
            return state;
    }
}