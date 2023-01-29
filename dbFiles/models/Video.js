class Video {
    constructor(videoId, userId, postId, videoLink, videoLength, datePublished) {
        this.videoId = videoId;
        this.userId = userId;
        this.postId = postId;
        this.videoLink = videoLink;
        this.videoLength = videoLength;
        this.datePublished = datePublished;
        this.contentType = 'video';
    }
}

module.exports = Video;