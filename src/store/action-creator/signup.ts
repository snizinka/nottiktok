import axios from "axios";
import { Dispatch } from "redux"
import { SignUpAction, SignUpActionTypes } from "../../types/signup"


export const cancelSignUp = () => {
    return async (dispatch: Dispatch<SignUpAction>) => {
        dispatch({type: SignUpActionTypes.CANCEL_SIGN_UP})
    }
}

export const chck = (email: string, username: string) => {
    return async (dispatch: Dispatch<SignUpAction>) => {
        try {
            dispatch({type: SignUpActionTypes.CHECK_SIGN_UP})
            const data = await fetch('http://localhost:5000/checkdata', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username
                })
            }).then(res => res.json());
            dispatch({type: SignUpActionTypes.CHECK_SIGN_UP_SUCCESS, payload: data.result})
        } catch (err) {
            dispatch({type: SignUpActionTypes.CHECK_SIGN_UP_ERROR, payload: ''})
        }
    }
}

export const signUp = (email: string, password: string, username: string) => {
    return async (dispatch: Dispatch<SignUpAction>) => {
        try {
            dispatch({type: SignUpActionTypes.SIGN_UP_SIGN_UP})
            const data = await fetch('http://localhost:5000/signup', {
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

            dispatch({type: SignUpActionTypes.SIGN_UP_SIGN_UP_SUCCESS, payload: data.result})
        } catch (err) {
            dispatch({type: SignUpActionTypes.SIGN_UP_SIGN_UP_ERROR, payload: ''})
            console.log('ono')
        }
    }
}