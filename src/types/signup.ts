export interface SignUpState {
    signLoading: boolean,
    mail: boolean | null,
    usern: boolean | null,
    signUpError: string | null,
    created: boolean
}

export enum SignUpActionTypes {
    CHECK_SIGN_UP = 'CHECK_SIGN_UP',
    CHECK_SIGN_UP_SUCCESS = 'CHECK_SIGN_UP_SUCCESS',
    CHECK_SIGN_UP_ERROR = 'CHECK_SIGN_UP_ERROR',


    SIGN_UP_SIGN_UP = 'SIGN_UP_SIGN_UP',
    SIGN_UP_SIGN_UP_SUCCESS = 'SIGN_UP_SIGN_UP_SUCCESS',
    SIGN_UP_SIGN_UP_ERROR = 'SIGN_UP_SIGN_UP_ERROR',

    CANCEL_SIGN_UP = 'CANCEL_SIGN_UP' 
}

interface CheckSignUpAction {
    type: SignUpActionTypes.CHECK_SIGN_UP
}

interface CheckSignUpSuccessAction {
    type: SignUpActionTypes.CHECK_SIGN_UP_SUCCESS,
    payload: any
}

interface CheckSignUpErrorAction {
    type: SignUpActionTypes.CHECK_SIGN_UP_ERROR,
    payload: string
}



interface CancelSignUpAction {
    type: SignUpActionTypes.CANCEL_SIGN_UP
}



interface SignUpSignUpAction {
    type: SignUpActionTypes.SIGN_UP_SIGN_UP
}

interface SignUpSignUpSuccessAction {
    type: SignUpActionTypes.SIGN_UP_SIGN_UP_SUCCESS,
    payload: any
}

interface SignUpSignUpErrorAction {
    type: SignUpActionTypes.SIGN_UP_SIGN_UP_ERROR,
    payload: string
}

export type SignUpAction = CheckSignUpAction | CheckSignUpSuccessAction | CheckSignUpErrorAction
| SignUpSignUpAction | SignUpSignUpSuccessAction | SignUpSignUpErrorAction
| CancelSignUpAction