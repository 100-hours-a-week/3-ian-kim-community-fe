import styles from '@/components/image/FormProfileImage.module.css'

function FormProfileImage({ onImageClick, children, imgSrc }) {
  return (
    <>
      <div className={styles['image-preview']} onClick={onImageClick}>
        <img src={imgSrc} className={`${styles['image']} ${imgSrc || 'hidden'}`} />
        {children}
      </div>
    </>
  )
}

export default FormProfileImage
