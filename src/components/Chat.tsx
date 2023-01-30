// @ts-nocheck
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Header from './Header';
import styled from 'styled-components'
import {
    fetchContacts,
    setSocket,
    fetchChatMessages,
    addMessage,
    editMessage,
    deleteMessage,
    createContact
} from '../store/action-creator/chat';
import { fetchFiles } from '../store/action-creator/file';
import { searchContact, handleFollows } from '../store/action-creator/contact';
import useActions from '../hooks/useActions'
import useChatActions from '../hooks/useChatActions';
import useFileActions from '../hooks/useFileActions';
import useContactActions from '../hooks/useContactActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { io } from 'socket.io-client';
import ContextMenu from './ContextMenu';
import ScrollToBottom from 'react-scroll-to-bottom'
import { MessageMode } from '../interfaces/message';


const Chat = () => {
    const sockett = io.connect("http://localhost:5000") as any
    const { fetchContacts,
        setSocket,
        fetchChatMessages,
        addMessage,
        editMessage,
        deleteMessage,
        createContact
    } = useChatActions();

    const { fetchFiles } = useFileActions();

    const { searchContact, handleFollows } = useContactActions();

    const { user } = useTypedSelector(state => state.user);
    const { contact } = useTypedSelector(state => state.contact);
    const { contacts, socket, messages } = useTypedSelector(state => state.chat);
    const [message, setMessage] = useState('');
    const [messageFile, setMessageFile] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedChatUser, setSelectedChatUser] = useState(null);
    const [messageMode, setMessageMode] = useState(MessageMode.TYPE);
    const [messageToEdit, setMessageToEdit] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef()

    async function handleMessage(receiver, message) {
        if (messageMode === MessageMode.TYPE)
            await sendMsg(receiver, message)
        else if (messageMode === MessageMode.EDIT) {
            const messageData = {
                room: selectedRoom.contact.contactId,
                messageId: messageToEdit.messageId,
                message: message,
                chatType: selectedRoom.chatType
            }
            console.log(messageToEdit)
            await sockett.emit('edit_message', messageData)
            setMessageMode(MessageMode.TYPE)
            setMessageToEdit({})
            setMessage('')
        }
    }

    const removeMessage = useCallback(async (messageData) => {
        await sockett.emit('delete_message', { room: selectedRoom, messageId: messageData, chatType: selectedRoom.chatType })
    })

    const changeMessageToEdit = useCallback((messageToEdi) => {
        setMessageToEdit(messageToEdi)
    })

    const changeMessageMode = useCallback((mode) => {
        setMessageMode(mode)
    })

    const changeMessageState = useCallback((message) => {
        setMessage(message)
    }, [])

    async function sendMsg(receiver, message) {
        const messageData = {
            room: selectedRoom.contact.contactId,
            author: user[0].userId,
            receiver: receiver,
            message: message,
            time: new Date(Date.now()),
            chatType: selectedRoom.chatType
        }

        await sockett.emit('send_message', messageData)
        setMessage('')
    }

    useEffect(() => {
        fetchContacts(user[0].userId)
        setSocket(sockett)
    }, [])

    useEffect(() => {
        sockett.on('receive_message', (data) => {
            console.log(data)
            addMessage(data)
        })

        sockett.on('edit_message_state', (data) => {
            editMessage(data)
        })

        sockett.on('deleted_message', (data) => {
            console.log(data)
            deleteMessage(data)
        })
    }, [sockett])


    return (
        <Container>
            <Header></Header>

            <div className='container'>
                <div className="contacts_wrapper">
                    <p className='contacts_tag'>Contacts</p>
                    <div className="search">
                        <input type="text" value={searchValue} onChange={(e) => {
                            setSearchValue(e.target.value)
                        }} />
                        <button className='add-btn' onClick={() => {
                            searchContact(user[0].userId, searchValue)
                        }}>Add</button>
                    </div>

                    {
                        contact.length > 0 ? <div className="search-contact-list">
                            {
                                contact.map(c => {
                                    return <div className="searched-contact">
                                        <img src={require(`../post_content/pictures/${c.userImage}`)} alt={c.userLink} />
                                        <a href="#">{c.userLink}</a>
                                        <div className="selected-contact">
                                            <button className="sub-contact" onClick={() => {
                                                handleFollows(c.userId, user[0].userId)
                                                createContact(c.userId, user[0].userId, c)
                                                console.log(c.userId, user[0].userId)
                                            }}>Add</button>
                                        </div>
                                    </div>
                                })
                            }
                        </div> : ''
                    }



                    <div className="contacts"
                    style={{ maxHeight: contact.length > 0 ? '250px' : '' }}>
                        {
                            contacts.map((contact: any, index: any) => {
                                return <div style={{ border: selectedRoom === contact.contact.contactId ? 'solid #FFF9D7 3px' : 'none' }} className='contact' key={index} onClick={() => {
                                    setSelectedRoom(contact)
                                    setSelectedChatUser(contact.user)
                                    if (contact.chatType === 'PRIVATE') {
                                        fetchChatMessages(user[0].userId, contact.contact.fuserId === user[0].userId ? contact.contact.suserId : contact.contact.fuserId, 'PRIVATE')
                                    } else {
                                        fetchChatMessages(user[0].userId, contact.contact.contactId, 'GROUP')
                                    }
                                    sockett.emit('join_room', contact.contact.contactId)
                                }}>
                                    {
                                        contact.contact.chatName === undefined ? <div>
                                            <img src={require(`../post_content/pictures/${contact.user.userImage}`)} alt="" />
                                            <p>{contact.user.username}</p>
                                        </div> : <p>{contact.contact.chatName}</p>
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>

                <div className="chat">
                    <div className="info">
                        <button className='info_btn'>Images</button>
                        <button className='info_btn'>Videos</button>
                        <button className='info_btn'>Voice messages</button>
                        <button className='info_btn'>Pinned</button>
                        <button className='info_btn'>Audio</button>
                        <button className='info_btn'>Docs</button>
                        <button className='info_btn'>Settings</button>
                    </div>
                    <div className="messages">
                        <div className='messages_container'>
                            <ScrollToBottom className='scroll_container'>
                                {
                                    messages.map((message, index) => {
                                        return <div className='message_container'
                                            style={{ justifyContent: message.authorId === user[0].userId ? 'flex-end' : 'flex-start' }}
                                            onClick={() => {
                                                console.log(message)
                                            }}>
                                            <div className='message' style={{ borderColor: messageMode === MessageMode.EDIT && messageToEdit.messageId === message.messageId ? '#6C7FC5' : 'transparent' }}>
                                                {
                                                    selectedRoom.chatType === 'GROUP' ? message.authorId !== user[0].userId ?
                                                        selectedChatUser.map(scu => {
                                                            if (scu.userId === message.authorId) {
                                                                return <img style={{ marginRight: '7px' }}
                                                                    className='message_author_img'
                                                                    src={require(`../post_content/pictures/${scu.userImage}`)}
                                                                    alt="" />
                                                            }
                                                        }) : '' : ''
                                                }
                                                {
                                                    selectedRoom.chatType === 'PRIVATE' ? message.authorId !== user[0].userId ?
                                                        <img style={{ marginRight: '7px' }}
                                                            className='message_author_img'
                                                            src={require(`../post_content/pictures/${selectedChatUser.userImage}`)}
                                                            alt="" />
                                                        : '' : ''
                                                }
                                                <div style={{ marginRight: message.authorId === user[0].userId ? '7px' : '0px' }} >
                                                    <p className='message_author' style={{ textAlign: message.authorId === user[0].userId ? 'end' : 'initial' }}>
                                                        {
                                                            selectedRoom.chatType === 'GROUP' ? (message.authorId === user[0].userId) ? (user[0].username) : (selectedChatUser.map(scu => {
                                                                if (scu.userId === message.authorId) {
                                                                    return scu.username
                                                                }
                                                            })) : (message.authorId === user[0].userId) ? (user[0].username) : (selectedChatUser.username)
                                                        }
                                                    </p>

                                                    <p className='message_content' key={index}>{message.message}</p>
                                                </div>
                                                {
                                                    message.authorId === user[0].userId ?
                                                        <img className='message_author_img'
                                                            src={require(`../post_content/pictures/${message.author === user[0].userId ? user[0].userImage : user[0].userImage}`)}
                                                            alt="" />
                                                        : ''
                                                }
                                            </div>
                                            <ContextMenu
                                                message={message}
                                                onUpdate={changeMessageState}
                                                changeMessageMode={changeMessageMode}
                                                changeMessageToEdit={changeMessageToEdit}
                                                messageMode={messageMode}
                                                removeMessage={removeMessage}
                                            ></ContextMenu>
                                        </div>
                                    })
                                }
                            </ScrollToBottom>
                        </div>
                    </div>
                    <div className="input">

                        <input className='file' type='file' onChange={(e) => {
                            setMessageFile(e.target.files)
                            console.log(inputRef.current.files[0])
                            fetchFiles(e.target.files)
                        }} ref={inputRef} />


                        <textarea className='input_fld' value={message} onChange={(e) => { setMessage(e.target.value) }}
                            onKeyPress={async (event) => {
                                // event.key === 'Enter' && ( event.preventDefault() && await sendMsg(selectedChatUser.userId, message))
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    await handleMessage(selectedChatUser.userId, message)
                                }
                            }}
                        ></textarea>
                        <button onClick={async () => {
                            await handleMessage(selectedChatUser.userId, message)
                        }} className='send'
                        >Send</button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
.container {
    height: 570px;
    padding: 10px;
    width: 1380px;
    margin: auto;
    background: #BDBDBD;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
}

.contacts_wrapper {
    height: 550px;
    width: 300px;
    overflow: hidden;
    background: #D9D9D9;
    padding: 10px;
    border-radius: 20px;
}

.contacts {
    width: 100%;
    overflow: auto;
    gap: 10px;
    display: flex;
    flex-direction: column;
}

.contact {
    display: flex;
    cursor: pointer;
    border-radius: 7px;
    background: #BDBDBD;
    padding: 6px 10px;

    img {
        height: 60px;
        width: 60px;
        border-radius: 100%;
        object-fit: cover;
        margin-right: 10px;
    }

    p {
        font-family: 'Signika Negative', sans-serif;
        font-size: 18px;
        font-weight: 600;
    }
}

.search {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    input {
        height: 25px;
        width: 60%;
        border: none;
        border-radius: 7px;
        padding: 0 10px;
        margin-right: 10px;
    }
}

.contacts_tag {
    text-align: center;
    font-family: 'Signika Negative', sans-serif;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
}

.chat {
    width: 1000px;
    height: 100%;
    background: #639;
    border-radius: 20px;
}

.info {
    height: 80px;
    width: 100%;
    background: radial-gradient(#000, #0000);
}

.input {
    padding: 30px 0;
    display: flex;
    justify-content: center;
}

.file {
    width: 70px;
    padding: 6px;
    border-radius: 7px;
    border: none;
}

.input_fld {
    min-height: 28px;
    border: none;
    width: 400px;
}

.send {
    width: 80px;
    padding: 6px;
    border-radius: 7px;
    border: none;
}

.messages {
    height: calc(570px - 80px - 90px);
}

.message {
    display: flex;
    border: dashed transparent 3px;
    border-radius: 7px;
    padding: 3px;
}

.message_author_img {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    object-fit: cover;
}

.message_author {
    font-family: 'Signika Negative', sans-serif;
    font-size: 18px;
    font-weight: 600;
}

.message_content {
    font-family: 'Signika Negative', sans-serif;
    font-size: 16px;
}

.messages_container, .scroll_container {
    width: 90%;
    margin: auto;
    height: 420px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
}



.scroll_container > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message_container {
    width: 100%;
    position: relative;
    display: flex;
}

.info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.info_btn {
    border: none;
    font-size: 20px;
    padding: 7px 20px;
    border-radius: 10px;
}

.context_menu {
    display: flex;
    gap: 3px;
}

.action_btn {
    padding: 4px 8px;
    border: none;
    border-radius: 7px;
    cursor: pointer;
}

.add-btn {
    height: 25px;
    border: none;
    border-radius: 7px;
    padding: 0 10px;
    cursor: pointer;
}

.searched-contact {
    overflow: hidden;
    display: flex;
    cursor: pointer;
    border-radius: 7px;
    background: #BDBDBD;
    padding: 6px 10px;

    img {
        height: 50px;
        width: 50px;
        border-radius: 100%;
        object-fit: cover;
        margin-right: 10px;
    }

    a {
        line-height: 50px;
        font-family: 'Signika Negative', sans-serif;
        color: royalblue;
        font-size: 16px;
        width: 150px;
        cursor: pointer;
    }
}

.search-contact-list {
    width: 100%;
    overflow: auto;
    gap: 5px;
    display: flex;
    flex-direction: column;
    height: 200px;
    margin-bottom: 10px;
}

.selected-contact {
    height: 50px;
    display flex;
    justify-content: center;
    align-items: center;
}

.sub-contact {
    height: 40px;
    width: 40px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
}

`;

export default Chat;