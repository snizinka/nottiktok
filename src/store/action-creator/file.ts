import axios from "axios";
import { Dispatch } from "redux";
import { FileAction, FileActionTypes } from "../../types/file";

export const fetchFiles = (parameter: string[]) => {
    return async (dispatch: Dispatch<FileAction>) => {
        try {
            dispatch({ type: FileActionTypes.FETCH_FILES })
            const data = await fetch('http://localhost:5000/files', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    parameter: parameter
                })
            }).then(res => res.json());

            console.log(data.result)

            dispatch({ type: FileActionTypes.FETCH_FILES_SUCCESS, payload: data.result.converted._posts })
        } catch {
            dispatch({
                type: FileActionTypes.FETCH_FILES_ERROR,
                payload: 'Shit happens'
            })
        }
    }
}