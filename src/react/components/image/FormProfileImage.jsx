import styles from '@/components/image/FormProfileImage.module.css'

function FormProfileImage({ onImageClick, children, imgSrc }) {
  return (
    <>
      <div className={styles['image-preview']} onClick={onImageClick} style={{ backgroundColor: imgSrc ? 'white' : '#e8e8e8' }}>
        <img src={imgSrc} className={`${styles['image']} ${imgSrc || 'hidden'}`} />
        {children}
      </div>
    </>
  )
}

export default FormProfileImage
