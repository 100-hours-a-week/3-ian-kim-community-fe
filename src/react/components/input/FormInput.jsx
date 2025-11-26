import styles from '@/components/input/FormInput.module.css'

function FormInput({ labelText, type, id, value, placeholder, onChangeInput }) {
  return (
    <>
      <div className={styles['form-input-group']}>
        <label htmlFor={id} className={styles['form-input-label']}>
          {labelText}
        </label>

        <input type={type} id={id} value={value} className={styles['form-input']} placeholder={placeholder} onChange={onChangeInput} autoComplete='off' />
      </div>
    </>
  )
}

export default FormInput
