import HeaderLogo from '@/components/header/HeaderLogo.jsx'
import styles from '@/components/header/Header.module.css'
import HeaderProfile from '@/components/header/HeaderProfile.jsx'
import Button from '@/components/button/Button.jsx'

function Header() {
  const isLoggedIn = false

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header-content']}>
          <HeaderLogo size='1.5rem' />

          {isLoggedIn ? <HeaderProfile /> : <Guest />}
        </div>
      </header>
    </>
  )
}

function Guest() {
  return (
    <div className={styles['header-guest']}>
      <Button text={'로그인'} className={`${styles['header-guest-btn']} ${styles['login-btn']}`} />
      <Button text={'회원가입'} className={`${styles['header-guest-btn']} ${styles['register-btn']}`} />
    </div>
  )
}

export default Header
