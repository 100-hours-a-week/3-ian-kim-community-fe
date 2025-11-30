import PostUpdateRequest from '@/api/dto/request/PostUpdateRequest.js'
import { getErrorMessage } from '@/api/error.js'
import { updatePost } from '@/api/post.js'
import PostForm from '@/components/form/PostForm.jsx'
import useImageUpload from '@/hooks/useImageUpload.jsx'
import useInput from '@/hooks/useInput.jsx'
import { ROUTES } from '@/routes/routes.js'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

function PostEditPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (!state) {
      alert('질문 정보가 없습니다. 다시 시도해주세요.')
      navigate(ROUTES.HOME)
      return
    }
  }, [state])

  if (!state) {
    return
  }

  const { post, thumbnailSrc } = state

  const titleInput = useInput(post.title, Validators.postTitle)
  const contentInput = useInput(post.content, Validators.postContent)
  const imageInput = useImageUpload(thumbnailSrc, post.originImageName)

  const isTitleChanged = titleInput.value !== post.title
  const isContentChanged = contentInput.value !== post.content
  const isImageChanged = imageInput.imgSrc !== thumbnailSrc

  const inputsValid = checkInputsValid([titleInput, contentInput]) && (isTitleChanged || isContentChanged || isImageChanged)

  const handleEditClick = async () => {
    const request = {
      ...(isTitleChanged && { title: titleInput.value }),
      ...(isContentChanged && { content: contentInput.value }),
      ...(isImageChanged && { image: imageInput.image }),
    }

    try {
      await updatePost(post.postId, new PostUpdateRequest(request))
      alert('수정이 완료되었습니다.')
      navigate(ROUTES.POST(post.postId))
    } catch (errCode) {
      alert(getErrorMessage(errCode))
    }
  }

  return (
    <>
      <PostForm inputs={[titleInput, contentInput, imageInput]} headerText={'질문 수정'} buttonText={'수정하기'} onButtonClick={handleEditClick} inputsValid={inputsValid} />
    </>
  )
}

export default PostEditPage
