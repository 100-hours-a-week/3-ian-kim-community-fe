import CommentSection from '@/components/section/CommentSection.jsx'
import PostSection from '@/components/section/PostSection.jsx'
import styles from '@/pages/PostPage/PostPage.module.css'
import { useParams } from 'react-router'

function PostPage() {
  const { postId } = useParams()

  return (
    <>
      <div className={styles['post-detail-page']}>
        <PostSection postId={postId} />
        <CommentSection />
      </div>
    </>
  )
}

export default PostPage
