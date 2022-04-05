import { loadToken } from '../apis/index'
import { userApi } from '../apis/user'
import { USER_ID, JWT_TOKEN } from '../constants/index'
const { USER_REDUCER_ACTION } = require('./AuthContext')

// export const loginUser = async (dispatch, email, password) => {
//     try {
//         dispatch({ type: USER_REDUCER_ACTION.REQUEST_LOGIN })
//         const tokenRes = await userApi.login(email, password)
//         if (tokenRes.status !== 200 || !tokenRes.data.token)
//             throw new Error(tokenRes.data.msg)
//         const token = tokenRes.data.token

//         localStorage.setItem(JWT_TOKEN, token)
//         loadToken()
//         const userRes = await userApi.getAdminInfo()
//         if (userRes.status !== 200 || !userRes.data) throw new Error(userRes.data.msg)
//         const data = userRes.data
//         // localStorage.setItem(USER_ID, data.id)
//         const payload = { admin: data, token: token }
//         dispatch({
//             type: USER_REDUCER_ACTION.LOGIN_SUCCESS,
//             payload: payload,
//         })
//         return userRes
//     } catch (err) {
//         console.log(err)
//         dispatch({
//             type: USER_REDUCER_ACTION.LOGIN_FAILED,
//             payload: { error: err },
//         })
//     }
// }

// export const logOut = function (dispatch) {
//     localStorage.removeItem(USER_ID)
//     localStorage.removeItem(JWT_TOKEN)
//     dispatch({ type: USER_REDUCER_ACTION.LOG_OUT })
// }

export const loginUser = async (email, password) => {
    try {
        const tokenRes = await userApi.login(email, password)
        if (tokenRes.status !== 200 || !tokenRes.data.token)
            throw new Error(tokenRes.data.msg)
        const token = tokenRes.data.token
        localStorage.setItem(JWT_TOKEN, token)
        loadToken()
        const userRes = await userApi.getAdminInfo()
        if (userRes.status !== 200 || !userRes.data) throw new Error(userRes.data.msg)
        return userRes
    } catch (err) {
        console.log(err)
    }
}

export const logOut = function () {
    localStorage.removeItem(USER_ID)
    localStorage.removeItem(JWT_TOKEN)
}