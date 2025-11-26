import styles from '@/components/form/UserForm.module.css'

function UserForm({ children }) {
  return (
    <>
      <form className={styles['user-form']}>{children}</form>
    </>
  )
}

export default UserForm
