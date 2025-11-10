import { isSuccess, parseData } from "../../../api/base-api.js";
import { getCommentList } from "../../../api/comment-api.js";
import {
  deletePost,
  getPostDetail,
  toggleLike,
} from "../../../api/post-api.js";
import Component from "../../../Component.js";
import CommentSection from "../../../components/comment/CommentSection.js";
import Header from "../../../components/header/Header.js";
import Modal from "../../../components/modal/Modal.js";
import PostDetail from "../../../components/post/PostDetail.js";
import {
  getUrlSearchParam,
  navigateTo,
  ROUTES,
} from "../../../router/router.js";
import { formatCompactNumber } from "../../../utils/fomat-utils.js";

export default class PostDetailPage extends Component {
  setUp() {
    this.commentPage = 0;
    this.hasCommentNextPage = false;
  }

  async afterMounted() {
    const postId = getUrlSearchParam("id");
    this.post = await this.handleGetPostDetail(postId);
    this.comments = await this.handleGetCommentList(postId, this.commentPage);

    new Header({ hasBackBtn: true, hasProfileIcon: true });

    this.$postDeleteModal = document.querySelector("#modal-post-delete");
    new Modal(this.$postDeleteModal, {
      title: "게시글을 삭제하시겠습니까?",
      content: "삭제한 내용은 복구할 수 없습니다.",
      onAccept: () => this.handlePostDelete(),
    });

    new PostDetail(document.querySelector(".post-detail"), {
      post: this.post,
      onClickDelete: () => {
        this.$postDeleteModal.classList.toggle("hidden");
      },
      onClickEdit: () => {
        navigateTo(`${ROUTES.POST_EDIT}?id=${this.post.postId}`);
      },
      onClickLike: (postLikeBtn, postLikeCnt) =>
        this.handlePostLike(postLikeBtn, postLikeCnt),
    });

    new CommentSection(document.querySelector(".comment-section"), {
      postId: this.post.postId,
      comments: this.comments,
    });
  }

  async handleGetPostDetail(postId) {
    const postResponse = await getPostDetail(postId);
    return parseData(postResponse);
  }

  async handleGetCommentList(postId, commentPage) {
    const commentResponse = await getCommentList(postId, commentPage);
    const data = await parseData(commentResponse);
    this.hasNextPage = data.page.number < data.page.totalPages;
    return data.content;
  }

  async handlePostDelete() {
    const response = await deletePost(this.post.postId);

    if (isSuccess(response)) {
      alert("게시글이 삭제되었습니다.");
      navigateTo(ROUTES.POST_LIST);
    }

    alert("게시글 삭제에 실패했습니다.");
  }

  async handlePostLike(postLikeBtn, postLikeCnt) {
    const response = await toggleLike(this.post.postId);

    if (isSuccess(response)) {
      alert("좋아요 요청에 실패했습니다.");
      return;
    }

    const data = parseData(response);

    if (data.liked) {
      postLikeCnt.textContent = formatCompactNumber(++this.post.likeCount);
      postLikeBtn.classList.replace("not-liked", "liked");
      return;
    }

    postLikeCnt.textContent = formatCompactNumber(--this.post.likeCount);
    postLikeBtn.classList.replace("liked", "not-liked");
  }

  template() {
    return /*html*/ `
      <section class="post-detail"></section>
      <section class="comment-section"></section>

      <div
        id="modal-post-delete"
        class="modal bg-black-alpha-half hidden"></div>
    `;
  }
}

new PostDetailPage(document.querySelector(".post-detail-container"));
