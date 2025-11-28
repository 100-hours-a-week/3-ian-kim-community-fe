import AuthFormFooter from '@/components/footer/AuthFormFooter.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import useInput from '@/hooks/useInput.jsx'
import { ROUTES } from '@/routes/routes.js'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useNavigate } from 'react-router'
import Form from '@/components/form/Form.jsx'
import { loginUser } from '@/api/user.js'
import LoginRequest from '@/api/dto/request/LoginRequest.js'

function LoginPage() {
  const navigate = useNavigate()

  const emailInput = useInput('', Validators.email)
  const passwordInput = useInput('', Validators.password)

  const inputsValid = checkInputsValid([emailInput, passwordInput])

  const handleLinkClick = () => {
    navigate(ROUTES.REGISTER)
  }

  const handleButtonClick = async () => {
    try {
      const response = await loginUser(new LoginRequest({ email: emailInput.value, password: passwordInput.value }))
      // TODO: 로그인 상태 관리

      alert('로그인에 성공했습니다.')
      navigate(ROUTES.HOME)
    } catch (e) {}
  }

  return (
    <>
      <Form headerText={'로그인'} buttonText={'로그인'} onButtonClick={handleButtonClick} inputs={[emailInput, passwordInput]} inputsValid={inputsValid}>
        <FormInputGroup labelText={'이메일'} id={'email'}>
          <FormInput type={'text'} id={'email'} placeholder={'이메일을 입력하세요.'} value={emailInput.value} onChangeInput={emailInput.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'비밀번호'} id={'password'}>
          <FormInput type={'password'} id={'password'} placeholder={'비밀번호를 입력하세요.'} value={passwordInput.value} onChangeInput={passwordInput.onChange} />
        </FormInputGroup>
      </Form>

      <AuthFormFooter text={'아직 계정이 없으신가요?'} linkText={'회원가입하러 가기'} onLinkClick={handleLinkClick} />
    </>
  )
}

export default LoginPage
