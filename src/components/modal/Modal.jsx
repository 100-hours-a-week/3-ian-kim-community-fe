import Button from '@/components/button/Button.jsx'
import styles from '@/components/modal/Modal.module.css'

function Modal({ title, content, modal }) {
  return (
    <>
      <div className={`${styles.modal} ${modal.isOpen || 'hidden'}`}>
        <div className={styles['modal-content']}>
          <h3>{title}</h3>
          <p>{content}</p>

          <div className={styles['modal-btns']}>
            <Button text={'취소'} className={`${styles['cancel-btn']} ${styles['modal-btn']} border-bold`} onButtonClick={modal.onCancel} />
            <Button text={'확인'} className={`${styles['accept-btn']} ${styles['modal-btn']}`} onButtonClick={modal.onAccept} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
