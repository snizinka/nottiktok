import axios from "axios";
import { Dispatch } from "redux";
import { ChatAction, ChatActionTypes } from "../../types/chat";

export const fetchContacts = (userID: number) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({ type: ChatActionTypes.FETCH_CONTACTS })
            const data = await fetch('http://localhost:5000/contacts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userID: userID
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data.result)
                    dispatch({ type: ChatActionTypes.FETCH_CONTACTS_SUCCESS, payload: data.result.sb })
                })
        }
        catch (err) {
            dispatch({ type: ChatActionTypes.FETCH_CONTACTS_ERROR, payload: '' })
            console.log('/q')
        }
    }
}


export const setSocket = (socket: any) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({ type: ChatActionTypes.SET_SOCKET })
            dispatch({ type: ChatActionTypes.SET_SOCKET_SUCCESS, payload: socket })
        }
        catch (err) {
            dispatch({ type: ChatActionTypes.SET_SOCKET_ERROR, payload: '' })
            console.log('/q')
        }
    }
}

export const fetchChatMessages = (userID: number, secondUserID: number) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({ type: ChatActionTypes.FETCH_MESSAGES })
            const data = await fetch('http://localhost:5000/chatmessages', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userID: userID,
                    secondUserID: secondUserID
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data.result.messages)
                    dispatch({ type: ChatActionTypes.FETCH_MESSAGES_SUCCESS, payload: data.result.messages })
                })
        }
        catch (err) {
            dispatch({ type: ChatActionTypes.FETCH_MESSAGES_ERROR, payload: '' })
            console.log('/q')
        }
    }
}

export const addMessage = (message: any) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        dispatch({ type: ChatActionTypes.ADD_MESSAGES, payload: message })
    }
}

export const editMessage = (message: any) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        dispatch({ type: ChatActionTypes.EDIT_MESSAGE })
        if (message.changedRows > 0)
            dispatch({ type: ChatActionTypes.EDIT_MESSAGE_SUCCESS, payload: message })
        else
            dispatch({ type: ChatActionTypes.EDIT_MESSAGE_ERROR, payload: 'Could not edit message' })
    }
}

export const deleteMessage = (message: any) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        dispatch({ type: ChatActionTypes.DELETE_MESSAGE })
        if (message.affectedRows > 0)
            dispatch({ type: ChatActionTypes.DELETE_MESSAGE_SUCCESS, payload: message })
        else
            dispatch({ type: ChatActionTypes.DELETE_MESSAGE_ERROR, payload: 'Could not delete message' })
    }
}


export const createContact = (userId: number, subId: number, user: any) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({ type: ChatActionTypes.CREATE_CONTACT, payload: userId })
            const data = await fetch(`http://localhost:5000/createcontact`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    subId: subId,
                    user: user
                })
            }).then(res => res.json());
            
            console.log(data.result.data)

            dispatch({ type: ChatActionTypes.CREATE_CONTACT_SUCCESS, payload: data.result.data })
        } catch (err) {
            console.log(err)
            dispatch({ type: ChatActionTypes.CREATE_CONTACT_ERROR, payload: 'Something happened' })
        }
    }
}