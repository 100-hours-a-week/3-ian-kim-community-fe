import { COMMENT_MODE } from '@/common/constants/mode.js'
import FormButton from '@/components/button/FormButton.jsx'
import styles from '@/components/form/CommentForm.module.css'
import Textarea from '@/components/textarea/Textarea.jsx'

function CommentForm({ mode, initContent, inputs, onButtonClick }) {
  const [contentInput] = inputs

  const buttonText = mode === COMMENT_MODE.CREATE ? '답변 작성하기' : '답변 수정하기'
  const isActive = mode === COMMENT_MODE.CREATE ? contentInput.value : contentInput.value && initContent && contentInput.value !== initContent

  return (
    <>
      <div className={styles['create-box']}>
        <Textarea value={contentInput.value} onChangeInput={contentInput.onChange} height={'6.25rem'} placeholder={'답변을 남겨주세요!'} />

        <div className={styles['create-btn-wrapper']}>
          <FormButton text={buttonText} onButtonClick={onButtonClick} isActive={isActive} className={styles['create-btn']} />
        </div>
      </div>
    </>
  )
}

export default CommentForm
