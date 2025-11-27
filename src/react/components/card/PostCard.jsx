import styles from '@/components/card/PostCard.module.css'
import { formatToCompactNumber } from '@/utils/format.js'
import basicProfile from '@/assets/images/basicProfile.png'

function PostCard({ post, onCardClick }) {
  return (
    <>
      <article className={`${styles['post-card']} border`} onClick={onCardClick}>
        <div className={styles['card-body']}>
          <div className={styles['title']}>{post.title.slice(0, 26)}</div>
          <div className={styles['content']}>{post.content.length >= 40 ? post.content.slice(0, 40) + '...' : post.content}</div>
        </div>

        <div className={styles['card-footer']}>
          <div className={styles['post-stats']}>
            <span className={styles['info-text']}>추천 {formatToCompactNumber(post.likeCount)}</span>
            <span className={styles['info-text']}>답변 {formatToCompactNumber(post.commentCount)}</span>
            <span className={styles['info-text']}>조회수 {formatToCompactNumber(post.viewCount)}</span>
          </div>

          <div className={styles['post-info']}>
            <img src={basicProfile} alt='프로필' className={styles['profile-icon']} />
            <span className={styles['info-text']}>{post.authorNickname}</span>
            <span className={styles['info-text']}>{post.createdDate}</span>
          </div>
        </div>
      </article>
    </>
  )
}

export default PostCard
