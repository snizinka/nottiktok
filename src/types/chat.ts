export interface ChatState {
    chatLoading: boolean,
    contacts: any | any[],
    selectedChat: number | null,
    chatError: string | null,
    messages: any | any[],
    socket: any | any[]
}

export enum ChatActionTypes {
    FETCH_CONTACTS = 'FETCH_CONTACTS',
    FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS',
    FETCH_CONTACTS_ERROR = 'FETCH_CONTACTS_ERROR',

    SET_SOCKET = 'SET_SOCKET',
    SET_SOCKET_SUCCESS = 'SET_SOCKET_SUCCESS',
    SET_SOCKET_ERROR = 'SET_SOCKET_ERROR',

    FETCH_MESSAGES = 'FETCH_MESSAGES',
    FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS',
    FETCH_MESSAGES_ERROR = 'FETCH_MESSAGES_ERROR',

    ADD_MESSAGES = 'ADD_MESSAGES',
    
    EDIT_MESSAGE = 'EDIT_MESSAGE', 
    EDIT_MESSAGE_SUCCESS = 'EDIT_MESSAGE_SUCCESS', 
    EDIT_MESSAGE_ERROR = 'EDIT_MESSAGE_ERROR', 

    DELETE_MESSAGE = 'DELETE_MESSAGE', 
    DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS', 
    DELETE_MESSAGE_ERROR = 'DELETE_MESSAGE_ERROR',

    APPEND_CONTACT = 'APPEND_CONTACT',

    
    CREATE_CONTACT = 'CREATE_CONTACT',
    CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS',
    CREATE_CONTACT_ERROR = 'CREATE_CONTACT_ERROR'
}

interface FetchContactsAction {
    type: ChatActionTypes.FETCH_CONTACTS
}

interface FetchContactsSuccessAction {
    type: ChatActionTypes.FETCH_CONTACTS_SUCCESS,
    payload: any
}

interface FetchContactsErrorAction {
    type: ChatActionTypes.FETCH_CONTACTS_ERROR,
    payload: string
}

interface SetSocketAction {
    type: ChatActionTypes.SET_SOCKET
}

interface SetSocketSuccessAction {
    type: ChatActionTypes.SET_SOCKET_SUCCESS,
    payload: any
}

interface SetSocketErrorAction {
    type: ChatActionTypes.SET_SOCKET_ERROR,
    payload: string
}

interface FetchMessagesAction {
    type: ChatActionTypes.FETCH_MESSAGES
}

interface FetchMessagesSuccessAction {
    type: ChatActionTypes.FETCH_MESSAGES_SUCCESS,
    payload: any
}

interface FetchMessagesErrorAction {
    type: ChatActionTypes.FETCH_MESSAGES_ERROR,
    payload: string
}

interface AddMessagesAction {
    type: ChatActionTypes.ADD_MESSAGES,
    payload: any
}

interface EditMessageAction {
    type: ChatActionTypes.EDIT_MESSAGE
}

interface EditMessageSuccessAction {
    type: ChatActionTypes.EDIT_MESSAGE_SUCCESS,
    payload: any
}

interface EditMessageErrorAction {
    type: ChatActionTypes.EDIT_MESSAGE_ERROR,
    payload: string
}

interface DeleteMessageAction {
    type: ChatActionTypes.DELETE_MESSAGE
}

interface DeleteMessageSuccessAction {
    type: ChatActionTypes.DELETE_MESSAGE_SUCCESS,
    payload: any
}

interface DeleteMessageErrorAction {
    type: ChatActionTypes.DELETE_MESSAGE_ERROR,
    payload: string
}

interface AppendContactAction {
    type: ChatActionTypes.APPEND_CONTACT,
    payload: any
}

interface ContactCreateAction {
    type: ChatActionTypes.CREATE_CONTACT,
}

interface ContactCreateSuccessAction {
    type: ChatActionTypes.CREATE_CONTACT_SUCCESS,
    payload: any[] | {}
}

interface ContactCreateErrorAction {
    type: ChatActionTypes.CREATE_CONTACT_ERROR,
    payload: string
}


export type ChatAction = FetchContactsAction | FetchContactsSuccessAction | FetchContactsErrorAction
| SetSocketAction | SetSocketSuccessAction | SetSocketErrorAction
| FetchMessagesAction | FetchMessagesSuccessAction | FetchMessagesErrorAction
| AddMessagesAction
| EditMessageAction | EditMessageSuccessAction | EditMessageErrorAction
| DeleteMessageAction | DeleteMessageSuccessAction | DeleteMessageErrorAction
| AppendContactAction
| ContactCreateAction | ContactCreateSuccessAction | ContactCreateErrorAction