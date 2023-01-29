import React, { useState } from 'react';
import signin from '../style/signin.module.css'
import useUserActions from '../hooks/useUserActions';
import { userData } from '../store/action-creator/user';
import { useTypedSelector } from '../hooks/useTypedSelector';
const SignIn = () => {
    const { error, loading, user } = useTypedSelector(state => state.user)
    const { userData } = useUserActions()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    function signUser(login:string, password: string) {
        userData(login, password)
    }

    if(loading) {
        return <h1>Loading</h1>
    }

    return (
        <div className={signin.signin}>
            <div className={signin.title}>
                <h1>Not TikTok</h1>
            </div>
            <div className={signin.wrapper}>
                <div className={signin.input_box}>
                    <div className={signin.input_item}>
                        <p>Login {user[0]?.username}</p>
                        <input onInput={(e:any) => { setLogin(e.target.value) }} value={ login } type="text" />
                    </div>

                    <div className={signin.input_item}>
                        <p>Password</p>
                        <input onInput={(e:any) => { setPassword(e.target.value) }} value={ password } type="password" />
                    </div>

                    <div className={signin.forgot}>
                        <a href="">Forgot your login or password?</a>
                    </div>

                    <p className={signin.possible_error}>
                        {
                            error ? 'Attention: Wrong login or password' : ''
                        }
                    </p>

                    <div className={signin.action_btns}>
                        <button onClick={() => signUser(login, password)}>Sign In</button>
                        <button>Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;