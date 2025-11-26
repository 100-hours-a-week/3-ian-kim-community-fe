import HeaderLogo from '@/components/header/HeaderLogo.jsx'
import styles from '@/components/header/Header.module.css'
import HeaderProfile from '@/components/header/HeaderProfile.jsx'

function Header() {
  const isLoggedIn = true

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
      <button className={`${styles['header-guest-btn']} ${styles['login-btn']}`}>로그인</button>
      <button className={`${styles['header-guest-btn']} ${styles['register-btn']}`}>회원가입</button>
    </div>
  )
}

export default Header
