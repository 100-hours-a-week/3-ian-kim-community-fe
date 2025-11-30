import PostCreateRequest from '@/api/dto/request/PostCreateRequest.js'
import { getErrorMessage } from '@/api/error.js'
import { createPost } from '@/api/post.js'
import PostForm from '@/components/form/PostForm.jsx'
import useImageUpload from '@/hooks/useImageUpload.jsx'
import useInput from '@/hooks/useInput.jsx'
import { ROUTES } from '@/routes/routes.js'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useNavigate } from 'react-router'

function PostCreatePage() {
  const navigate = useNavigate()

  const titleInput = useInput('', Validators.postTitle)
  const contentInput = useInput('', Validators.postContent)
  const imageInput = useImageUpload(null)

  const inputsValid = checkInputsValid([titleInput, contentInput])

  const handleCreateClick = async () => {
    try {
      await createPost(new PostCreateRequest({ title: titleInput.value, content: contentInput.value, image: imageInput.image }))
      alert('질문 작성이 완료되었습니다.')
      navigate(ROUTES.POST_LIST)
    } catch (errCode) {
      alert(getErrorMessage(errCode))
    }
  }

  return (
    <>
      <PostForm inputs={[titleInput, contentInput, imageInput]} headerText={'질문 작성'} buttonText={'작성하기'} onButtonClick={handleCreateClick} inputsValid={inputsValid} />
    </>
  )
}

export default PostCreatePage
