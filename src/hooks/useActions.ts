import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as PostActionCreators from '../store/action-creator/post'

export default function useActions () {
    const dispatch: Dispatch<any> = useDispatch()

    return bindActionCreators(PostActionCreators, dispatch)
}
