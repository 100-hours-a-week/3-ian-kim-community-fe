export const toCommentResponse = (data) => {
  return {
    commentId: data.commentId,
    postId: data.postId,
    authorId: data.authorId,
    authorNickname: data.authorNickname,
    authorProfileImageName: data.authorProfileImageName,
    content: data.content,
    createdDate: data.createdDate,
  }
}
