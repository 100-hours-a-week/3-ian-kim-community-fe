import styles from '@/components/input/FormInputGroup.module.css'

function FormInputGroup({ labelText, id, children }) {
  return (
    <>
      <div className={styles['form-input-group']}>
        <label htmlFor={id} className={styles['form-input-label']}>
          {labelText}
        </label>

        {children}
      </div>
    </>
  )
}

export default FormInputGroup
