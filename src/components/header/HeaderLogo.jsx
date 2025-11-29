import styles from '@/components/header/HeaderLogo.module.css'
import { ROUTES } from '@/routes/routes.js'
import { useNavigate } from 'react-router'

function HeaderLogo({ size }) {
  const navigate = useNavigate()

  const handleClickLogo = () => {
    navigate(ROUTES.POST_LIST)
  }

  return (
    <>
      <h1 className={`${styles['header-logo']}`} style={{ fontSize: size }} onClick={handleClickLogo}>
        DevTalk
      </h1>
    </>
  )
}

export default HeaderLogo
