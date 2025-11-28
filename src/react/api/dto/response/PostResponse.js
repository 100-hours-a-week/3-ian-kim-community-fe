export const toPostResponse = (data) => {
  return {
    postId: data.postId,
    title: data.title,
    authorNickname: data.authorNickname,
    authorProfileImageName: data.authorProfileImageName,
    content: data.content,
    createdDate: data.createdDate,
    likeCount: data.likeCount,
    commentCount: data.commentCount,
    viewCount: data.viewCount,
  }
}
