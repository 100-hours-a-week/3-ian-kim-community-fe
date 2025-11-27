import ProfileIcon from '@/components/profile/ProfileIcon.jsx'
import styles from '@/components/profile/ProfilePair.module.css'

function ProfilePair({ nickname, nicknameSize, iconSize }) {
  return (
    <>
      <div className={styles['profile-pair']}>
        <ProfileIcon size={iconSize} />
        <span className={styles['nickname']} style={{ fontSize: nicknameSize }}>
          {nickname}
        </span>
      </div>
    </>
  )
}

export default ProfilePair
