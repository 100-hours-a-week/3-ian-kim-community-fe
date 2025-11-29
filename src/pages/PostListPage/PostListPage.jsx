import { getPosts } from '@/api/post.js'
import Button from '@/components/button/Button.jsx'
import PostCard from '@/components/card/PostCard.jsx'
import useInfiniteScroll from '@/hooks/useInfiniteScroll.jsx'
import styles from '@/pages/PostListPage/PostListPage.module.css'
import { ROUTES } from '@/routes/routes.js'
import { useState } from 'react'
import { useNavigate } from 'react-router'

function PostListPage() {
  const navigate = useNavigate()

  const [pageNo, setPageNo] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [posts, setPosts] = useState([])

  const handleCardClick = (post) => {
    navigate(ROUTES.POST(post.postId))
  }

  const handleCreateClick = () => {
    navigate(ROUTES.POST_CREATE)
  }

  const handleGetNextPosts = async () => {
    try {
      const { content, page } = await getPosts(pageNo)
      setPageNo((prev) => prev + 1)
      setHasNextPage(page.number < page.totalPages)
      setPosts((prev) => [...prev, ...content])
    } catch (err) {}
  }

  const { target } = useInfiniteScroll({ hasNextPage, onIntersect: handleGetNextPosts })

  const EmptyPage = () => {
    return <h1>아직 작성된 질문이 없습니다.</h1>
  }

  const ListPage = () => {
    return (
      <section className={styles['post-list']}>
        {posts.map((post) => (
          <PostCard post={post} key={post.postId} onCardClick={() => handleCardClick(post)} />
        ))}

        <div ref={target} style={{ height: '1rem' }} />
      </section>
    )
  }

  return (
    <>
      <div className={styles['post-list-page']}>
        <div className={styles['list-header']}>
          <Button text={'질문 작성하기'} className={styles['write-btn']} onButtonClick={handleCreateClick} />
        </div>

        {posts.length === 0 && EmptyPage()}
        {posts.length > 0 && ListPage()}

        <div ref={target} style={{ height: '1rem' }} />
      </div>
    </>
  )
}

export default PostListPage
