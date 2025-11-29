import styles from '@/components/section/PostSection.module.css'
import { formatToCompactNumber } from '@/utils/format.js'
import InfoTextPair from '@/components/text/InfoTextPair.jsx'
import ProfilePair from '@/components/profile/ProfilePair.jsx'
import ActionButtons from '@/components/button/ActionButtons.jsx'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes/routes.js'
import Modal from '@/components/modal/Modal.jsx'
import useModal from '@/hooks/useModal.jsx'
import { deletePost, getPost } from '@/api/post.js'
import { useEffect, useState } from 'react'

function PostSection({ postId }) {
  const navigate = useNavigate()

  const [post, setPost] = useState({})

  useEffect(() => {
    const getPostDetail = async () => {
      const response = await getPost(postId)
      setPost(response)
    }

    getPostDetail()
  }, [])

  const handleDeletePost = async () => {
    try {
      await deletePost(post.postId)
      alert('게시글이 삭제되었습니다.')
      navigate(ROUTES.POST_LIST)
    } catch (err) {}
  }

  const handleLikeClick = () => {
    // TODO: 게시글 좋아요 API 연결
    setPost((prev) => {
      const liked = !prev.liked
      const likeCount = liked ? prev.likeCount + 1 : prev.likeCount - 1
      return { ...prev, liked, likeCount }
    })
  }

  const handleEditClick = () => {
    navigate(ROUTES.POST_EDIT, { state: { post } })
  }

  const handleDeleteClick = () => {
    modal.openModal()
  }

  const modal = useModal(handleDeletePost)

  return (
    <>
      <section className={styles['post-detail']}>
        <h3 className={styles['post-title']}>{post.title}</h3>

        <div className={styles['post-header']}>
          <div className={styles['post-info']}>
            <ProfilePair nickname={post.authorNickname} nicknameSize={'1rem'} iconSize={'1.6rem'} />

            <div className={styles['post-detail-info']}>
              <InfoTextPair name={'작성일'} value={post.createdDate} />
              <InfoTextPair name={'수정일'} value={post.updatedDate} />
              <InfoTextPair name={'조회수'} value={formatToCompactNumber(post.viewCount)} />
            </div>
          </div>

          <ActionButtons onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
        </div>

        <div className={styles['post-content']}>
          <p>{post.content}</p>

          <div className={styles['post-stats']}>
            <button className={`${styles['post-like-btn']} border border-bold ${post.liked ? styles['liked'] : ''}`} onClick={handleLikeClick}>
              <span className={styles['thumbs-emoji']}>👍</span>
              <span className={styles['like-cnt']}>{formatToCompactNumber(post.likeCount)}</span>
            </button>
          </div>
        </div>
      </section>

      <Modal title={'질문을 삭제하시겠습니까?'} content={'삭제한 내용은 복구할 수 없습니다.'} modal={modal} />
    </>
  )
}

export default PostSection
