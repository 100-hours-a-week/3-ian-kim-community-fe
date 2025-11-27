import { dummyPosts } from '@/assets/dummy/post.js'
import Button from '@/components/button/Button.jsx'
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

  const handleCreateClick = () => {
    navigate(ROUTES.POST_CREATE)
  }

  return (
    <>
      <div className={styles['post-list-page']}>
        <div className={styles['list-header']}>
          <Button text={'질문 작성하기'} className={styles['write-btn']} onButtonClick={handleCreateClick} />
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
