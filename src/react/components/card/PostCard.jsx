import styles from '@/components/card/PostCard.module.css'
import { formatToCompactNumber } from '@/utils/format.js'
import basicProfile from '@/assets/images/basicProfile.png'
import InfoTextPair from '@/components/text/InfoTextPair.jsx'

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
            <InfoTextPair name={'추천'} value={formatToCompactNumber(post.likeCount)} />
            <InfoTextPair name={'답변'} value={formatToCompactNumber(post.commentCount)} />
            <InfoTextPair name={'조회수'} value={formatToCompactNumber(post.viewCount)} />
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
