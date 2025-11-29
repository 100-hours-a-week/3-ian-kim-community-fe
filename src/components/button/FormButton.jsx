import styles from '@/components/button/FormButton.module.css'

function FormButton({ text, className, onButtonClick, isActive }) {
  return (
    <>
      <button type='button' className={`${className} ${styles['form-button']}`} onClick={onButtonClick} disabled={!isActive}>
        {text}
      </button>
    </>
  )
}

export default FormButton
