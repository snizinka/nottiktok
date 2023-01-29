import { stat } from "fs";
import { UserAction, UserActionTypes, UserState } from "../../types/user";

const initialState: UserState = {
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    loading: false,
    error: null,
    confirmation: null,
    tempUsername: '',
    tempMail: '',
    tempPassword: ''
}

export default function userReducer(state = initialState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionTypes.SIGN_USER:
            return {
                loading: true,
                user: state.user,
                error: null,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }

        case UserActionTypes.SIGN_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: null,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }

        case UserActionTypes.SIGN_USER_ERROR:
            return {
                loading: false,
                user: {},
                error: action.payload,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }

        case UserActionTypes.CONFIRM_USER:
            return {
                loading: true,
                user: {},
                error: null,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }

        case UserActionTypes.CONFIRM_USER_SUCCESS:
            return {
                loading: false,
                user: {},
                error: null,
                confirmation: action.payload.confirmationNumber,
                tempUsername: action.payload.username,
                tempMail: action.payload.email,
                tempPassword: action.payload.password
            }

        case UserActionTypes.CONFIRM_USER_ERROR:
            return {
                loading: false,
                user: {},
                error: action.payload,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }





        case UserActionTypes.SIGN_UP_USER:
            return {
                loading: true,
                user: {},
                error: null,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }

        case UserActionTypes.SIGN_UP_USER_SUCCESS:
            return {
                loading: false,
                user: {},
                error: null,
                confirmation: action.payload,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }

        case UserActionTypes.SIGN_UP_USER_ERROR:
            return {
                loading: false,
                user: {},
                error: action.payload,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }




        case UserActionTypes.LOGOUT_USER:
            return {
                loading: true,
                user: {},
                error: null,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }

        case UserActionTypes.LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                user: {},
                error: null,
                confirmation: null,
                tempUsername: '',
                tempMail: '',
                tempPassword: ''
            }

        default:
            return state;
    }
}