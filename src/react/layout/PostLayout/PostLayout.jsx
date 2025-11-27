import { Outlet } from 'react-router'
import styles from '@/layout/PostLayout/PostLayout.module.css'

function PostLayout() {
  return (
    <>
      <main className={styles['post-layout']}>
        <Outlet />
      </main>
    </>
  )
}

export default PostLayout
