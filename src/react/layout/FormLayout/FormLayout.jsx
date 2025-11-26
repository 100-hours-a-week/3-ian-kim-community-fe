import { Outlet } from 'react-router'
import styles from '@/layout/FormLayout/FormLayout.module.css'

function FormLayout() {
  return (
    <>
      <div className={styles['form-container']}>
        <Outlet />
      </div>
    </>
  )
}

export default FormLayout
