export const toPostResponse = (data) => {
  return {
    postId: data.postId,
    title: data.title,
    authorId: data.authorId,
    authorNickname: data.authorNickname,
    authorProfileImageName: data.authorProfileImageName,
    imageName: data.imageName,
    content: data.content,
    createdDate: data.createdDate,
    likeCount: data.likeCount,
    commentCount: data.commentCount,
    viewCount: data.viewCount,
  }
}
