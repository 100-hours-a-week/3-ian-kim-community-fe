import HeaderLogo from '@/components/header/HeaderLogo.jsx'
import { Outlet } from 'react-router'
import styles from '@/layout/AuthLayout/AuthLayout.module.css'

function AuthLayout() {
  return (
    <>
      <div className={styles['auth-layout']}>
        <HeaderLogo size='2.5rem' />
        <div className={styles['auth-container']}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default AuthLayout
