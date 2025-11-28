import { COMMENT_MODE } from '@/common/constants/mode.js'
import CommentItem from '@/components/card/CommentItem.jsx'
import CommentForm from '@/components/form/CommentForm.jsx'
import Modal from '@/components/modal/Modal.jsx'
import styles from '@/components/section/CommentSection.module.css'
import useInput from '@/hooks/useInput.jsx'
import useModal from '@/hooks/useModal.jsx'
import { useEffect, useRef, useState } from 'react'
import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx'

function CommentSection() {
  useEffect(() => {
    handleGetNextComments()
  }, [])

  const [mode, setMode] = useState(COMMENT_MODE.CREATE)
  const [comments, setComments] = useState([])

  const targetComment = useRef(null)
  const initContent = useRef(null)

  const contentInput = useInput('')

  const handleGetNextComments = () => {
    // TODO: 댓글 목록 다음 페이지 조회 API 연결
  }

  const { targetRef, pageNoRef, updateHasNextPage } = useInfiniteScroll(handleGetNextComments)

  const handleEditClick = (comment) => {
    targetComment.current = comment
    setMode(COMMENT_MODE.EDIT)
    initContent.current = comment.content
    contentInput.setValue(comment.content)
  }

  const handleDeleteClick = (comment) => {
    targetComment.current = comment
    modal.openModal()
  }

  const handleActionComment = () => {
    const content = contentInput.value

    if (mode === COMMENT_MODE.CREATE) {
      handleCreateComment(content)
    }

    if (mode === COMMENT_MODE.EDIT) {
      handleEditComment(targetComment.current, content)
      setMode(COMMENT_MODE.CREATE)
    }

    contentInput.reset()
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

  const handleDeleteComment = () => {
    // TODO: 댓글 삭제 API 연결
    setComments((prev) => prev.filter((c) => c.commentId !== targetComment.current.commentId))
    modal.onCancel()
  }

  const modal = useModal(handleDeleteComment)

  return (
    <>
      <section className={styles['comment-section']}>
        <div className={styles['comment-header']}>
          <span>답변</span>
          <span className={styles['comment-cnt']}>{comments.length}</span>
        </div>

        <CommentForm mode={mode} initContent={initContent.current} inputs={[contentInput]} onButtonClick={handleActionComment} />

        <ul className={styles['comment-list']}>
          {comments.map((comment) => (
            <CommentItem comment={comment} key={comment.commentId} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
          ))}
        </ul>

        <div ref={targetRef} />
      </section>

      <Modal title={'답변을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} modal={modal} />
    </>
  )
}

export default CommentSection
