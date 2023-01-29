import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as chatCreators from '../store/action-creator/chat'

export default function useChatActions() {
    const dispatch: Dispatch<any> = useDispatch()

    return bindActionCreators(chatCreators, dispatch)
}