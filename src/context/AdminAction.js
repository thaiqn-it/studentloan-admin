import { loadToken } from '../apis/index'
import { userApi } from '../apis/user'
import { JWT_TOKEN } from '../constants/index'
import { USER_TYPE } from '../constants/enum/index'
const { USER_REDUCER_ACTION } = require('./AuthContext')

export const loginUser = async (dispatch, email, password, pushToken) => {
    try {
        dispatch({ type: USER_REDUCER_ACTION.REQUEST_LOGIN })
        const tokenRes = await userApi.login(email, password, USER_TYPE.ADMIN)
        if (tokenRes.status !== 200 || !tokenRes.data.token)
            throw new Error(tokenRes.data.msg)
        const token = tokenRes.data.token

        localStorage.setItem(JWT_TOKEN, token)
        loadToken()
        const userRes = await userApi.getAdminInfo()
        if (userRes.status !== 200 || !userRes.data) throw new Error(userRes.data.msg)
        const data = userRes.data
        console.log(data.pushToken,pushToken)
        if (data.pushToken === null || data.pushToken !== pushToken) {
            await userApi.update({ id: data.id, pushToken })
        }
        const payload = { admin: data, token: token }
        dispatch({
            type: USER_REDUCER_ACTION.LOGIN_SUCCESS,
            payload: payload,
        })
        return userRes
    } catch (err) {
        dispatch({
            type: USER_REDUCER_ACTION.LOGIN_FAILED,
            payload: { error: err },
        })
    }
}

export const logOut = function (dispatch) {
    localStorage.removeItem(JWT_TOKEN)
    dispatch({ type: USER_REDUCER_ACTION.LOG_OUT })
}