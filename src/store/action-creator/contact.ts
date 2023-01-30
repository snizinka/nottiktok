import axios from "axios";
import { Dispatch } from "redux";
import { ContactAction, ContactActionTypes } from "../../types/contact";

export const searchContact = (userId: string, parameter: string) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        try {
            dispatch({ type: ContactActionTypes.SEARCH_CONTACT })
            const data = await fetch('http://localhost:5000/searchcontacts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    parameter: parameter,
                    userId: userId
                })
            }).then(res => res.json());

            console.log(data.result.data)

            dispatch({ type: ContactActionTypes.SEARCH_CONTACT_SUCCESS, payload: data.result.data })
        } catch {
            dispatch({
                type: ContactActionTypes.SEARCH_CONTACT_ERROR,
                payload: 'Shit happens'
            })
        }
    }
}


export const handleFollows = (userId: number, subId: number) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        try {
            console.log(userId)
            dispatch({ type: ContactActionTypes.HANDLE_FOLLOW, payload: userId })
            const data = await fetch(`http://localhost:5000/followhandle`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    subId: subId
                })
            }).then(res => res.json());
            
            let pass = data.result.length > 0 ? data : data.result.data
            console.log(pass)
            let send = { pass, userId }
            console.log(send)
            dispatch({ type: ContactActionTypes.HANDLE_FOLLOW_SUCCESS, payload: send })
        } catch (err) {
            console.log(err)
            dispatch({ type: ContactActionTypes.HANDLE_FOLLOW_ERROR, payload: 'Something happened' })
        }
    }
}