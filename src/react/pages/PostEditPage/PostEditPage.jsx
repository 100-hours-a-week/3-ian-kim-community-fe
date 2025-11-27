import PostForm from '@/components/form/PostForm.jsx'
import useImageUpload from '@/hooks/useImageUpload.jsx'
import useInput from '@/hooks/useInput.jsx'
import { Validators } from '@/utils/validation.js'

function PostEditPage() {
  const titleInput = useInput('', Validators.postTitle)
  const contentInput = useInput('', Validators.postContent)
  const imageInput = useImageUpload(null)

  const handleEditClick = () => {
    // TODO: 게시글 수정 API 연결
  }

  return (
    <>
      <PostForm inputs={[titleInput, contentInput, imageInput]} headerText={'질문 수정'} buttonText={'수정하기'} onButtonClick={handleEditClick} />
    </>
  )
}

export default PostEditPage
