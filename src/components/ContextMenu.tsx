import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { MessageMode } from '../interfaces/message';

const ContextMenu = (props: any) => {
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (edit) {
            console.log(props.message.message)
            props.onUpdate(props.message.message)
            props.changeMessageMode(MessageMode.EDIT)
            props.changeMessageToEdit(props.message)
        } else {
            props.changeMessageToEdit({})
            props.changeMessageMode(MessageMode.TYPE)
            props.onUpdate('')
        }
    }, [edit])

    useEffect(() => {
        if(props.messageMode === MessageMode.TYPE)
            setEdit(false)
    }, [props.messageMode])
    

    return <Container>
        <div className='context_menu'>
            <button className='action_btn' onClick={() => {
                setEdit(!edit)
            }}>Edit</button>
            <button className='action_btn' onClick={() => {
                props.removeMessage(props.message.messageId)
            }}>Delete</button>
            <button className='action_btn'>Save</button>
        </div>
    </Container>
};

const Container = styled.div`
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
`

export default ContextMenu;