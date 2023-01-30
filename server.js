const express = require('express');
const dbOperation = require('./dbFiles/dbOperation');
const cors = require('cors');
const User = require('./dbFiles/models/User');
const {Server} = require('socket.io');

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post('/profile', async function (req, res) {
    let data = await dbOperation.getProfile(req.body.id).then(res => {
        return res
    })

    res.send({ result: data })
})

app.post('/api', async function (req, res) {
    let data = await dbOperation.getPosts(req.body.parameter, req.body.id).then(res => {
        return res
    })
    res.send({ result: data })
})

app.post('/signup', async function (req, res) {
    let data
    try{
        data =  await dbOperation.signUp(req.body.email, req.body.password, req.body.username).then(res => {
            return res
        })
        console.log(data)
        res.send({ result: data })
    }catch(err) {
        res.status(400).send({
            message: 'This is an error!',
            data: {}
        });
    }
})

app.post('/signin', async function (req, res) {
    let data = await dbOperation.signUser(req.body.login, req.body.password).then(res => {
        return res
    })
    let error = ''

    if (data.data.length > 0) {
        if (data.data[0].password !== req.body.password) {
            console.log('Error executed 1')
            res.status(400).send({
                message: 'This is an error!',
                data: {}
            });
        } else {
            res.send({ result: data.data })
        }
    } else {
        console.log('Error executed 2')
        res.status(400).send({
            message: 'This is an error!',
            data: {}
        });
    }
})

app.post('/checkdata', async function (req, res) {
    let data = await dbOperation.checkUser(req.body.email, req.body.username).then(res => {
        return res
    })

    res.send({result: data})
})

app.post('/confirm', async function (req, res) {
    let data = {};
    try {
        data = await dbOperation.confirm(req.body.email, req.body.password, req.body.username).then(res => {
            return res
        })
    } catch (err) {
        console.log(err)
    }

    if (Object.keys(data).length === 0) {
        res.status(400).send({
            message: 'Mail not found',
            data: {}
        });
    } else {
        if (data.error !== undefined) {
            res.status(400).send({
                message: 's',
                data: { error: 'a' }
            });
        } else {
            res.send({ result: data })
        }
    }

})

app.post('/likehandle', async function (req, res) {
    let data = await dbOperation.changeLikeState(req.body.likeId, req.body.postId, req.body.userId).then(res => {
        return res
    })

    res.send({ result: data })
})

app.post('/followhandle', async function (req, res) {
    let data = await dbOperation.changeFollowState(req.body.userId, req.body.subId).then(res => {
        return res
    })

    res.send({ result: data })
})

app.post('/titlealytics', async function (req, res) {
    let data = await dbOperation.getTitlesAnalytics(req.body.title, req.body.userID).then(res => { return res })

    res.send({ result: data })
})

app.post('/postanalytics', async function (req, res) {
    let data = await dbOperation.getPostAnalytics(req.body.postID).then(res => { return res })

    res.send({ result: data })
})

app.post('/contacts', async function (req, res) {
    let data = await dbOperation.getContacts(req.body.userID).then(res => { return res })

    res.send({ result: data })
})

app.post('/chatmessages', async function (req, res) {
    let data = await dbOperation.getChatMessages(req.body.userID, req.body.secondUserID, req.body.chatType).then(res => { return res })

    res.send({ result: data })
})

app.post('/files', async function (req, res) {
    let data = await dbOperation.filesCopy(req.body.parameter).then(res => { return res })

    res.send({ result: data })
})

app.post('/searchcontacts', async function (req, res) {
    let data = await dbOperation.searchContact(req.body.userId, req.body.parameter).then(res => { return res })

    res.send({ result: data })
})


app.post('/createcontact', async function (req, res) {
    let data = await dbOperation.createContact(req.body.userId, req.body.subId, req.body.user).then(res => { return res })

    res.send({ result: data })
})


app.post('/quit', function (req, res) {
    res.send({ result: 'Eat' })
})

async function run() {
    let data = await dbOperation.getPosts().then(res => {
        return res
    })
    console.log(data[0])
}

//run()

const server = app.listen(API_PORT, () => console.log('listening'));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})


io.on('connection', (socket) => {

    socket.on('join_room', (data) => {
        socket.join(data)
    })

    socket.on('send_message', async (data) => {
        let addToDb = await dbOperation.addMessage(data.author, data.receiver, data)
        socket.to(data.room).emit('receive_message', { authorId: data.author, deliveryTime: data.time, message: data.message,
            messageId: addToDb.insertId,
            receiver: data.receiver })
    })

    socket.on('edit_message', async (data) => {
        let editData = await dbOperation.editMessage(data)
        socket.to(data.room).emit('edit_message_state', { message: data.message,
            messageId: data.messageId,
            changedRows: editData.changedRows
        })
    })

    socket.on('delete_message', async (data) => {
        let deletedMessage = await dbOperation.deleteMessage(data.room, data.messageId, data.chatType)
        socket.to(data.room.contact.contactId).emit('deleted_message', {
            messageId: data.messageId,
            affectedRows: deletedMessage.affectedRows
        })
    })

    socket.on('disconnect', () => {
    })
})