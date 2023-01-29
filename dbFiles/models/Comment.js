class Comment {
    constructor(commentId, userId, postId, commentContent, publishDate, _user, replyTo = null) {
        this.commentId = commentId;
        this.userId = userId;
        this.postId = postId;
        this.commentContent = commentContent;
        this.publishDate = publishDate;
        this._user = _user;
        this.replyTo = replyTo;
    }
}

module.exports = Comment;