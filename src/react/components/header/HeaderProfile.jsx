import styles from '@/components/header/HeaderProfile.module.css'
import basicProfile from '@/assets/images/basicProfile.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes/routes.js'

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
      <img src={profileImage || basicProfile} alt='프로필' className={styles['profile-icon']} onClick={handleIconClick} />

      <div className={`${styles['profile-dropdown']} ${isDropdownOpen || 'hidden'}`}>
        <button className={styles['profile-dropdown-btn']} onClick={handleAccountEditBtnClick}>
          회원정보수정
        </button>

        <button className={styles['profile-dropdown-btn']} onClick={handlePasswordEditBtnClick}>
          비밀번호수정
        </button>

        <button className={styles['profile-dropdown-btn']} onClick={handleLogoutBtnClick}>
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default HeaderProfile
