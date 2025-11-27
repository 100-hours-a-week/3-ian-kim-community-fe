import styles from '@/components/header/HeaderProfile.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes/routes.js'
import Button from '@/components/button/Button.jsx'
import ProfileIcon from '@/components/profile/ProfileIcon.jsx'

function HeaderProfile() {
  const profileImage = null
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsDropdownOpen(false)
    }

    window.addEventListener('click', handleOutsideClick)

    return () => window.removeEventListener('click', handleOutsideClick)
  }, [])

  const handleIconClick = (e) => {
    e.stopPropagation()
    setIsDropdownOpen((prev) => !prev)
  }

  const handleAccountEditBtnClick = () => {
    navigate(ROUTES.MY_EDIT_ACCOUNT)
  }

  const handlePasswordEditBtnClick = () => {
    navigate(ROUTES.MY_EDIT_PASSWORD)
  }

  const handleLogoutBtnClick = () => {
    // TODO: 로그아웃 API 연결
  }

  return (
    <div className={styles['header-profile']}>
      <ProfileIcon image={profileImage} size={'2rem'} cursor={'pointer'} onIconClick={handleIconClick} />

      <div className={`${styles['profile-dropdown']} ${isDropdownOpen || 'hidden'}`}>
        <Button text={'회원정보수정'} className={styles['profile-dropdown-btn']} onButtonClick={handleAccountEditBtnClick} />
        <Button text={'비밀번호수정'} className={styles['profile-dropdown-btn']} onButtonClick={handlePasswordEditBtnClick} />
        <Button text={'로그아웃'} className={styles['profile-dropdown-btn']} onButtonClick={handleLogoutBtnClick} />
      </div>
    </div>
  )
}

export default HeaderProfile
