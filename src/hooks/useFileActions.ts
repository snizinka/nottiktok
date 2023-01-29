import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as fileCreators from '../store/action-creator/file'

export default function useChatActions() {
    const dispatch: Dispatch<any> = useDispatch()

    return bindActionCreators(fileCreators, dispatch)
}