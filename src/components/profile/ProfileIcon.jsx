import styles from '@/components/profile/ProfileIcon.module.css'
import basicProfile from '@/assets/images/basicProfile.png'

function ProfileIcon({ image, size, onIconClick, cursor }) {
  return (
    <>
      <img src={image || basicProfile} alt='프로필' className={styles['profile-icon']} style={{ width: size, height: size, cursor }} onClick={onIconClick} />
    </>
  )
}

export default ProfileIcon
