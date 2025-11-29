import { getImage } from '@/api/image.js'
import ProfileIcon from '@/components/profile/ProfileIcon.jsx'
import styles from '@/components/profile/ProfilePair.module.css'
import { useEffect, useState } from 'react'

function ProfilePair({ imageName, nickname, nicknameSize, iconSize }) {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const response = await getImage(imageName)
        setImageSrc(response.imageSrc)
      } catch (err) {}
    }

    if (imageName) {
      getProfileImage()
    }
  }, [imageName])

  return (
    <>
      <div className={styles['profile-pair']}>
        <ProfileIcon image={imageSrc} size={iconSize} />
        <span className={styles['nickname']} style={{ fontSize: nicknameSize }}>
          {nickname}
        </span>
      </div>
    </>
  )
}

export default ProfilePair
