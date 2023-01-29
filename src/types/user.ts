export interface UserState {
    user: any;
    loading: boolean;
    error: null | string;
    confirmation: null | string;
    tempUsername: any;
    tempMail: any;
    tempPassword: any;
}

export enum UserActionTypes {
    SIGN_USER = 'SIGN_USER',
    SIGN_USER_SUCCESS = 'SIGN_USER_SUCCESS',
    SIGN_USER_ERROR = 'SIGN_USER_ERROR',

    CONFIRM_USER = 'CONFIRM_USER',
    CONFIRM_USER_SUCCESS = 'CONFIRM_USER_SUCCESS',
    CONFIRM_USER_ERROR = 'CONFIRM_USER_ERROR',

    SIGN_UP_USER = 'SIGN_UP_USER',
    SIGN_UP_USER_SUCCESS = 'SIGN_UP_USER_SUCCESS',
    SIGN_UP_USER_ERROR = 'SIGN_UP_USER_ERROR',

    LOGOUT_USER = 'LOGOUT_USER',
    LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS',
    LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR'
}

interface SignUserAction {
    type: UserActionTypes.SIGN_USER
}

interface SignUserSuccessAction {
    type: UserActionTypes.SIGN_USER_SUCCESS,
    payload: any[]
}

interface SignUserErrorAction {
    type: UserActionTypes.SIGN_USER_ERROR,
    payload: string
}



interface ConfirmAction {
    type: UserActionTypes.CONFIRM_USER
}

interface ConfirmSuccessAction {
    type: UserActionTypes.CONFIRM_USER_SUCCESS,
    payload: any
}

interface ConfirmErrorAction {
    type: UserActionTypes.CONFIRM_USER_ERROR,
    payload: string
}




interface SignUpAction {
    type: UserActionTypes.SIGN_UP_USER
}

interface SignUpSuccessAction {
    type: UserActionTypes.SIGN_UP_USER_SUCCESS,
    payload: string
}

interface SignUpErrorAction {
    type: UserActionTypes.SIGN_UP_USER_ERROR,
    payload: string
}




interface LogoutUserAction {
    type: UserActionTypes.LOGOUT_USER
}

interface LogoutUserSuccessAction {
    type: UserActionTypes.LOGOUT_USER_SUCCESS
}

interface LogoutUserErrorAction {
    type: UserActionTypes.LOGOUT_USER_ERROR,
    payload: string
}

export type UserAction = SignUserAction | SignUserSuccessAction | SignUserErrorAction | LogoutUserAction | LogoutUserSuccessAction | LogoutUserErrorAction
| ConfirmAction | ConfirmSuccessAction | ConfirmErrorAction
|SignUpAction | SignUpSuccessAction | SignUpErrorAction