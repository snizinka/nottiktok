import axios from "axios";
import { Dispatch } from "redux";
import { UserAction, UserActionTypes } from "../../types/user";

// export const signUp = (email: string, password: string, username: string) => {
//     return async (dispatch: Dispatch<UserAction>) => {
//         try {
//             dispatch({ type: UserActionTypes.SIGN_UP_USER })
//             const data = await fetch('http://localhost:5000/signup', {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: password,
//                     username: username
//                 })
//             }).then(res => res.json());
//             console.log(data.result.confirmationNumber)

//             dispatch({ type: UserActionTypes.SIGN_UP_USER_SUCCESS, payload: data.result.confirmationNumber })
//         } catch (err) {
//             dispatch({ type: UserActionTypes.SIGN_UP_USER_ERROR, payload: 'Error' })
//         }
//     }
// }


export const confirm = (email: string, password: string, username:string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.CONFIRM_USER })
            const data = await fetch('http://localhost:5000/confirm', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username
                })
            }).then(res => res.json());
            console.log(data.result)

            dispatch({ type: UserActionTypes.CONFIRM_USER_SUCCESS, payload: data.result })
        } catch (err) {
            console.log(err)
            dispatch({ type: UserActionTypes.CONFIRM_USER_ERROR, payload: 'Mail not found' })
        }
    }
}

export const userData = (login: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({ type: UserActionTypes.SIGN_USER })
            const data = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                })
            }).then(res => res.json());

            localStorage.setItem('user', data.result === undefined ? '{}' : JSON.stringify(data.result));
            dispatch({ type: UserActionTypes.SIGN_USER_SUCCESS, payload: data.result === undefined ? {} : data.result })
        } catch (err: any) {
            dispatch({ type: UserActionTypes.SIGN_USER_ERROR, payload: 'Wrong username or password' })
            console.log(err)
        }
    }
}

export const userLogout = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({ type: UserActionTypes.LOGOUT_USER })
        localStorage.setItem('user', JSON.stringify({}))
        dispatch({ type: UserActionTypes.LOGOUT_USER_SUCCESS })
    }
}