import { FileAction, FileActionTypes, FileState } from "../../types/file";

const initialState: FileState = {
    files: [],
    loading: false,
    error: null,
    localLoading: false
}

export default function fileReducer(state = initialState, action: FileAction): FileState {
    switch (action.type) {
        case FileActionTypes.FETCH_FILES:
            return {
                loading: true,
                files: [],
                error: null,
                localLoading: false,
            }

        case FileActionTypes.FETCH_FILES_SUCCESS:
            return {
                loading: false,
                files: action.payload,
                error: null,
                localLoading: false,
            }

        case FileActionTypes.FETCH_FILES_ERROR:
            return {
                loading: false,
                files: [],
                error: action.payload,
                localLoading: false,
            }

        case FileActionTypes.ADD_FILE:
            return {
                loading: true,
                files: state.files,
                error: null,
                localLoading: false,
            }

        case FileActionTypes.ADD_FILE_SUCCESS:
            return {
                loading: false,
                files: state.files,
                error: null,
                localLoading: false
            }

        case FileActionTypes.ADD_FILE_ERROR:
            return {
                loading: false,
                files: state.files,
                error: null,
                localLoading: false
            }

       

        default:
            return state
    }
}