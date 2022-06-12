import { TOGGLE_FILTER, SET_ACTIVE, UPDATE_VIEWING_ORDER,UPDATE_VIEWING_ITEM, GET_AREA_LIST_SUCCESS, UPDATE_AREA_LIST_REQUEST, TOGGLE_USER_PROFILE } from "./action";
import {
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_FAILURE,
    ARCHIVE_NOTIFICATION_REQUEST,
    ARCHIVE_NOTIFICATION_SUCCESS,
    TOGGLE_NOTIFICATIONS,
    GET_NOTIFICATIONS_UPDATE
} from '../common/action'
const initState = {
    open: false,
    userProfile: false,
    notifications: false,
    notificationLoader: false,
    notificationsList: [],
    active: [1, 4, 5, 7],
    viewingOrder: {
        subtype: 'Sorting',
        value: 'AZ'
    },
    viewingItem: {
        subtype: 'View',
        value: 'ALL'
    },
    masterAreaList: {},
    areaList: {}
}

export function filterReducer(state = initState, { type, payload } = {}) {
    switch (type) {

        case TOGGLE_FILTER:
            return {
                ...state,
                open: !state.open,
                userProfile: state.userProfile === true && false,
                notifications: state.notifications === true && false
            };

        case TOGGLE_USER_PROFILE:
            return {
                ...state,
                userProfile: !state.userProfile,
                open: state.open === true ? false : state.open,
                notifications: state.notifications === true && false
            }

        case SET_ACTIVE:
            return {
                ...state,
                active: payload,
            };
        case UPDATE_VIEWING_ORDER:
            return {
                ...state,
                viewingOrder: payload
            };
            case UPDATE_VIEWING_ITEM:
                return {
                    ...state,
                    viewingItem: payload
            };
        case GET_AREA_LIST_SUCCESS:
            return {
                ...state,
                areaList: payload,
                masterAreaList: payload
            }
        case UPDATE_AREA_LIST_REQUEST:
            return {
                ...state,
                areaList: payload
            }

        case TOGGLE_NOTIFICATIONS:
            return {
                ...state,
                notifications: !state.notifications,
               // userProfile: state.userProfile === true && false,
            }

        case GET_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                notificationLoader: true
            }

        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notificationLoader: false,
                notificationsList: payload
            }
        case GET_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                notificationLoader: false,
            }

        case ARCHIVE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notificationsList: payload
            }
        case GET_NOTIFICATIONS_UPDATE: 
            return {
                ...state,
                notificationsList: payload
            }
        default:
            return state;
    }
}