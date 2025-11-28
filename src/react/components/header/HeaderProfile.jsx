import styles from '@/components/header/HeaderProfile.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes/routes.js'
import Button from '@/components/button/Button.jsx'
import ProfileIcon from '@/components/profile/ProfileIcon.jsx'
import { getImage } from '@/api/image.js'
import { logoutUser } from '@/api/user.js'
import { useAuthStore } from '@/stores/authStore.js'
import { ERROR_MESSAGE } from '@/api/error.js'

function HeaderProfile({ profileImageName }) {
  const navigate = useNavigate()

  const [profileImage, setProfileImage] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const resetUser = useAuthStore((store) => store.resetUser)

  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const response = await getImage(profileImageName)
        setProfileImage(response.imageSrc)
      } catch ({ code }) {}
    }

    const handleOutsideClick = () => {
      setIsDropdownOpen(false)
    }

    getProfileImage()

    window.addEventListener('click', handleOutsideClick)

    return () => window.removeEventListener('click', handleOutsideClick)
  }, [])

  const handleIconClick = (e) => {
    e.stopPropagation()
    setIsDropdownOpen((prev) => !prev)
  }

  const handleAccountEditClick = () => {
    navigate(ROUTES.MY_EDIT_ACCOUNT)
  }

  const handlePasswordEditClick = () => {
    navigate(ROUTES.MY_EDIT_PASSWORD)
  }

  const handleLogoutClick = async () => {
    try {
      await logoutUser()
      alert('로그아웃에 성공했습니다.')
      resetUser(null)
      navigate(ROUTES.LOGIN)
    } catch ({ code }) {
      alert(ERROR_MESSAGE[code])
    }
  }

  return (
    <div className={styles['header-profile']}>
      <ProfileIcon image={profileImage} size={'2rem'} cursor={'pointer'} onIconClick={handleIconClick} />

      <div className={`${styles['profile-dropdown']} ${isDropdownOpen || 'hidden'}`}>
        <Button text={'회원정보수정'} className={styles['profile-dropdown-btn']} onButtonClick={handleAccountEditClick} />
        <Button text={'비밀번호수정'} className={styles['profile-dropdown-btn']} onButtonClick={handlePasswordEditClick} />
        <Button text={'로그아웃'} className={styles['profile-dropdown-btn']} onButtonClick={handleLogoutClick} />
      </div>
    </div>
  )
}

export default HeaderProfile
