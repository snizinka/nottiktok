import React, { useState } from 'react'
import useActions from '../hooks/useActions'
import { useNavigate } from 'react-router-dom'
import { removePosts } from '../store/action-creator/post'
import { handleLikes } from '../store/action-creator/post'
import postStyles from '../style/post.module.css'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { handleFollows } from '../store/action-creator/post'

export const Post = (props: any) => {
    const { error, user, loading } = useTypedSelector(state => state.user)
    const { removePosts } = useActions()
    const { handleLikes } = useActions()
    const { handleFollows } = useActions()
    const navigate = useNavigate()

    const [currentSlide, setCurrentSlide] = useState(0)

    return (
        <div className={postStyles.post} onMouseOver={() =>
            console.log(props.info)
        }>
            <div className={postStyles.left_part}>
                <div className={postStyles.info_top}>
                    <div className={postStyles.icon}>
                        <img className={postStyles.image}
                            onClick={() => navigate(`profile/${props.info._user.userId}`)}
                            src={require(`../post_content/pictures/${props.info._user.userImage}`)}
                            alt="" />
                    </div>
                    <div className={postStyles.follow_user}>
                        <p onClick={() => navigate(`profile/${props.info._user.userId}`)}
                            className={postStyles.username}>@{props.info._user.username}</p>
                        <button className={postStyles.follow}
                            style={{ background: Object.keys(props.info.subscribed).length > 0 ? '#D9D9D9' : '#FFFF' }}
                            onClick={() => handleFollows(props.info._user.userId, user[0].userId)}
                        >{Object.keys(props.info.subscribed).length > 0 ? 'Following' : 'Follow'}</button>
                    </div>
                </div>

                <div className={postStyles.desctiption}>
                    <div className={postStyles.desctiption_container}>
                        <div className={postStyles.category}>

                            {
                                props.info._category.map((cat: any) => {
                                    return <a href="#">@{cat.categoryName}</a>
                                })
                            }

                        </div>
                        <div className={postStyles.description_text}>
                            <p>{props.info.description}</p>
                        </div>
                    </div>
                </div>

                <div className={postStyles.post_info}>
                    <p>Likes: {props.info.likes.likes === undefined ? 0 : props.info.likes.likes}</p>
                    <p>Shares: {props.info.shares.shares === undefined ? 0 : props.info.shares.shares}</p>
                    <p>Created: 2022.11.11</p>
                </div>
            </div>
            <div className={postStyles.middle_part}>
                <div className={postStyles.left_swtch}>
                    <button onClick={() => {
                        if (currentSlide !== 0)
                            setCurrentSlide(currentSlide + 420)
                        else {
                            setCurrentSlide(-(props.info.contentAmount - 1) * 420)
                        }
                    }}>Prev</button>
                </div>
                <div className={postStyles.middle_wrapper}>
                    <div className={postStyles.middle_container} style={{
                        transform: `translate(${currentSlide}px, 0)`,
                        transition: '.4s ease'
                    }}>
                        {
                            props.info.media.map((md: any) => {
                                return <>
                                    {
                                        md.map((inner: any) => {
                                            return <>
                                                {
                                                    inner.contentType === 'picture' ? <div className={postStyles.slider_item}>
                                                        <img className={postStyles.slider_img}
                                                            src={require(`../post_content/pictures/${inner.photoLink}`)}
                                                            alt="" />
                                                    </div> : inner.contentType === 'text' ? <div className={postStyles.text_component}>
                                                        <p>{inner.textContent}</p>
                                                    </div> : <div className="video-content">

                                                    </div>
                                                }
                                            </>
                                        })
                                    }
                                </>
                            })
                        }

                    </div>
                </div>
                <div className={postStyles.right_switch}>
                    <button onClick={() => {
                        if((currentSlide) !== (-(props.info.contentAmount - 1) * 420)) {
                            setCurrentSlide(currentSlide - 420)
                        } else {
                            setCurrentSlide(0)
                        }
                    }}>Next</button>
                </div>
            </div>
            <div className={postStyles.right_part}>
                <div className={postStyles.comment_section}>
                    <p className={postStyles.comment_p}>Comments</p>
                    <div className={postStyles.comments}>

                        {
                            props.info._comments.map((comment: any) => {
                                return <div className={postStyles.comment}>
                                    <div className={postStyles.user_sign}>
                                        <p>{comment._user.username}</p>
                                    </div>
                                    <div className={postStyles.comment_content}>
                                        <img src={require(`../post_content/pictures/${comment._user.userImage}`)} alt="" />
                                        <p>{comment.commentContent}</p>
                                    </div>
                                </div>
                            })
                        }

                    </div>

                    <div className={postStyles.add_comment_fld}>
                        <input type="text" />
                        <button>Send</button>
                    </div>
                </div>



                <div className={postStyles.actions}>
                    <div className={postStyles.item}>
                        <button style={{ background: props.info.iliked?.likesId !== undefined ? 'red' : 'gray' }}
                            onClick={() => handleLikes(props.info.iliked?.likesId, props.info.postId, user[0].userId)}>Like</button>
                    </div>
                    <div className={postStyles.item}></div>
                    <div className={postStyles.item}></div>
                    <div className={postStyles.item}>
                        <button onClick={() => removePosts(props.info.postId)}>Don't recomend me</button>
                    </div>
                </div>
            </div>
        </div>
    )
}