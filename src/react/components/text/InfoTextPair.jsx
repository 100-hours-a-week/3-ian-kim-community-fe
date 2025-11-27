import styles from '@/components/text/InfoTextPair.module.css'

function InfoTextPair({ name, value }) {
  return (
    <>
      <div className={styles['info-text-pair']}>
        <span className={styles['name']}>{name}</span>
        <span className={styles['value']}>{value}</span>
      </div>
    </>
  )
}

export default InfoTextPair
