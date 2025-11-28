import Button from '@/components/button/Button.jsx'
import PostCard from '@/components/card/PostCard.jsx'
import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx'
import styles from '@/pages/PostListPage/PostListPage.module.css'
import { ROUTES } from '@/routes/routes.js'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function PostListPage() {
  const navigate = useNavigate()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    handleGetNextPosts()
  }, [])

  const handleCardClick = (post) => {
    navigate(ROUTES.POST(post.postId))
  }

  const handleCreateClick = () => {
    navigate(ROUTES.POST_CREATE)
  }

  const handleGetNextPosts = () => {
    // TODO: 게시글 목록 다음 페이지 조회 API 연결
  }

  const { targetRef, pageNoRef, updateHasNextPage } = useInfiniteScroll(handleGetNextPosts)

  if (posts.length === 0) {
    return (
      <>
        <div className={styles['post-list-page']}>
          <h1>게시글이 없습니다.</h1>
        </div>
      </>
    )
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

          <div ref={targetRef} />
        </section>
      </div>
    </>
  )
}

export default PostListPage
