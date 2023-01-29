import React, { useEffect, useState } from 'react';
import useActions from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { fetchPosts } from '../store/action-creator/post';
import { useParams } from 'react-router-dom'
import postStyles from '../style/post.module.css'
import Header from './Header';
import { Post } from './Post';
import Profile from './Profile';

export default function PostList(props: any) {
    const { error, loading, posts } = useTypedSelector(state => state.post)
    const { user } = useTypedSelector(state => state.user)
    const { fetchPosts } = useActions()
    const params = useParams()
    
    useEffect(() => {
        if(props.byWhat.type !== 'DEFAULT') {
            fetchPosts(props.byWhat.type, Number(params.id))
        }else{
            fetchPosts(props.byWhat.type, user[0].userId)
        }
    }, [])

    if (loading) {
        return <div className="loading">
            <h1>loading... PostList</h1>
        </div>
    }

    if (error) {
        return <div className="error">
            <h1>An error occured</h1>
        </div>
    }

    return (
        <div>
            <Header></Header>
            <div className={postStyles.posts_wrapper}>
                <div className={postStyles.posts_container}>
                    {
                        Object.keys(posts).length > 0 && !loading ?
                        posts?.map((post: any) =>
                            <Post info={post}></Post>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    );
}