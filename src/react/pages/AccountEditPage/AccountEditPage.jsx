import FormButton from '@/components/button/FormButton.jsx'
import UserForm from '@/components/form/UserForm.jsx'
import UserFormInputs from '@/components/form/UserFormInputs.jsx'
import FormProfileImage from '@/components/image/FormProfileImage.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import HelperText from '@/components/text/HelperText.jsx'
import useImageUpload from '@/hooks/useImageUpload.jsx'
import useInput from '@/hooks/useInput.jsx'
import styles from '@/pages/AccountEditPage/AccountEditPage.module.css'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useEffect } from 'react'
import basicProfile from '@/assets/images/basicProfile.png'
import Modal from '@/components/modal/Modal.jsx'
import useModal from '@/hooks/useModal.jsx'
import Button from '@/components/button/Button.jsx'

function AccountEditPage() {
  const user = {
    email: 'email@example.com',
    profileImage: basicProfile,
    nickname: 'testName',
  }

  const nickname = useInput(user.nickname, Validators.nickname)

  const imgUpload = useImageUpload(user.profileImage)

  const modal = useModal(handleAcceptClick)

  const inputsValid = (() => {
    return checkInputsValid(nickname) && nickname.value !== user.nickname
  })()

  useEffect(() => {
    // TODO: 회원정보조회 API 연결
  }, [])

  const handleEditClick = () => {
    // TODO: 회원정보수정 API 연결
  }

  const handleDeleteClick = () => {
    modal.openModal()
  }

  function handleAcceptClick() {
    // TODO: 회원탈퇴 API 연결
  }

  return (
    <>
      <h1>회원정보수정</h1>

      <UserForm>
        <UserFormInputs>
          <FormInputGroup labelText={'프로필 이미지'} id={'profile-image'}>
            <FormProfileImage imgSrc={imgUpload.imgSrc} onImageClick={imgUpload.handleImageClick}>
              <span className={styles['edit-text']}>변경</span>
            </FormProfileImage>

            <FormInput ref={imgUpload.inputRef} type={'file'} id={'profile-image'} accept='image/*' className={'hidden'} onChangeInput={imgUpload.handleImageChange} />
          </FormInputGroup>

          <FormInputGroup labelText={'이메일'} id={'email'}>
            <p className={styles.email}>{user.email}</p>
          </FormInputGroup>

          <FormInputGroup labelText={'닉네임 *'} id={'nickname'}>
            <FormInput type={'text'} id={'nickname'} placeholder={'닉네임을 입력하세요.'} value={nickname.value} onChangeInput={nickname.onChange} />
          </FormInputGroup>
        </UserFormInputs>

        <HelperText text={nickname.error} />

        <FormButton text={'수정하기'} onButtonClick={handleEditClick} isActive={inputsValid} />
      </UserForm>

      <Button text={'회원탈퇴'} className={styles['delete-btn']} onButtonClick={handleDeleteClick} />

      <Modal title={'회원탈퇴 하시겠습니까?'} content={'작성한 질문과 답변은 삭제됩니다.'} modal={modal} />
    </>
  )
}

export default AccountEditPage
