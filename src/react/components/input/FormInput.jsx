import styles from '@/components/input/FormInput.module.css'

function FormInput({ type, id, value, placeholder, onChangeInput, ...attrs }) {
  return (
    <>
      <input type={type} id={id} value={value} className={styles['form-input']} placeholder={placeholder} onChange={onChangeInput} autoComplete='off' {...attrs} />
    </>
  )
}

export default FormInput
