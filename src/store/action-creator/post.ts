import axios from "axios";
import { Dispatch } from "redux";
import { PostAction, PostActionTypes } from "../../types/post";

export const fetchPosts = (parameter: string, id: number = 0) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            console.log('fetchPosts')
            dispatch({ type: PostActionTypes.FETCH_POSTS })
            const data = await fetch('http://localhost:5000/api', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    parameter: parameter,
                    id: id
                })
            }).then(res => res.json());

            console.log(data.result.converted._posts)
            setTimeout(() => {
                dispatch({ type: PostActionTypes.FETCH_POSTS_SUCCESS, payload: data.result.converted._posts })
            }, 1)

        } catch {
            dispatch({
                type: PostActionTypes.FETCH_POSTS_ERROR,
                payload: 'Shit happens'
            })
        }
    }
}

export const fetchProfile = (id: number) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            console.log('in')
            dispatch({ type: PostActionTypes.FETCH_PROFILE })
            const data = await fetch('http://localhost:5000/profile', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            }).then(res => res.json());
            console.log(data.result.data)
            dispatch({ type: PostActionTypes.FETCH_PROFILE_SUCCESS, payload: data.result.data })
        } catch (err) {
            console.log(err)
            dispatch({ type: PostActionTypes.FETCH_PROFILE_ERROR, payload: 'Not found' })
        }
    }
}

export const removePosts = (id: number) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({ type: PostActionTypes.REMOVE_POSTS, payload: id })
            dispatch({ type: PostActionTypes.REMOVE_POSTS_SUCCESS, payload: [] })

        } catch {
            dispatch({
                type: PostActionTypes.REMOVE_POSTS_ERROR,
                payload: 'Shit happens'
            })
        }
    }
}

export const handleLikes = (likeId: number, postId: number, userId: number) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({ type: PostActionTypes.HANDLE_LIKES, payload: likeId })
            const data = await fetch(`http://localhost:5000/likehandle`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    likeId: likeId,
                    postId: postId,
                    userId: userId
                })
            }).then(res => res.json());
            let pass = data.result.length > 0 ? data : data.result.data[0]
            let send = { pass, postId }
            dispatch({ type: PostActionTypes.HANDLE_LIKES_SUCCESS, payload: send })
        } catch (err) {
            console.log(err)
            dispatch({ type: PostActionTypes.HANDLE_LIKES_ERROR, payload: 'Something happened' })
        }
    }
}


export const handleFollows = (userId: number, subId: number) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            console.log(userId)
            dispatch({ type: PostActionTypes.HANDLE_FOLLOW, payload: userId })
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
            dispatch({ type: PostActionTypes.HANDLE_FOLLOW_SUCCESS, payload: send })
        } catch (err) {
            console.log(err)
            dispatch({ type: PostActionTypes.HANDLE_FOLLOW_ERROR, payload: 'Something happened' })
        }
    }
}


export const analizeTitle = (postTitle: string, userID: number) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({ type: PostActionTypes.TITLE_POST })
            const data = await fetch('http://localhost:5000/titlealytics', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    title: postTitle,
                    userID: userID
                })
            }).then(res => res.json());

            console.log(data.result.postAnalytics)
            dispatch({ type: PostActionTypes.TITLE_POST_SUCCESS, payload: data.result.postAnalytics })

        } catch {
            dispatch({
                type: PostActionTypes.TITLE_POST_ERROR,
                payload: 'Shit happens'
            })
        }
    }
}


export const analizePost = (postID: number) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({ type: PostActionTypes.ANALIZE_POST })
            const data = await fetch('http://localhost:5000/postanalytics', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    postID: postID
                })
            }).then(res => res.json()).then(data => {dispatch({ type: PostActionTypes.ANALIZE_POST_SUCCESS, payload: data.result.postAnalytics })
            console.log(data.result.postAnalytics)})

            

        } catch {
            dispatch({
                type: PostActionTypes.ANALIZE_POST_ERROR,
                payload: 'Shit happens'
            })
        }
    }
}