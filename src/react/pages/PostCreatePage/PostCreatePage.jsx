import FormButton from '@/components/button/FormButton.jsx'
import PostForm from '@/components/form/PostForm.jsx'
import FormInputs from '@/components/form/FormInputs.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import HelperText from '@/components/text/HelperText.jsx'
import Textarea from '@/components/textarea/Textarea.jsx'
import useInput from '@/hooks/useInput.jsx'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import styles from '@/components/form/PostForm.module.css'

function PostCreatePage() {
  const title = useInput('', Validators.postTitle)
  const content = useInput('', Validators.postContent)

  const inputsValid = checkInputsValid(title, content)

  const handleCreateClick = () => {
    // TODO: 게시글 생성 API 연결
  }

  return (
    <>
      <h1>질문 작성</h1>

      <PostForm>
        <FormInputs>
          <FormInputGroup labelText={'제목 *'} id={'title'}>
            <FormInput type={'text'} id={'title'} placeholder={'제목을 입력해주세요.'} onChangeInput={title.onChange} />
          </FormInputGroup>

          <FormInputGroup labelText={'내용 *'} id={'content'}>
            <Textarea id={'content'} placeholder={'내용을 입력해주세요.'} onChangeInput={content.onChange} className={styles['post-content']} />
          </FormInputGroup>

          <FormInputGroup labelText={'이미지'} id={'image'}>
            <FormInput type={'file'} id={'image'} accept='image/*' className={styles['post-image']} />
          </FormInputGroup>
        </FormInputs>

        <HelperText text={title.error || content.error} />

        <FormButton text={'작성하기'} onButtonClick={handleCreateClick} isActive={inputsValid} />
      </PostForm>
    </>
  )
}

export default PostCreatePage
