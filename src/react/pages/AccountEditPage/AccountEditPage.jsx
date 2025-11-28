import FormImagePreview from '@/components/image/FormImagePreview.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import useImageUpload from '@/hooks/useImageUpload.jsx'
import useInput from '@/hooks/useInput.jsx'
import styles from '@/pages/AccountEditPage/AccountEditPage.module.css'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import Modal from '@/components/modal/Modal.jsx'
import useModal from '@/hooks/useModal.jsx'
import Button from '@/components/button/Button.jsx'
import Form from '@/components/form/Form.jsx'
import { getMyAccount } from '@/api/user.js'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/authStore.js'

function AccountEditPage() {
  const [user, setUser] = useState(null)
  const profileImageSrc = useAuthStore((state) => state.profileImageSrc)

  useEffect(() => {
    const getAccount = async () => {
      const response = await getMyAccount()
      setUser({ ...response })
    }

    getAccount()
  }, [])

  const nicknameInput = useInput(user?.nickname || '', Validators.nickname)
  const imageInput = useImageUpload(profileImageSrc)

  useEffect(() => {
    if (user) {
      nicknameInput.setValue(user.nickname)
    }
  }, [user])

  const inputsValid = (() => {
    return checkInputsValid([nicknameInput]) && nicknameInput.value !== user.nickname
  })()

  const handleEditClick = () => {
    // TODO: 회원정보수정 API 연결
  }

  const handleDeleteClick = () => {
    modal.openModal()
  }

  const handleAcceptClick = () => {
    // TODO: 회원탈퇴 API 연결
  }

  const modal = useModal(handleAcceptClick)

  if (!user) {
    return null
  }

  return (
    <>
      <Form headerText={'회원정보수정'} buttonText={'수정하기'} onButtonClick={handleEditClick} inputs={[nicknameInput]} inputsValid={inputsValid}>
        <FormInputGroup labelText={'프로필 이미지'} id={'profile-image'}>
          <FormImagePreview imgSrc={imageInput.imgSrc} onImageClick={imageInput.handleImageClick} imgName={imageInput.imgName} />
          <FormInput ref={imageInput.inputRef} type={'file'} id={'profile-image'} accept='image/*' className={'hidden'} onChangeInput={imageInput.handleImageChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'이메일'} id={'email'}>
          <p className={styles.email}>{user.email}</p>
        </FormInputGroup>

        <FormInputGroup labelText={'닉네임 *'} id={'nickname'}>
          <FormInput type={'text'} id={'nickname'} placeholder={'닉네임을 입력하세요.'} value={nicknameInput.value} onChangeInput={nicknameInput.onChange} />
        </FormInputGroup>
      </Form>

      <Button text={'회원탈퇴'} className={styles['delete-btn']} onButtonClick={handleDeleteClick} />

      <Modal title={'회원탈퇴 하시겠습니까?'} content={'작성한 질문과 답변은 삭제됩니다.'} modal={modal} />
    </>
  )
}

export default AccountEditPage
