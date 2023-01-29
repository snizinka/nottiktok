import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as contactCreators from '../store/action-creator/contact'

export default function useChatActions() {
    const dispatch: Dispatch<any> = useDispatch()

    return bindActionCreators(contactCreators, dispatch)
}