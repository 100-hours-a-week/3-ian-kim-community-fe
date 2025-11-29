import ActionButtons from '@/components/button/ActionButtons.jsx'
import styles from '@/components/card/CommentItem.module.css'
import ProfilePair from '@/components/profile/ProfilePair.jsx'

function CommentItem({ comment, onEditClick, onDeleteClick }) {
  return (
    <>
      <li className={styles['comment-item']}>
        <div className={styles['comment-header']}>
          <div className={styles['comment-info']}>
            <ProfilePair imageName={comment.authorProfileImageName} nickname={comment.authorNickname} nicknameSize={'0.9rem'} iconSize={'1.4rem'} isDeletedUser={comment.authorId === null} />
            <span>{comment.createdDate}</span>
          </div>

          <ActionButtons onEditClick={() => onEditClick(comment)} onDeleteClick={() => onDeleteClick(comment)} padding={'0.5rem 1rem'} />
        </div>

        <p className={styles['comment-content']}>{comment.content}</p>
      </li>
    </>
  )
}

export default CommentItem
