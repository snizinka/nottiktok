export interface ContactState {
    contact: any[] | any;
    loading: boolean;
    error: null | string;
    localLoading: boolean;
}

export enum ContactActionTypes {
    SEARCH_CONTACT = 'SEARCH_CONTACT',
    SEARCH_CONTACT_SUCCESS = 'SEARCH_CONTACT_SUCCESS',
    SEARCH_CONTACT_ERROR = 'SEARCH_CONTACT_ERROR',

    HANDLE_FOLLOW = 'HANDLE_FOLLOW',
    HANDLE_FOLLOW_SUCCESS = 'HANDLE_FOLLOW_SUCCESS',
    HANDLE_FOLLOW_ERROR = 'HANDLE_FOLLOW_ERROR',

}

interface ContactFilesAction {
    type: ContactActionTypes.SEARCH_CONTACT,
}

interface ContactFilesSuccessAction {
    type: ContactActionTypes.SEARCH_CONTACT_SUCCESS,
    payload: any[]
}

interface ContactFilesErrorAction {
    type: ContactActionTypes.SEARCH_CONTACT_ERROR,
    payload: string
}


interface ContactFollowAction {
    type: ContactActionTypes.HANDLE_FOLLOW,
}

interface ContactFollowSuccessAction {
    type: ContactActionTypes.HANDLE_FOLLOW_SUCCESS,
    payload: any[] | {}
}

interface ContactFollowErrorAction {
    type: ContactActionTypes.HANDLE_FOLLOW_ERROR,
    payload: string
}




export type ContactAction = ContactFilesAction | ContactFilesSuccessAction | ContactFilesErrorAction
                            | ContactFollowAction | ContactFollowSuccessAction | ContactFollowErrorAction