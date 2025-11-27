import { dummyPosts } from '@/assets/dummy/post.js'
import PostCard from '@/components/card/PostCard.jsx'
import styles from '@/pages/PostListPage/PostListPage.module.css'
import { ROUTES } from '@/routes/routes.js'
import { useNavigate } from 'react-router'

function PostListPage() {
  const navigate = useNavigate()

  const posts = dummyPosts

  const handleCardClick = (post) => {
    navigate(ROUTES.POST(post.postId))
  }

  return (
    <>
      <div className={styles['post-list-page']}>
        <div className={styles['list-header']}>
          <button className={styles['write-btn']}>질문 작성하기</button>
        </div>

        <section className={styles['post-list']}>
          {posts.map((post) => (
            <PostCard post={post} key={post.postId} onCardClick={() => handleCardClick(post)} />
          ))}
        </section>
      </div>
    </>
  )
}

export default PostListPage
