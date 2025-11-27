import PostForm from '@/components/form/PostForm.jsx'
import useImageUpload from '@/hooks/useImageUpload.jsx'
import useInput from '@/hooks/useInput.jsx'
import { checkInputsValid, Validators } from '@/utils/validation.js'

function PostCreatePage() {
  const titleInput = useInput('', Validators.postTitle)
  const contentInput = useInput('', Validators.postContent)
  const imageInput = useImageUpload(null)

  const inputsValid = checkInputsValid([titleInput, contentInput])

  const handleCreateClick = () => {
    // TODO: 게시글 생성 API 연결
  }

  return (
    <>
      <PostForm inputs={[titleInput, contentInput, imageInput]} headerText={'질문 작성'} buttonText={'작성하기'} onButtonClick={handleCreateClick} inputsValid={inputsValid} />
    </>
  )
}

export default PostCreatePage
