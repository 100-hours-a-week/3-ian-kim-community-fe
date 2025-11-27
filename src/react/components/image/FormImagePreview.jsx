import styles from '@/components/image/FormImagePreview.module.css'

function FormImagePreview({ onImageClick, imgSrc, imgName }) {
  return (
    <>
      <div className={styles['image-group']}>
        <div className={`${styles['image-preview']} border`} onClick={onImageClick}>
          <img src={imgSrc} className={`${styles['image']} ${imgSrc || 'hidden'}`} />
          <span className={styles['edit-text']}>+</span>
        </div>
        <span className={styles['image-name']}>{imgName}</span>
      </div>
    </>
  )
}

export default FormImagePreview
