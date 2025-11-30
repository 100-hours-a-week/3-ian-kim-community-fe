import styles from '@/components/footer/AuthFormFooter.module.css'

function AuthFormFooter({ text, linkText, onLinkClick }) {
  return (
    <>
      <div className={styles['form-footer']}>
        <span>{text}</span>

        <span className={styles['form-link']} onClick={onLinkClick}>
          {linkText}
        </span>
      </div>
    </>
  )
}

export default AuthFormFooter
