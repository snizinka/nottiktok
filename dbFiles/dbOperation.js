const config = require('./dbConfig');
const util = require('util');
const Category = require('./models/Category');
const User = require('./models/User');
const Video = require('./models/Video');
const Picture = require('./models/Picture');
const Text = require('./models/Text');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const nodemailer = require('nodemailer');

const query = util.promisify(config.query).bind(config)

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'snizinkavolshebna@gmail.com',
        pass: 'mdzvcgvzmdzqscnl'
    }
});

const getProfile = async (id) => {
    let amountOfFollowers = {}
    let amountOfFollowing = {}
    let categories = {}
    let posts = {}
    let user = {}
    let photos = [];
    let saved = []

    let y = []

    try {
        user = await query(`SELECT * FROM nottiktok.users as us WHERE us.userId = ${id}`)
        categories = await query(`SELECT distinct cy.categoryId, cy.categoryName FROM nottiktok.category_link as ck LEFT JOIN nottiktok.category as cy ON cy.categoryId = ck.categoryId LEFT JOIN nottiktok.post as pt ON pt.postId = ck.postId WHERE pt.userId = ${id}`)
        amountOfFollowers = await query(`SELECT COUNT(*) as followers FROM nottiktok.subscription as fs WHERE fs.userId = ${id}`)
        amountOfFollowing = await query(`SELECT COUNT(*) as followers FROM nottiktok.subscription as fs WHERE fs.subscriberId = ${id}`)
        posts = await query(`SELECT pt.postId, pt.description, us.userId, us.userLink, us.username, us.userImage FROM nottiktok.post as pt LEFT JOIN nottiktok.users as us ON us.userId = pt.userId WHERE pt.userId = ${id}`);
        saved = await query(`SELECT * FROM nottiktok.saved WHERE userId = ${id}`);

        for (let i = 0; i < posts.length; i++) {
            let tempPhoto = JSON.parse(JSON.stringify(await query(`SELECT * FROM nottiktok.photocontent as pht WHERE pht.postId = ${posts[i].postId}`)));

            if (tempPhoto[0] !== undefined) {
                photos.push(tempPhoto);
            }
        }

        for (let i = 0; i < posts.length; i++) {
            let pics = []
            for (let p = 0; p < photos.length; p++) {
                for (let w = 0; w < photos[p].length; w++) {
                    if (photos.at(p)[w].postId === posts[i].postId) {
                        pics.push(photos[p])
                    }
                }
            }
            let ps = posts[i]
            y.push({ ps, pics })
        }

    } catch (err) {
        console.log(err)
    }

    let followers = amountOfFollowers.length > 0 ? amountOfFollowers[0] : 0
    let following = amountOfFollowing.length > 0 ? amountOfFollowing[0] : 0
    let userProfile = user.length > 0 ? user[0] : 0

    return { data: { followers, following, categories, posts, userProfile, y, saved } }
}

const getPosts = async (parameter = 'DEFAULT', id = 0) => {
    let likes = [];
    let mylikes = [];
    let comments = [];
    let shares = [];
    let photos = [];
    let videos = [];
    let textes = [];
    let categories = [];
    let _posts = [];
    let subscribedOn = [];

    try {
        let posts = {}
        if (parameter === 'DEFAULT') {
            posts = await query(`SELECT pt.postId, pt.description, us.userId, us.userLink, us.username, us.userImage FROM nottiktok.post as pt LEFT JOIN nottiktok.users as us ON us.userId = pt.userId`);
        } else if (parameter === 'BY_USER_ID') {
            posts = await query(`SELECT pt.postId, pt.description, us.userId, us.userLink, us.username, us.userImage FROM nottiktok.post as pt LEFT JOIN nottiktok.users as us ON us.userId = pt.userId WHERE pt.userId = ${id}`);
        } else if (parameter === 'BY_POST_ID') {
            posts = await query(`SELECT pt.postId, pt.description, us.userId, us.userLink, us.username, us.userImage FROM nottiktok.post as pt LEFT JOIN nottiktok.users as us ON us.userId = pt.userId WHERE pt.postId = ${id}`);
        }


        for (let i = 0; i < posts.length; i++) {
            let tempPhoto = JSON.parse(JSON.stringify(await query(`SELECT * FROM nottiktok.photocontent as pht WHERE pht.postId = ${posts[i].postId}`)));
            let tempVideo = JSON.parse(JSON.stringify(await query(`SELECT * FROM nottiktok.videocontent as vc WHERE vc.postId = ${posts[i].postId}`)));
            let tempText = JSON.parse(JSON.stringify(await query(`SELECT * FROM nottiktok.textcontent as txt WHERE txt.postId = ${posts[i].postId}`)));

            let tempCategory = JSON.parse(JSON.stringify(await query(`SELECT * FROM nottiktok.category_link as cl LEFT JOIN nottiktok.category as cy ON cy.categoryId = cl.categoryId WHERE cl.postId = ${posts[i].postId}`)));

            let tempLikes = JSON.parse(JSON.stringify(await query(`SELECT count(*) as likes, ls.postId FROM nottiktok.likes as ls WHERE ls.postId = ${posts[i].postId}`)));

            let tempShares = JSON.parse(JSON.stringify(await query(`SELECT count(*) as shares, ss.postId FROM nottiktok.shares as ss WHERE ss.postId = ${posts[i].postId}`)));

            let tempComments = JSON.parse(JSON.stringify(await query(`SELECT * from nottiktok.comments as cs LEFT JOIN nottiktok.users as us ON us.userId = cs.userId WHERE cs.postId = ${posts[i].postId}`)));

            let tempILiked = JSON.parse(JSON.stringify(await query(`SELECT ls.likesId, ls.postId FROM nottiktok.likes as ls WHERE ls.postId = ${posts[i].postId} AND ls.userId = ${id}`)));

            let subscribed = await query(`SELECT * FROM nottiktok.subscription WHERE userId = ${posts[i].userId} AND subscriberId = ${id}`); // userId needed

            if (subscribed[0] !== undefined) {
                subscribedOn.push(subscribed);
            }

            if (tempPhoto[0] !== undefined) {
                photos.push(tempPhoto);
            }
            if (tempVideo[0] !== undefined) {
                videos.push(tempVideo);
            }
            if (tempText[0] !== undefined) {
                textes.push(tempText);
            }
            if (tempCategory[0] !== undefined) {
                categories.push(tempCategory);
            }
            if (tempLikes[0] !== undefined) {
                likes.push(tempLikes);
            }
            if (tempShares[0] !== undefined) {
                shares.push(tempShares);
            }
            if (tempComments[0] !== undefined) {
                comments.push(tempComments);
            }
            if (tempILiked[0] !== undefined) {
                mylikes.push(tempILiked);
            }
        }

        for (let i = 0; i < posts.length; i++) {
            let _User = new User(posts[i].userId, posts[i].username, posts[i].userLink, posts[i].userImage)
            let _Category = []
            let _Photos = []
            let _Video = []
            let _Text = []
            let _Comments = []
            let like = 0;
            let share = 0;
            let iLiked = 0;
            let subed = [];

            for (let q = 0; q < subscribedOn.length; q++) {
                for (let j = 0; j < subscribedOn[q].length; j++) {
                    if (subscribedOn.at(q)[j].userId === posts[i].userId) {
                        subed = subscribedOn.at(q)[j]
                    }
                }
            }

            for (let q = 0; q < shares.length; q++) {
                for (let j = 0; j < shares[q].length; j++) {
                    if (shares.at(q)[j].postId === posts[i].postId) {
                        share = shares.at(q)[j]
                    }
                }
            }

            for (let q = 0; q < likes.length; q++) {
                for (let j = 0; j < likes[q].length; j++) {
                    if (likes.at(q)[j].postId === posts[i].postId) {
                        like = likes.at(q)[j]
                    }
                }
            }

            for (let q = 0; q < mylikes.length; q++) {
                for (let j = 0; j < mylikes[q].length; j++) {
                    if (mylikes.at(q)[j].postId === posts[i].postId) {
                        iLiked = mylikes.at(q)[j]
                    }
                }
            }

            for (let q = 0; q < comments.length; q++) {
                for (let j = 0; j < comments[q].length; j++) {
                    if (comments.at(q)[j].postId === posts[i].postId) {
                        _Comments.push(new Comment(comments.at(q)[j].commentId, comments.at(q)[j].userId, comments.at(q)[j].postId, comments.at(q)[j].commentContent, comments.at(q)[j].publishDate, new User(comments.at(q)[j].userId, comments.at(q)[j].username, comments.at(q)[j].userLink, comments.at(q)[j].userImage)))
                    }
                }
            }

            for (let q = 0; q < categories.length; q++) {
                for (let j = 0; j < categories[q].length; j++) {
                    if (categories.at(q)[j].postId === posts[i].postId) {
                        _Category.push(new Category(categories.at(q)[j].categoryLinkId, categories.at(q)[j].categoryId, categories.at(q)[j].categoryName))
                    }
                }
            }

            for (let q = 0; q < photos.length; q++) {
                for (let j = 0; j < photos[q].length; j++) {
                    if (photos.at(q)[j].postId === posts[i].postId) {
                        _Photos.push(new Picture(photos.at(q)[j].photoContentId, photos.at(q)[j].userId, photos.at(q)[j].postId, photos.at(q)[j].photoLink, photos.at(q)[j].datePublished))
                    }
                }
            }

            for (let q = 0; q < videos.length; q++) {
                for (let j = 0; j < videos[q].length; j++) {
                    if (videos.at(q)[j].postId === posts[i].postId) {
                        _Video.push(new Video(videos.at(q)[j].videoId, videos.at(q)[j].userId, videos.at(q)[j].postId, videos.at(q)[j].videoLink, videos.at(q)[j].videoLength, videos.at(q)[j].datePublished))
                    }
                }
            }

            for (let q = 0; q < textes.length; q++) {
                for (let j = 0; j < textes[q].length; j++) {
                    if (textes.at(q)[j].postId === posts[i].postId) {
                        _Text.push(new Text(textes.at(q)[j].textContentId, textes.at(q)[j].userId, textes.at(q)[j].postId, textes.at(q)[j].textContent, textes.at(q)[j].datePublished))
                    }
                }
            }

            let contentAmount = _Photos.length + _Video.length + _Text.length;

            _posts.push(new Post(posts[i].postId,
                _User,
                _Category,
                posts[i].description,
                _Video,
                _Photos,
                _Text,
                like,
                share,
                _Comments,
                subed,
                iLiked,
                null,
                null,
                [
                    _Photos,
                    _Video,
                    _Text
                ],
                contentAmount
            ))
        }

        return { posts, media: { videos, photos, textes }, converted: { _posts } };
    } catch (error) {
        console.log(error);
    }
}

const signUser = async (login, password) => {
    try {
        let data = JSON.parse(JSON.stringify(await query(`SELECT * FROM nottiktok.users WHERE username = '${login}'`)));

        return { data }
    } catch (err) {
        console.log(err)
    }
}

const changeLikeState = async (likeId, postId, userId) => {
    try {
        let result = JSON.parse(JSON.stringify(await query(`SELECT ls.likesId, ls.postId FROM nottiktok.likes as ls WHERE ls.likesId = '${likeId}'`)));
        let data;

        if (result.length === 0) {
            await query(`INSERT INTO nottiktok.likes(userId, postId) VALUES(${userId}, ${postId})`)
            data = JSON.parse(JSON.stringify(await query(`SELECT ls.likesId, ls.postId FROM nottiktok.likes as ls WHERE ls.userId = ${userId} AND ls.postId = '${postId}'`)))
        } else {
            await query(`DELETE FROM nottiktok.likes WHERE likesId = '${likeId}'`);
            data = {}
        }
        return { data }
    } catch (err) {
        console.log(err)
    }
}


const changeFollowState = async (userId, subId) => {
    try {
        let result = JSON.parse(JSON.stringify(await query(`SELECT * FROM nottiktok.subscription WHERE userId = ${userId} AND subscriberId = ${subId}`)));
        let data;

        if (result.length === 0) {
            let lo = await query(`INSERT INTO nottiktok.subscription (userId, subscriberId, subscribtionDate) VALUES(${userId}, ${subId}, '2022-12-23 00:00:00')`)
            data = { subscriptionId: lo.insertId, userId: userId, subscriberId: subId }
        } else {
            await query(`DELETE FROM nottiktok.subscription WHERE userId = ${userId} AND subscriberId = ${subId}`);
            data = {}
        }
        return { data }
    } catch (err) {
        console.log(err)
    }
}

function makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const checkUser = async (email, username) => {
    let un = await query(`SELECT * FROM nottiktok.users as us WHERE us.username = '${username}'`)
    let el = await query(`SELECT * FROM nottiktok.users as us WHERE us.mailAddress = '${email}'`)

    return { username: un, email: el }
}


const confirm = async (email, password, username) => {
    let confirmationNumber = makeid(5);
    var mailOptions = {
        from: 'Not TikTok <snizinkavolshebna@gmail.com>',
        to: email,
        subject: 'Not TikTok account Confirmation',
        text: confirmationNumber
    }
    try {
        return new Promise((resolve, reject) => {

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    reject({ error: 'Mail not found' });
                } else {
                    resolve({ confirmationNumber: confirmationNumber, email: email, password: password, username: username });
                }
            })
        })
    }
    catch (err) {
        resolve({ error: 'Mail not found' })
    }
}



const signUp = async (email, password, username) => {
    try {
        let data = await query(`INSERT INTO nottiktok.users(username, userLink, password, mailAddress) values('${username}', '${username}', '${password}', '${email}')`);
        return { made: data }
    } catch (err) {
        return { err: 'NOT DONE' }
    }
}

const getTitlesAnalytics = async (postTitle, userID) => {
    let postByTitle = await query(`SELECT pst.postId, pst.userId, pst.description, STR_TO_DATE(pst.postDate, '%Y-%m-%d%H:%i:%s') as postDate FROM nottiktok.post as pst WHERE pst.description LIKE '%${postTitle}%' AND pst.userId = ${userID}`);

    return { postAnalytics: { postByTitle } }
}

const getPostAnalytics = async (postID) => {
    let postByTitle = await query(`SELECT pst.postId, pst.userId, pst.description, STR_TO_DATE(pst.postDate, '%Y-%m-%d%H:%i:%s') as postDate FROM nottiktok.post as pst WHERE pst.postId = ${postID}`);
    let date = new Date(postByTitle[0].postDate).toISOString()
    let subscriptionAnalys = await query(`SELECT COUNT(sub.subscribtionDate) as amount, sub.subscribtionDate FROM nottiktok.subscription as sub WHERE sub.subscribtionDate >= STR_TO_DATE('${date}', '%Y-%m-%dT%H:%i:%s') AND sub.subscribtionDate <= '2022.12.30' GROUP BY sub.subscribtionDate ORDER BY sub.subscribtionDate ASC `);
    let likesAnalys = await query(`SELECT count(*) as lks FROM nottiktok.likes as lk WHERE lk.postId = ${postByTitle[0].postId}`);

    return { postAnalytics: { postByTitle, subscriptionAnalys, likesAnalys } }
}

const getContacts = async (userID) => {
    let contacts = JSON.parse(JSON.stringify(await query(`SELECT contactId, fuserId, suserId FROM nottiktok.contacts WHERE fuserId = ${userID} OR suserId = ${userID}`)));
    let sb = []

    let groupUsers = JSON.parse(JSON.stringify(await query(`SELECT ch.chatId, ch.chatType, ch.chatName, cll.contactLinkId, cll.chatId, cll.userId, cll.contactId FROM nottiktok.chat as ch
    LEFT JOIN nottiktok.contactlink cl ON cl.userId = ${userID}
    LEFT JOIN nottiktok.contactlink as cll ON cll.chatId = cl.chatId AND cll.userId != ${userID}`)));

    let groups = JSON.parse(JSON.stringify(await query(`SELECT ch.chatId, ch.chatType, ch.chatName, cl.contactLinkId, cl.chatId, cl.userId, cl.contactId FROM nottiktok.chat as ch
    LEFT JOIN nottiktok.contactlink cl ON cl.userId = ${userID}`)))

    console.log(groups)

    if (contacts.length === 0)
        contacts = []
    else {
        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].fuserId !== userID)
            {
                let oneUser = JSON.parse(JSON.stringify(await query(`SELECT userId, username, userLink, userImage FROM nottiktok.users WHERE userId = ${contacts[i].fuserId}`)));
                sb.push({ contact: contacts[i], user: oneUser[0]})
            }
            else
            {
                let oneUser = JSON.parse(JSON.stringify(await query(`SELECT userId, username, userLink, userImage FROM nottiktok.users WHERE userId = ${contacts[i].suserId}`)))
                sb.push({ contact: contacts[i], user: oneUser })
            }
        }

        // for(let i = 0; i < groups.length; i++) {
        //     sb.push({contact: { contactId: groups[i].chatId, chatName: groups[i].chatName} })
        // }
    }

    return { contacts, sb };
}


const getChatMessages = async (userID, secondUserID) => {
    let messages = JSON.parse(JSON.stringify(await query(`SELECT * FROM nottiktok.messages as msg
    WHERE (msg.authorId = ${userID} AND msg.receiver = ${secondUserID}) OR (msg.authorId = ${secondUserID} AND msg.receiver = ${userID}) 
    ORDER BY msg.deliveryTime`)));

    return { messages: messages }
}

const addMessage = async (userID, secondUserID, messageData) => {
    let message = await query(`INSERT INTO nottiktok.messages(authorId, receiver, message, deliveryTime) VALUES(${userID}, ${secondUserID}, '${messageData.message}', '2022.12.01')`)
    console.log(message)
    return message;
}

const editMessage = async (messageId, message) => {
    let messaged = await query(`UPDATE nottiktok.messages SET message = '${message}' WHERE messageId = ${messageId}`)

    return messaged;
}

const deleteMessage = async (messageId) => {
    let deletedMessage = await query(`DELETE FROM nottiktok.messages WHERE messageId = ${messageId}`)

    return deletedMessage;
}

const filesCopy = async (files) => {
    console.log(files)
    return "aaaa";
}

const searchContact = async (contact) => {
    let contacts = await query(`SELECT userId, username, userLink, userImage FROM nottiktok.users as u
    WHERE u.userLink LIKE '%${contact}%'`);

    return { data: contacts };
}

const createContact = async (userId, subId, user) => {
    let check = await query(`SELECT fuserId, suserId FROM nottiktok.contacts 
    WHERE (fuserId = ${userId} AND suserId = ${subId}) OR (fuserId = ${subId} AND suserId = ${userId})`)

    let contact = {}

    if (Object.keys(check).length === 0) {
        let insert = await query(`INSERT INTO nottiktok.contacts (fuserId, suserId, contactDate) VALUES (${userId}, ${subId}, '2022.01.29')`)
        let insertID = insert.insertId;
        contact = { contact: { contactId: insertID, fuserId: userId, suserId: subId }, user: user }
        console.log(contact)
    }

    return { data: contact }
}

module.exports = {
    getPosts,
    signUser,
    changeLikeState,
    getProfile,
    confirm,
    checkUser,
    signUp,
    getPostAnalytics,
    getTitlesAnalytics,
    changeFollowState,
    getContacts,
    getChatMessages,
    addMessage,
    editMessage,
    deleteMessage,
    filesCopy,
    searchContact,
    createContact
};