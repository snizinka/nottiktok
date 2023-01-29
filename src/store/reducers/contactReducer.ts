import { stat } from "fs";
import { ContactAction, ContactActionTypes, ContactState } from "../../types/contact";

const initialState: ContactState = {
    contact: [],
    loading: false,
    error: null,
    localLoading: false
}

export default function contactReducer(state = initialState, action: ContactAction): ContactState {
    switch (action.type) {
        case ContactActionTypes.SEARCH_CONTACT:
            return {
                localLoading: true,
                error: '',
                contact: [],
                loading: state.loading
            }

        case ContactActionTypes.SEARCH_CONTACT_SUCCESS:
            return {
                localLoading: false,
                error: '',
                contact: action.payload,
                loading: state.loading
            }

        case ContactActionTypes.SEARCH_CONTACT_ERROR:
            return {
                localLoading: false,
                error: 'Could not load contacts',
                contact: [],
                loading: state.loading
            }








        case ContactActionTypes.HANDLE_FOLLOW:
            return {
                localLoading: true,
                error: '',
                contact: state.contact,
                loading: state.loading
            }

        case ContactActionTypes.HANDLE_FOLLOW_SUCCESS:
            return {
                localLoading: false,
                error: '',
                contact: state.contact,
                loading: state.loading
            }

        case ContactActionTypes.HANDLE_FOLLOW_ERROR:
            return {
                localLoading: false,
                error: 'Could not load contacts',
                contact: state.contact,
                loading: state.loading
            }

        default:
            return state;
    }
}