import styles from '@/components/header/HeaderProfile.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/routes/routes.js'
import Button from '@/components/button/Button.jsx'
import ProfileIcon from '@/components/profile/ProfileIcon.jsx'
import { logoutUser } from '@/api/user.js'
import { useAuthStore } from '@/stores/authStore.js'
import { getImage } from '@/api/image.js'

function HeaderProfile() {
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const user = useAuthStore((state) => state.user)
  const resetUser = useAuthStore((state) => state.resetUser)
  const profileImageSrc = useAuthStore((state) => state.profileImageSrc)
  const setProfileImageSrc = useAuthStore((state) => state.setProfileImageSrc)

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsDropdownOpen(false)
    }

    const getProfileImage = async () => {
      const response = await getImage(user.profileImageName)
      setProfileImageSrc(response.imageSrc)
    }

    if (user.profileImageName) {
      getProfileImage()
    }

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
    } catch (err) {}
  }

  return (
    <div className={styles['header-profile']}>
      <ProfileIcon image={profileImageSrc} size={'2rem'} cursor={'pointer'} onIconClick={handleIconClick} />

      <div className={`${styles['profile-dropdown']} ${isDropdownOpen || 'hidden'}`}>
        <Button text={'회원정보수정'} className={styles['profile-dropdown-btn']} onButtonClick={handleAccountEditClick} />
        <Button text={'비밀번호수정'} className={styles['profile-dropdown-btn']} onButtonClick={handlePasswordEditClick} />
        <Button text={'로그아웃'} className={styles['profile-dropdown-btn']} onButtonClick={handleLogoutClick} />
      </div>
    </div>
  )
}

export default HeaderProfile
