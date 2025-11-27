import styles from '@/components/button/ActionButtons.module.css'
import Button from '@/components/button/Button.jsx'

function ActionButtons({ onEditClick, onDeleteClick, padding }) {
  return (
    <>
      <div className={styles['action-buttons']}>
        <Button text={'수정'} className={`${styles['edit-btn']} border`} onButtonClick={onEditClick} style={{ padding }} />
        <Button text={'삭제'} className={`${styles['delete-btn']} border`} onButtonClick={onDeleteClick} style={{ padding }} />
      </div>
    </>
  )
}

export default ActionButtons
