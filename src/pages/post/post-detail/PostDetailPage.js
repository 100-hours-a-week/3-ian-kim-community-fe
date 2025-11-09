import Component from "../../../Component.js";
import CommentSection from "../../../components/comment/CommentSection.js";
import Header from "../../../components/header/Header.js";
import Modal from "../../../components/modal/Modal.js";
import PostDetail from "../../../components/post/PostDetail.js";
import { dummyComments } from "../../../data/dummy-comments.js";
import { dummyPostDetails } from "../../../data/dummy-post-details.js";
import {
  getUrlSearchParam,
  navigateTo,
  ROUTES,
} from "../../../router/router.js";
import { formatCompactNumber } from "../../../utils/fomat-utils.js";

export default class PostDetailPage extends Component {
  setUp() {
    // todo: 게시글 상세 조회 API 요청
    const postId = getUrlSearchParam("id");
    this.states.post = dummyPostDetails[postId];

    // todo: 댓글 목록 API 요청
    this.states.comments = dummyComments;
  }

  afterMounted() {
    new Header({ hasBackBtn: true, hasProfileIcon: true });

    this.$postDeleteModal = document.querySelector("#modal-post-delete");
    new Modal(this.$postDeleteModal, {
      title: "게시글을 삭제하시겠습니까?",
      content: "삭제한 내용은 복구할 수 없습니다.",
      onAccept: () => this.handlePostDelete(),
    });

    new PostDetail(document.querySelector(".post-detail"), {
      post: this.states.post,
      onClickDelete: () => {
        this.$postDeleteModal.classList.toggle("hidden");
      },
      onClickEdit: () => {
        navigateTo(`${ROUTES.POST_EDIT}?id=${this.states.post.postId}`);
      },
      onClickLike: (postLikeBtn, postLikeCnt) =>
        this.handlePostLike(postLikeBtn, postLikeCnt),
    });

    new CommentSection(document.querySelector(".comment-section"), {
      comments: this.states.comments,
    });
  }

  handlePostDelete() {
    // todo: 게시글 삭제 API 요청
    alert("게시글이 삭제되었습니다.");
    navigateTo(ROUTES.POST_LIST);
  }

  handlePostLike(postLikeBtn, postLikeCnt) {
    // todo: 좋아요 API 요청
    this.states.post.liked = !this.states.post.liked;

    if (this.states.post.liked) {
      postLikeCnt.textContent = formatCompactNumber(
        ++this.states.post.likeCount
      );
      postLikeBtn.classList.replace("not-liked", "liked");
      return;
    }
    postLikeCnt.textContent = formatCompactNumber(--this.states.post.likeCount);
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
