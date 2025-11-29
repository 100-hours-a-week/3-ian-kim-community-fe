import styles from '@/components/textarea/Textarea.module.css'

function Textarea({ id, height, value, placeholder, onChangeInput }) {
  return (
    <>
      <textarea id={id} value={value} className={`${styles.textarea} border`} placeholder={placeholder} onChange={onChangeInput} style={{ height }} />
    </>
  )
}

export default Textarea
