import styles from '@/components/text/HelperText.module.css'

function HelperText({ text }) {
  return (
    <>
      <p className={`${styles['helper-text']} ${text || 'visibility-hidden'}`}>{text}</p>
    </>
  )
}

export default HelperText
