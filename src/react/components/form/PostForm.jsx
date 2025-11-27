import styles from '@/components/form/PostForm.module.css'

function PostForm({ children }) {
  return (
    <>
      <form className={styles['post-form']}>{children}</form>
    </>
  )
}

export default PostForm
