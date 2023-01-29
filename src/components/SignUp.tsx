import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signup from '../style/signup.module.css'
import '../style/profile.css'
import { confirm } from '../store/action-creator/user';
import useUserActions from '../hooks/useUserActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { chck } from '../store/action-creator/signup';
import useSignUpActions from '../hooks/useSignUpActions';
import { signUp } from '../store/action-creator/signup';
import { cancelSignUp } from '../store/action-creator/signup';

const SignUp = () => {
    const { error, confirmation, tempMail, tempPassword, tempUsername } = useTypedSelector(state => state.user)
    const { signLoading, mail, usern, created, signUpError } = useTypedSelector(state => state.signup)
    const [inputError, setInputError] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmationAppear, setConfirmationAppear] = useState(false)
    const navigate = useNavigate()
    const { confirm } = useUserActions()
    const { chck } = useSignUpActions()
    const { signUp } = useSignUpActions()
    const { cancelSignUp } = useSignUpActions()

    const [frst, setFrst] = useState('')
    const [scnd, setScnd] = useState('')
    const [thrd, setThrd] = useState('')
    const [frth, setFrth] = useState('')
    const [fvth, setFvth] = useState('')

    function changeFocus(index: number, e: any) {
        let indx = index;
        const send_conf = document.getElementById('send_conf');

        if(index === 0)
            if(e.value === '')
                return

        if (index === 4 && e.value !== '')
            return;
        else if (e.value === '') {
            indx -= 1;
        }else {
            indx += 1;
        }
        console.log('ffff')
        const cells = document.getElementsByClassName('confirm_cell');
        (cells[indx] as HTMLElement).focus();
    }

    console.log(confirmation)
    console.log(created)
    useEffect(()=> {
        if(created)
            setTimeout(()=> {
                // cancelSignUp()
                navigate('/signin')
            }, 3000)
    }, [created])

    return (
        <div className={signup.signup}>
            <div className={signup.title}>
                <h1>Not TikTok</h1>
            </div>
            {
                created ? <div className={signup.created}><p>Account has been created successfully!</p></div> :
                    confirmation === null ?
                        <div className={signup.wrapper}>
                            <div className={signup.input_box} id='signup'>
                                <div className={signup.input_item}>
                                    <p>Email</p>
                                    <input onInput={(e: any) => { setEmail(e.target.value) }} onChange={(e) => chck(e.target.value, username)} value={email} type="text" />
                                    <p className={signup.input_error} style={{ visibility: mail ? 'visible' : 'hidden' }}>
                                        {
                                            mail ? 'Email address already signed' : ''
                                        }
                                    </p>
                                </div>

                                <div className={signup.input_item}>
                                    <p>Username</p>
                                    <input onInput={(e: any) => { setUsername(e.target.value) }} onChange={(e) => chck(email, e.target.value)} value={username} type="text" />
                                    <p className={signup.input_error} style={{ visibility: usern ? 'visible' : 'hidden' }}>
                                        {
                                            usern ? 'This username already exists' : ''
                                        }
                                    </p>
                                </div>

                                <div className={signup.input_item}>
                                    <p>Password</p>
                                    <input onInput={(e: any) => { setPassword(e.target.value) }} value={password} type="password" />
                                </div>

                                <div className={signup.input_item}>
                                    <p>Confirm password</p>
                                    <input onInput={(e: any) => { setConfirmPassword(e.target.value) }} value={confirmPassword} type="password" />
                                </div>

                                <p className={signup.possible_error}>
                                    {
                                        error ? error : ''
                                    }
                                    {
                                        inputError === '' ? '' : inputError
                                    }
                                </p>

                                <div className={signup.action_btns}>
                                    <button onClick={() => {
                                        if (!signLoading) {
                                            if (email === '' || password === '' || confirmPassword === '') {
                                                setInputError('All fields shoud be filled')
                                            }
                                            else if (password !== confirmPassword) {
                                                setInputError('Password and confirmation password are different')
                                            } else if (password.length < 4) {
                                                setInputError('Password should consist of at least 4 symbols')
                                            }
                                            else {
                                                setInputError('')
                                                setConfirmationAppear(true)
                                                document.getElementById('conf')?.classList.add('recov')
                                                document.getElementById('signup')?.classList.add('move')
                                                confirm(email, password, username)
                                            }
                                        }
                                    }} >Sign Up</button>
                                    <button onClick={() => navigate('/signin')}>In</button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={signup.conf} id='conf'>
                            <div>
                                <input className='confirm_cell' maxLength={1} type="text" onChange={(e: any) => { setFrst(e.target.value) }} onInput={(e) => changeFocus(0, e.target)} value={frst} />
                                <input className='confirm_cell' id='two' maxLength={1} type="text" onChange={(e: any) => { setScnd(e.target.value) }} onInput={(e) => changeFocus(1, e.target)} value={scnd} />
                                <input className='confirm_cell' maxLength={1} type="text" onChange={(e: any) => { setThrd(e.target.value) }} onInput={(e) => changeFocus(2, e.target)} value={thrd} />
                                <input className='confirm_cell' maxLength={1} type="text" onChange={(e: any) => { setFrth(e.target.value) }} onInput={(e) => changeFocus(3, e.target)} value={frth} />
                                <input className='confirm_cell' maxLength={1} type="text" onChange={(e: any) => { setFvth(e.target.value) }} onInput={(e) => changeFocus(4, e.target)} value={fvth} />
                                <button id='send_conf' onClick={() => {
                                    let temp = frst + scnd + thrd + frth + fvth;
                                    if (confirmation === temp) {
                                        signUp(tempMail, tempPassword, tempUsername)
                                    }
                                }}>Confirm</button>
                            </div>
                        </div>
            }

        </div>

    );
};

export default SignUp;