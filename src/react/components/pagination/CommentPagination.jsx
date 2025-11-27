import styles from '@/components/pagination/CommentPagination.module.css'

function CommentPagination({}) {
  return (
    <>
      <div className={styles['comment-pagination']}>
        <button className={`${styles['btn-prev-page']} ${styles['btn-page']}`}>{'<'}</button>

        <div className={styles['page-number-list']}></div>

        <button className={`${styles['btn-next-page']} ${styles['btn-page']}`}>{'>'}</button>
      </div>
    </>
  )
}

export default CommentPagination
