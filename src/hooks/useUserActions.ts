import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as UserActionCreators from '../store/action-creator/user'

export default function useUserActions() {
    const dispatch: Dispatch<any> = useDispatch()

    return bindActionCreators(UserActionCreators, dispatch)
}