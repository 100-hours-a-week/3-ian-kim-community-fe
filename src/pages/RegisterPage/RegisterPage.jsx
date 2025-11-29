import RegisterRequest from '@/api/dto/request/RegisterRequest.js'
import { getErrorMessage } from '@/api/error.js'
import { registerUser } from '@/api/user.js'
import AuthFormFooter from '@/components/footer/AuthFormFooter.jsx'
import Form from '@/components/form/Form.jsx'
import FormImagePreview from '@/components/image/FormImagePreview.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import useImageUpload from '@/hooks/useImageUpload.jsx'
import useInput from '@/hooks/useInput.jsx'
import { ROUTES } from '@/routes/routes.js'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useNavigate } from 'react-router'

function RegisterPage() {
  const navigate = useNavigate()

  const emailInput = useInput('', Validators.email)
  const passwordInput = useInput('', Validators.password)
  const passwordConfirmInput = useInput('', Validators.passwordConfirm, passwordInput.value)
  const nicknameInput = useInput('', Validators.nickname)
  const imageInput = useImageUpload(null)

  const inputsValid = checkInputsValid([emailInput, passwordInput, passwordConfirmInput, nicknameInput])

  const handleLinkClick = () => {
    navigate(ROUTES.LOGIN)
  }

  const handleRegisterClick = async () => {
    try {
      await registerUser(
        new RegisterRequest({
          email: emailInput.value,
          password: passwordInput.value,
          nickname: nicknameInput.value,
          profileImage: imageInput.image,
        }),
      )

      alert('회원가입에 성공했습니다.')
      navigate(ROUTES.LOGIN)
    } catch (errCode) {
      alert(getErrorMessage(errCode))
    }
  }

  return (
    <>
      <Form headerText={'회원가입'} buttonText={'회원가입'} onButtonClick={handleRegisterClick} inputs={[emailInput, passwordInput, passwordConfirmInput, nicknameInput]} inputsValid={inputsValid}>
        <FormInputGroup labelText={'프로필 이미지'} id={'profile-image'}>
          <FormImagePreview imgSrc={imageInput.imgSrc} onImageClick={imageInput.handleImageClick} imgName={imageInput.imgName} />
          <FormInput ref={imageInput.inputRef} type={'file'} id={'profile-image'} accept='image/*' className={'hidden'} onChangeInput={imageInput.handleImageChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'이메일 *'} id={'email'}>
          <FormInput type={'text'} id={'email'} placeholder={'이메일을 입력하세요.'} value={emailInput.value} onChangeInput={emailInput.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'비밀번호 *'} id={'password'}>
          <FormInput type={'password'} id={'password'} placeholder={'비밀번호를 입력하세요.'} value={passwordInput.value} onChangeInput={passwordInput.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'비밀번호 확인 *'} id={'password-confirm'}>
          <FormInput type={'password'} id={'password-confirm'} placeholder={'비밀번호를 한번 더 입력하세요.'} value={passwordConfirmInput.value} onChangeInput={passwordConfirmInput.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'닉네임 *'} id={'nickname'}>
          <FormInput type={'text'} id={'nickname'} placeholder={'닉네임을 입력하세요.'} value={nicknameInput.value} onChangeInput={nicknameInput.onChange} />
        </FormInputGroup>
      </Form>

      <AuthFormFooter text={'이미 계정이 있으신가요?'} linkText={'로그인하러 가기'} onLinkClick={handleLinkClick} />
    </>
  )
}

export default RegisterPage
