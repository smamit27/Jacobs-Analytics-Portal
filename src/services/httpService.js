import axios from 'axios'
import { isArray } from 'lodash'
const AUTH = 'Basic SkFBUElVc2VyQGphY29icy5jb206SmFjMGIkQXBpVXNlcg==';
const AUTH_FILE = JSON.parse(localStorage.getItem('JacobsAuth'));

const AUTH_USER = AUTH_FILE?.user_id || '';

export const getReportListService = (AUTH_USER) => new Promise(async (resolve, reject) => {
    axios.get(`https://na1..dm-us.informaticacloud.com/active-bpel/rt/JEG_API_CAT_REPORTS_LIST?EmailAddress=sravan.boggarapu@jacobs.com`,
        {
            headers: {
                'Authorization': AUTH
            }
        })
        .then(res => {
            if (res.data?.Status === "500") {
                reject(res.data)
            }
            resolve(res.data)
        })
        .catch(err => reject(err))
})


export const getUserRolesListService = (AUTH_USER) =>
    new Promise((resolve, reject) => {
        axios.get(`https://na1.ai.dm-us.informaticacloud.com/active-bpel/rt/JEG_API_APP_ROLES?EmailAddress=sravan.boggarapu@jacobs.com`, {
            headers: {
                'Authorization': AUTH
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
})


export const getUserDetailsService = (AUTH_USER) =>
    new Promise((resolve, reject) => {
        axios.get(`https://na1.ai.dm-us.informaticacloud.com/active-bpel/rt/JEG_API_EMPLOYEE_LP_CALL?EmailAddress=sravan.boggarapu@jacobs.com`, {
            headers: {
                'Authorization': AUTH
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
})


export const toggleFavouriteService = (item) =>
    new Promise((resolve, reject) => {
        axios.put('https://na1.ai.dm-us.informaticacloud.com/active-bpel/rt/JEG_API_FAV_REPORT', {
            "ReportId": `${item.ReportId}`,
            "IsFav": `${item.IsFavFlg === 'Y' ? 'N' : 'Y'}`,
            "EmailAddress": `${AUTH_USER}`
        }, {
            headers: {
                'Authorization': AUTH
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
})


export const getReportAccessService = (accessType) =>
    new Promise((resolve, reject) => {
        axios.get(`https://na1.ai.dm-us.informaticacloud.com/active-bpel/rt/JEG_API_GAIN_ACCESS?AccessTypeId=${accessType}`, {
            headers: {
                'Authorization': AUTH
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
})


export const getRefreshDatesService = () =>
    new Promise((resolve, reject) => {
        axios.get(`https://na1.ai.dm-us.informaticacloud.com/active-bpel/rt/JEG_API_REFRESH_DATES`, {
            headers: {
                'Authorization': AUTH
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
})

export const getNotificationsService = (AUTH_USER) =>
    new Promise((resolve, reject) => {
        axios.get(`https://na1.ai.dm-us.informaticacloud.com/active-bpel/rt/JEG_API_NOTIFICATIONS?EmailAddress=sravan.boggarapu@jacobs.com`, {
            headers: {
                'Authorization': AUTH
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
})

export const getNotificationsUpdateService = (popup,notification) =>
    new Promise((resolve, reject) => {
        axios.post(`https://na1.ai.dm-us.informaticacloud.com/active-bpel/rt/JEG_API_NOTIFICATION_UPDATE`, {
                "EmailAddress" : `${AUTH_USER}`,
                "PopupFlag" : `${popup}`,
                "NotificationFlag" : `${notification}`
            },{ headers: {
                'Authorization': AUTH
            }
        })
            .then(res => resolve(res.data))
            .catch(err => reject(err))
})

export const getAuthenticationDetailsService = () =>
    new Promise((resolve, reject) => {
        const baseUrl = window.location.href === 'http://localhost:3000/' ? 'https://jacobsanalyticsportaldev.jacobs.com/' : window.location.href
        axios.get(`${baseUrl}.auth/me`)
            .then(res => {
                if (isArray(res?.data)) {
                    if (res.data.length > 0) {
                        const authData = res?.data[0]
                        localStorage.setItem("JacobsAuth", JSON.stringify(authData))
                        resolve(authData)
                    } else {
                        if(!window.location.hash) {
                            // window.location = window.location + '#loaded';
                            window.location.reload();
                        }
                    }
                } else {
                    if(!window.location.hash) {
                        // window.location = window.location + '#loaded';
                        window.location.reload();
                    }
                }
            })
            .catch(err => {
                if(!window.location.hash) {
                    // window.location = window.location + '#loaded';
                    window.location.reload();
                }
            })
    })


export const logoutService = () =>
    new Promise((resolve, reject) => {
        const baseUrl = window.location.href === 'http://localhost:3000/' ? 'https://jacobsanalyticsportaldev.jacobs.com/' : window.location.href
        axios.post(`${baseUrl}.auth/logout`)
            .then(res => {
                resolve()
            })
            .catch(err => reject(err))
    })