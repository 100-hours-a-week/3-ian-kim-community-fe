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

  const email = useInput('', Validators.email)
  const password = useInput('', Validators.password)
  const passwordConfirm = useInput('', Validators.passwordConfirm, password.value)
  const nickname = useInput('', Validators.nickname)

  const imgUpload = useImageUpload(null)

  const inputsValid = checkInputsValid([email, password, passwordConfirm, nickname])

  const handleLinkClick = () => {
    navigate(ROUTES.LOGIN)
  }

  const handleButtonClick = () => {
    // TODO: 회원가입 API 연결
  }

  return (
    <>
      <Form headerText={'회원가입'} buttonText={'회원가입'} onButtonClick={handleButtonClick} inputs={[email, password, passwordConfirm, nickname]} inputsValid={inputsValid}>
        <FormInputGroup labelText={'프로필 이미지'} id={'profile-image'}>
          <FormImagePreview imgSrc={imgUpload.imgSrc} onImageClick={imgUpload.handleImageClick} imgName={imgUpload.imgName} />
          <FormInput ref={imgUpload.inputRef} type={'file'} id={'profile-image'} accept='image/*' className={'hidden'} onChangeInput={imgUpload.handleImageChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'이메일 *'} id={'email'}>
          <FormInput type={'text'} id={'email'} placeholder={'이메일을 입력하세요.'} value={email.value} onChangeInput={email.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'비밀번호 *'} id={'password'}>
          <FormInput type={'password'} id={'password'} placeholder={'비밀번호를 입력하세요.'} value={password.value} onChangeInput={password.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'비밀번호 확인 *'} id={'password-confirm'}>
          <FormInput type={'password'} id={'password-confirm'} placeholder={'비밀번호를 한번 더 입력하세요.'} value={passwordConfirm.value} onChangeInput={passwordConfirm.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'닉네임 *'} id={'nickname'}>
          <FormInput type={'text'} id={'nickname'} placeholder={'닉네임을 입력하세요.'} value={nickname.value} onChangeInput={nickname.onChange} />
        </FormInputGroup>
      </Form>

      <AuthFormFooter text={'이미 계정이 있으신가요?'} linkText={'로그인하러 가기'} onLinkClick={handleLinkClick} />
    </>
  )
}

export default RegisterPage
