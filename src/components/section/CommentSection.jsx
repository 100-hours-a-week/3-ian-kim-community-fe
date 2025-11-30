import { COMMENT_MODE } from '@/common/constants/mode.js'
import CommentItem from '@/components/card/CommentItem.jsx'
import CommentForm from '@/components/form/CommentForm.jsx'
import Modal from '@/components/modal/Modal.jsx'
import styles from '@/components/section/CommentSection.module.css'
import useInput from '@/hooks/useInput.jsx'
import useModal from '@/hooks/useModal.jsx'
import { useCallback, useRef, useState } from 'react'
import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx'
import { createComment, deleteComment, getComments, updateComment } from '@/api/comment.js'
import CommentCreateRequest from '@/api/dto/request/CommentCreateRequest.js'
import CommentUpdateRequest from '@/api/dto/request/CommentUpdateRequest.js'
import { getErrorMessage } from '@/api/error.js'

function CommentSection({ postId }) {
  const [mode, setMode] = useState(COMMENT_MODE.CREATE)
  const [pageNo, setPageNo] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [comments, setComments] = useState([])

  const targetComment = useRef(null)
  const initContent = useRef(null)

  const contentInput = useInput('')

  const handleGetNextComments = useCallback(async () => {
    try {
      const { content, page } = await getComments(postId, pageNo)
      setPageNo((prev) => prev + 1)
      setHasNextPage(page.number < page.totalPages)
      setComments((prev) => [...prev, ...content])
    } catch (errCode) {
      alert(getErrorMessage(errCode))
    }
  }, [pageNo])

  const { target } = useInfiniteScroll({ hasNextPage, onIntersect: handleGetNextComments })

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

  const handleCreateComment = async (content) => {
    try {
      const response = await createComment(postId, new CommentCreateRequest({ content }))
      alert('답변이 작성되었습니다.')
      setComments((prev) => [response, ...prev])
    } catch (errCode) {
      alert(getErrorMessage(errCode))
    }
  }

  const handleEditComment = async (comment, content) => {
    try {
      await updateComment(comment.commentId, new CommentUpdateRequest({ content }))
      alert('답변이 수정되었습니다.')
      setComments((prev) => prev.map((c) => (c.commentId === comment.commentId ? { ...c, content } : c)))
    } catch (errCode) {
      alert(getErrorMessage(errCode))
    }
  }

  const handleDeleteComment = async () => {
    if (!targetComment.current) {
      alert('답변을 삭제할 수 없습니다.')
    }

    try {
      await deleteComment(targetComment.current.commentId)
      alert('답변이 삭제되었습니다.')
      setComments((prev) => prev.filter((c) => c.commentId !== targetComment.current.commentId))
      modal.onCancel()
    } catch (errCode) {
      alert(getErrorMessage(errCode))
    }
  }

  const modal = useModal(handleDeleteComment)

  const EmptyPage = () => {
    return <h4>아직 작성된 답변이 없습니다.</h4>
  }

  const ListPage = () => {
    return (
      <ul className={styles['comment-list']}>
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.commentId} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
        ))}
      </ul>
    )
  }

  return (
    <>
      <section className={styles['comment-section']}>
        <div className={styles['comment-header']}>
          <span>답변</span>
          <span className={styles['comment-cnt']}>{comments.length}</span>
        </div>

        <CommentForm mode={mode} initContent={initContent.current} inputs={[contentInput]} onButtonClick={handleActionComment} />

        {comments.length === 0 && EmptyPage()}
        {comments.length > 0 && ListPage()}

        <div ref={target} />
      </section>

      <Modal title={'답변을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} modal={modal} />
    </>
  )
}

export default CommentSection
