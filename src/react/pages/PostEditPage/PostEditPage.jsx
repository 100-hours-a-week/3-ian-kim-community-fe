import PostForm from '@/components/form/PostForm.jsx'
import useImageUpload from '@/hooks/useImageUpload.jsx'
import useInput from '@/hooks/useInput.jsx'
import { ROUTES } from '@/routes/routes.js'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

function PostEditPage() {
  const { post } = useLocation().state
  const navigate = useNavigate()

  useEffect(() => {
    if (!post) {
      alert('게시글 정보가 없습니다. 다시 시도해주세요.')
      navigate(ROUTES.HOME)
    }
  }, [post, navigate])

  if (!post) {
    return
  }

  const titleInput = useInput(post.title, Validators.postTitle)
  const contentInput = useInput(post.content, Validators.postContent)
  const imageInput = useImageUpload(null)

  const isTitleChanged = titleInput.value !== post.title
  const isContentChanged = contentInput.value !== post.content
  const isImageChanged = false

  const inputsValid = checkInputsValid([titleInput, contentInput]) && (isTitleChanged || isContentChanged || isImageChanged)

  const handleEditClick = () => {
    // TODO: 게시글 수정 API 연결
    alert('수정이 완료되었습니다.')
    navigate(ROUTES.POST(post.postId))
  }

  return (
    <>
      <PostForm inputs={[titleInput, contentInput, imageInput]} headerText={'질문 수정'} buttonText={'수정하기'} onButtonClick={handleEditClick} inputsValid={inputsValid} />
    </>
  )
}

export default PostEditPage
