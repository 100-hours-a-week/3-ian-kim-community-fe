import { COMMENT_MODE } from '@/common/constants/mode.js'
import CommentItem from '@/components/card/CommentItem.jsx'
import CommentForm from '@/components/form/CommentForm.jsx'
import Modal from '@/components/modal/Modal.jsx'
import CommentPagination from '@/components/pagination/CommentPagination.jsx'
import styles from '@/components/section/CommentSection.module.css'
import useInput from '@/hooks/useInput.jsx'
import useModal from '@/hooks/useModal.jsx'
import { useRef, useState } from 'react'

function CommentSection({ comments, onDeleteComment, onCreateComment, onEditComment }) {
  const [mode, setMode] = useState(COMMENT_MODE.CREATE)
  const targetComment = useRef(null)
  const initContent = useRef(null)

  const contentInput = useInput('')

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

  const handleDeleteItem = () => {
    onDeleteComment(targetComment.current)
    modal.onCancel()
  }

  const handleActionComment = () => {
    const content = contentInput.value

    if (mode === COMMENT_MODE.CREATE) {
      onCreateComment(content)
    }

    if (mode === COMMENT_MODE.EDIT) {
      onEditComment(targetComment.current, content)
      setMode(COMMENT_MODE.CREATE)
    }

    contentInput.reset()
  }

  const modal = useModal(handleDeleteItem)

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

        <CommentPagination />
      </section>

      <Modal title={'답변을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} modal={modal} />
    </>
  )
}

export default CommentSection
