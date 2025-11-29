import styles from '@/components/image/Thumbnail.module.css'

function Thumbnail({ imgSrc, size }) {
  return (
    <>
      <img src={imgSrc} className={`${styles.thumbnail} ${imgSrc || 'hidden'}`} style={{ width: size, height: size }} />
    </>
  )
}

export default Thumbnail
