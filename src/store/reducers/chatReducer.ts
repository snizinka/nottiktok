import { stat } from "fs";
import { ChatAction, ChatActionTypes, ChatState } from "../../types/chat";

const initialState: ChatState = {
    chatError: '',
    chatLoading: false,
    contacts: [],
    messages: [],
    selectedChat: null,
    socket: null
}

export default function chatReducer(state = initialState, action: ChatAction): ChatState {
    switch (action.type) {
        case ChatActionTypes.FETCH_CONTACTS:
            return {
                chatLoading: true,
                chatError: '',
                contacts: [],
                messages: [],
                selectedChat: 0,
                socket: state.socket
            }

        case ChatActionTypes.FETCH_CONTACTS_SUCCESS:
            return {
                chatLoading: false,
                chatError: '',
                contacts: action.payload,
                messages: state.messages,
                selectedChat: null,
                socket: state.socket
            }

        case ChatActionTypes.FETCH_CONTACTS_ERROR:
            return {
                chatLoading: false,
                chatError: 'Could not load contacts',
                contacts: [],
                messages: [],
                selectedChat: null,
                socket: state.socket
            }


        case ChatActionTypes.SET_SOCKET:
            return {
                chatLoading: true,
                chatError: '',
                contacts: state.contacts,
                messages: state.messages,
                selectedChat: null,
                socket: null
            }

        case ChatActionTypes.SET_SOCKET_SUCCESS:
            return {
                chatLoading: true,
                chatError: '',
                contacts: state.contacts,
                messages: state.messages,
                selectedChat: null,
                socket: action.payload
            }

        case ChatActionTypes.SET_SOCKET_ERROR:
            return {
                chatLoading: true,
                chatError: 'SOCKET ERROR',
                contacts: state.contacts,
                messages: state.messages,
                selectedChat: null,
                socket: null
            }


        case ChatActionTypes.FETCH_MESSAGES:
            return {
                chatLoading: true,
                chatError: '',
                contacts: state.contacts,
                messages: [],
                selectedChat: state.selectedChat,
                socket: state.socket
            }

        case ChatActionTypes.FETCH_MESSAGES_SUCCESS:
            return {
                chatLoading: false,
                chatError: '',
                contacts: state.contacts,
                messages: action.payload,
                selectedChat: state.selectedChat,
                socket: state.socket
            }

        case ChatActionTypes.FETCH_MESSAGES_ERROR:
            return {
                chatLoading: false,
                chatError: 'Could not load messages',
                contacts: state.contacts,
                messages: [],
                selectedChat: state.selectedChat,
                socket: state.socket
            }


        case ChatActionTypes.ADD_MESSAGES:
            return {
                chatLoading: false,
                chatError: '',
                contacts: state.contacts,
                messages: [...state.messages, action.payload],
                selectedChat: state.selectedChat,
                socket: state.socket
            }

        case ChatActionTypes.EDIT_MESSAGE:
            return {
                chatLoading: false,
                chatError: '',
                contacts: state.contacts,
                messages: state.messages,
                selectedChat: state.selectedChat,
                socket: state.socket
            }

        case ChatActionTypes.EDIT_MESSAGE_SUCCESS:
            return {
                chatLoading: false,
                chatError: '',
                contacts: state.contacts,
                messages: state.messages.map(
                    (message: { messageId: any }, i: any) => message.messageId === action.payload.messageId ? {
                        ...message, message: action.payload.message
                    } : message
                ),
                selectedChat: state.selectedChat,
                socket: state.socket
            }

        case ChatActionTypes.EDIT_MESSAGE_ERROR:
            return {
                chatLoading: false,
                chatError: 'Could not edit message',
                contacts: state.contacts,
                messages: state.messages,
                selectedChat: state.selectedChat,
                socket: state.socket
            }

        case ChatActionTypes.DELETE_MESSAGE:
            return {
                chatLoading: false,
                chatError: '',
                contacts: state.contacts,
                messages: state.messages,
                selectedChat: state.selectedChat,
                socket: state.socket
            }

        case ChatActionTypes.DELETE_MESSAGE_SUCCESS:
            return {
                chatLoading: false,
                chatError: '',
                contacts: state.contacts,
                messages: state.messages.filter((message: { messageId: number; }) => message.messageId !== action.payload.messageId),
                selectedChat: state.selectedChat,
                socket: state.socket
            }

        case ChatActionTypes.DELETE_MESSAGE_ERROR:
            return {
                chatLoading: false,
                chatError: 'Could not delete message',
                contacts: state.contacts,
                messages: state.messages,
                selectedChat: state.selectedChat,
                socket: state.socket
            }

            


            case ChatActionTypes.CREATE_CONTACT:
                return {
                    chatLoading: true,
                    chatError: '',
                    contacts: state.contacts,
                    messages: state.messages,
                    selectedChat: state.selectedChat,
                    socket: state.socket
                }
    
            case ChatActionTypes.CREATE_CONTACT_SUCCESS:
                return {
                    chatLoading: false,
                    chatError: '',
                    contacts: [...state.contacts, action.payload],
                    messages: state.messages,
                    selectedChat: state.selectedChat,
                    socket: state.socket
                }
    
            case ChatActionTypes.CREATE_CONTACT_ERROR:
                return {
                    chatLoading: false,
                    chatError: 'Could not delete message',
                    contacts: state.contacts,
                    messages: state.messages,
                    selectedChat: state.selectedChat,
                    socket: state.socket
                }

        default:
            return state;
    }
}