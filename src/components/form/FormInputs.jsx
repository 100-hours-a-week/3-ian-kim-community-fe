import styles from '@/components/form/FormInputs.module.css'

function FormInputs({ children }) {
  return (
    <>
      <div className={styles['form-inputs']}>{children}</div>
    </>
  )
}

export default FormInputs
