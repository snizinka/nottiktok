import { useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as SignUpActionCreators from '../store/action-creator/signup'

export default function useSignUpActions() {
    const dispatch: Dispatch<any> = useDispatch()

    return bindActionCreators(SignUpActionCreators, dispatch)
}