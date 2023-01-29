import { SignUpAction, SignUpActionTypes, SignUpState } from "../../types/signup";

const initialState: SignUpState = {
    signLoading: false,
    mail: false,
    usern: false,
    signUpError: null,
    created: false
}

export default function signupReducer(state = initialState, action: SignUpAction): SignUpState {
    switch (action.type) {
        case SignUpActionTypes.CHECK_SIGN_UP:
            return {
                signLoading: true,
                mail: false,
                usern: false,
                signUpError: '',
                created: false
            }

        case SignUpActionTypes.CHECK_SIGN_UP_SUCCESS:
            return {
                signLoading: false,
                mail: action.payload.email.length > 0 ? true : false,
                usern: action.payload.username.length > 0 ? true : false,
                signUpError: '',
                created: false
            }

        case SignUpActionTypes.CHECK_SIGN_UP_ERROR:
            return {
                signLoading: false,
                mail: false,
                usern: false,
                signUpError: action.payload,
                created: false
            }



        case SignUpActionTypes.CANCEL_SIGN_UP:
            return {
                signLoading: false,
                mail: false,
                usern: false,
                signUpError: '',
                created: false
            }



        case SignUpActionTypes.SIGN_UP_SIGN_UP:
            return {
                signLoading: true,
                mail: false,
                usern: false,
                signUpError: '',
                created: false
            }

        case SignUpActionTypes.SIGN_UP_SIGN_UP_SUCCESS:
            return {
                signLoading: false,
                mail: false,
                usern: false,
                signUpError: '',
                created: true
            }

        case SignUpActionTypes.SIGN_UP_SIGN_UP_ERROR:
            return {
                signLoading: false,
                mail: false,
                usern: false,
                signUpError: action.payload,
                created: false
            }
        default:
            return state;
    }
}