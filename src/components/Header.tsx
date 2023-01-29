import headerStyles from '../style/header.module.css'
import React, { useState } from 'react'
import useUserActions from '../hooks/useUserActions';
import { userLogout } from '../store/action-creator/user';
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { fetchPosts } from '../store/action-creator/post';
import useActions from '../hooks/useActions';

export default function Header() {
    const { error, user, loading } = useTypedSelector(state => state.user)
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
    const { userLogout } = useUserActions()
    const { fetchPosts } = useActions()
    const navigate = useNavigate()

    return <header className={headerStyles.header}>
        <div className={headerStyles.container}>
            <h1 className={headerStyles.logo} onClick={() => {
                fetchPosts('DEFAULT')
                navigate(`/`)
            }}>Not TikTok</h1>

            <div className={headerStyles.search_area}>
                <div className={headerStyles.searchbx}>
                    <div>
                        <p>Search</p>
                        <div>
                            <input type="text" placeholder='Type here...' className={headerStyles.search_input} />
                        </div>
                    </div>
                    <button className={headerStyles.search_button}>➜</button>
                    <button className={headerStyles.search_button}>ᐩ</button>
                </div>
            </div>

            <nav className={headerStyles.nav}>
                <ul className={headerStyles.ul}>
                    <li className={headerStyles.nav_element}><p>User</p></li>
                    <li className={headerStyles.nav_element}><p>User</p></li>
                    <li className={headerStyles.nav_element} onClick={() => { setShowUserMenu(!showUserMenu) }}>
                        <p>User</p>
                        <ul style={{ display: showUserMenu === false ? 'none' : 'block' }} className={headerStyles.submenu}>
                            <li onClick={() => navigate(`profile/${user[0].userId}`)}>Profile</li>
                            <li>Settings</li>
                            <li onClick={() => { userLogout() }}>Log out</li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
}