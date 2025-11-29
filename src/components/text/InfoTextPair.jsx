import styles from '@/components/text/InfoTextPair.module.css'

function InfoTextPair({ name, value, fontSize }) {
  return (
    <>
      <div className={styles['info-text-pair']} style={{ fontSize }}>
        <span className={styles['name']}>{name}</span>
        <span className={styles['value']}>{value}</span>
      </div>
    </>
  )
}

export default InfoTextPair
