export interface FileState {
    files: any[] | any;
    loading: boolean;
    error: null | string;
    localLoading: boolean;
}

export enum FileActionTypes {
    FETCH_FILES = 'FETCH_FILES',
    FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
    FETCH_FILES_ERROR = 'FETCH_FILES_ERROR',

    ADD_FILE = 'ADD_FILE',
    ADD_FILE_SUCCESS = 'ADD_FILE_SUCCESS',
    ADD_FILE_ERROR = 'ADD_FILE_ERROR'
}

interface FetchFilesAction {
    type: FileActionTypes.FETCH_FILES,
}

interface FetchFilesSuccessAction {
    type: FileActionTypes.FETCH_FILES_SUCCESS,
    payload: any[]
}

interface FetchFilesErrorAction {
    type: FileActionTypes.FETCH_FILES_ERROR,
    payload: string
}



interface AddFilesAction {
    type: FileActionTypes.ADD_FILE,
}

interface AddFilesSuccessAction {
    type: FileActionTypes.ADD_FILE_SUCCESS,
    payload: any[]
}

interface AddFilesErrorAction {
    type: FileActionTypes.ADD_FILE_ERROR,
    payload: string
}


export type FileAction = FetchFilesAction | FetchFilesSuccessAction | FetchFilesErrorAction 
                        | AddFilesAction | AddFilesSuccessAction | AddFilesErrorAction
 