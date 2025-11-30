import { getErrorMessage } from '@/api/error.js'
import { getImage } from '@/api/image.js'
import styles from '@/components/image/Thumbnail.module.css'
import { useEffect, useState } from 'react'

function Thumbnail({ imageName, size, onImageChange }) {
  const [imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const getThumbnail = async () => {
      try {
        const response = await getImage(imageName)
        setImageSrc(response.imageSrc)
        onImageChange(response.imageSrc)
      } catch (errCode) {
        alert(getErrorMessage(errCode))
      }
    }

    if (imageName) {
      getThumbnail()
    }
  }, [imageName])

  return (
    <>
      <img src={imageSrc} className={`${styles.thumbnail} ${imageSrc || 'hidden'}`} style={{ width: size, height: size }} />
    </>
  )
}

export default Thumbnail
