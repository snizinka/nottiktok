import { PostAction, PostActionTypes, PostState } from "../../types/post";

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
    localLoading: false,
    analize: { likesAnalys: [{ lks: 0 }], postByTitle: [], subscriptionAnalys: [] },
    title: []
}

export default function postReducer(state = initialState, action: PostAction): PostState {
    switch (action.type) {
        case PostActionTypes.FETCH_POSTS:
            return {
                loading: true,
                posts: [],
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.FETCH_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.payload,
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.FETCH_POSTS_ERROR:
            return {
                loading: false,
                posts: [],
                error: action.payload,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.REMOVE_POSTS:
            return {
                loading: true,
                posts: state.posts.filter((p: { postId: number; }) => p.postId !== action.payload),
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.REMOVE_POSTS_SUCCESS:
            return {
                loading: false,
                posts: state.posts,
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }




        case PostActionTypes.HANDLE_LIKES:
            return {
                loading: false,
                posts: state.posts,
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.HANDLE_LIKES_SUCCESS:
            return {
                loading: false,
                posts: state.posts.map(
                    (content: { postId: any; }, i: any) => content.postId === action.payload.postId ? {
                        ...content, iliked: action.payload.pass,
                        likes: { likes: action.payload.pass === undefined ? state.posts[i].likes.likes - 1 : state.posts[i].likes.likes === undefined ? 1 : state.posts[i].likes.likes + 1, postId: 1 }
                    }
                        : content
                ),
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.HANDLE_LIKES_ERROR:
            return {
                loading: false,
                posts: state.posts,
                error: action.payload,
                localLoading: false,
                analize: state.analize,
                title: []
            }



        case PostActionTypes.HANDLE_FOLLOW:
            return {
                loading: false,
                posts: state.posts,
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.HANDLE_FOLLOW_SUCCESS:
            return {
                loading: false,
                posts: state.posts.map(
                    (content: { _user: any; }, i: any) => content._user.userId === action.payload.userId ? {
                        ...content,
                        subscribed: action.payload.pass.userId === undefined ? [] : action.payload.pass
                    } : content
                ),
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.HANDLE_FOLLOW_ERROR:
            return {
                loading: false,
                posts: state.posts,
                error: action.payload,
                localLoading: false,
                analize: state.analize,
                title: []
            }




        case PostActionTypes.FETCH_PROFILE:
            return {
                loading: true,
                posts: [],
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.FETCH_PROFILE_SUCCESS:
            return {
                loading: false,
                posts: action.payload,
                error: null,
                localLoading: false,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.FETCH_PROFILE_ERROR:
            return {
                loading: false,
                posts: state.posts,
                error: action.payload,
                localLoading: false,
                analize: state.analize,
                title: []
            }




        case PostActionTypes.ANALIZE_POST:
            return {
                loading: false,
                posts: state.posts,
                error: null,
                localLoading: true,
                analize: state.analize,
                title: state.title
            }

        case PostActionTypes.ANALIZE_POST_SUCCESS:
            return {
                loading: false,
                posts: state.posts,
                error: null,
                analize: action.payload,
                localLoading: false,
                title: state.title
            }

        case PostActionTypes.ANALIZE_POST_ERROR:
            return {
                loading: false,
                posts: state.posts,
                error: action.payload,
                localLoading: false,
                analize: [],
                title: state.title
            }



        case PostActionTypes.TITLE_POST:
            return {
                loading: false,
                posts: state.posts,
                error: null,
                localLoading: true,
                analize: state.analize,
                title: []
            }

        case PostActionTypes.TITLE_POST_SUCCESS:
            return {
                loading: false,
                posts: state.posts,
                error: null,
                localLoading: false,
                analize: state.analize,
                title: action.payload
            }

        case PostActionTypes.TITLE_POST_ERROR:
            return {
                loading: false,
                posts: state.posts,
                error: action.payload,
                localLoading: false,
                analize: [],
                title: []
            }


        default:
            return state
    }
}