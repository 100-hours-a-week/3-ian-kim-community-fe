import { dummyComments } from '@/assets/dummy/comment.js'
import { dummyPosts } from '@/assets/dummy/post.js'
import Modal from '@/components/modal/Modal.jsx'
import CommentSection from '@/components/section/CommentSection.jsx'
import PostSection from '@/components/section/PostSection.jsx'
import useModal from '@/hooks/useModal.jsx'
import styles from '@/pages/PostPage/PostPage.module.css'
import { ROUTES } from '@/routes/routes.js'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

function PostPage() {
  const navigate = useNavigate()

  const { postId } = useParams()

  const post = dummyPosts.find((post) => post.postId === Number(postId))
  const [comments, setComments] = useState(dummyComments)

  useEffect(() => {
    // TODO: 게시글 조회 API 연결
    // TODO: 댓글 목록 조회 API 연결
  }, [])

  const handleDeleteComment = (comment) => {
    setComments((prev) => prev.filter((c) => c.commentId !== comment.commentId))
  }

  const handleDeletePost = () => {
    // TODO: 게시글 삭제 API 연결
    navigate(ROUTES.POST_LIST)
  }

  const handleCreateComment = (content) => {
    // TODO: 댓글 생성 API 연결
    setComments((prev) => [...prev])
  }

  const handleEditComment = (comment, content) => {
    // TODO: 댓글 수정 API 연결
    setComments((prev) => {
      prev.find((c) => c.commentId === comment.commentId).content = content
      return [...prev]
    })
  }

  const modal = useModal(handleDeletePost)

  return (
    <>
      <div className={styles['post-detail-page']}>
        <PostSection post={post} modal={modal} />

        <CommentSection comments={comments} onDeleteComment={handleDeleteComment} onCreateComment={handleCreateComment} onEditComment={handleEditComment} />

        <Modal title={'질문을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} modal={modal} />
      </div>
    </>
  )
}

export default PostPage
