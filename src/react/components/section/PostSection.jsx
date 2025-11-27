import styles from '@/components/section/PostSection.module.css'
import { formatToCompactNumber } from '@/utils/format.js'
import InfoTextPair from '@/components/text/InfoTextPair.jsx'
import ProfilePair from '@/components/profile/ProfilePair.jsx'
import ActionButtons from '@/components/button/ActionButtons.jsx'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes/routes.js'

function PostSection({ post, modal }) {
  const navigate = useNavigate()

  const handleEditClick = () => {
    navigate(ROUTES.POST_EDIT, { state: { post } })
  }

  const handleDeleteClick = () => {
    modal.openModal()
  }

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
            <button className={`${styles['like-box']} ${styles['btn-post-like']} ${post.liked ? styles['liked'] : ''}`}>
              <span className={styles['thumbs-emoji']}>👍</span>
              <span className={styles['like-cnt']}>{formatToCompactNumber(post.likeCount)}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default PostSection
