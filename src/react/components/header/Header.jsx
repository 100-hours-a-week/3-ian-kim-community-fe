import HeaderLogo from '@/components/header/HeaderLogo.jsx'
import styles from '@/components/header/Header.module.css'
import HeaderProfile from '@/components/header/HeaderProfile.jsx'
import Button from '@/components/button/Button.jsx'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes/routes.js'
import { useAuthStore } from '@/stores/authStore.js'

function Header() {
  const user = useAuthStore((store) => store.user)

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header-content']}>
          <HeaderLogo size='1.5rem' />

          {user ? <HeaderProfile profileImageName={user.profileImageName} /> : <Guest />}
        </div>
      </header>
    </>
  )
}

function Guest() {
  const navigate = useNavigate()

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN)
  }

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER)
  }

  return (
    <div className={styles['header-guest']}>
      <Button text={'로그인'} className={`${styles['header-guest-btn']} ${styles['login-btn']}`} onButtonClick={handleLoginClick} />
      <Button text={'회원가입'} className={`${styles['header-guest-btn']} ${styles['register-btn']}`} onButtonClick={handleRegisterClick} />
    </div>
  )
}

export default Header
