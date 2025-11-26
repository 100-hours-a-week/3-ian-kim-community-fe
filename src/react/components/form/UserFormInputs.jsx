import styles from '@/components/form/UserFormInputs.module.css'

function UserFormInputs({ children }) {
  return (
    <>
      <div className={styles['user-form-inputs']}>{children}</div>
    </>
  )
}

export default UserFormInputs
