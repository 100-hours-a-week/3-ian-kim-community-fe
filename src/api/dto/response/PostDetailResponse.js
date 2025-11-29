export const toPostDetailResponse = (data) => {
  return {
    postId: data.postId,
    title: data.title,
    authorId: data.authorId,
    authorNickname: data.authorNickname,
    authorProfileImageName: data.authorProfileImageName,
    content: data.content,
    imageName: data.imageName,
    originImageName: data.originImageName,
    liked: data.liked,
    createdDate: data.createdDate,
    updatedDate: data.updatedDate,
    likeCount: data.likeCount,
    commentCount: data.commentCount,
    viewCount: data.viewCount,
  }
}
