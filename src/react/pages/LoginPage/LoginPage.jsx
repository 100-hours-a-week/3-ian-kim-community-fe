import AuthFormFooter from '@/components/footer/AuthFormFooter.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import useInput from '@/hooks/useInput.jsx'
import { ROUTES } from '@/routes/routes.js'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useNavigate } from 'react-router'
import Form from '@/components/form/Form.jsx'

function LoginPage() {
  const navigate = useNavigate()

  const email = useInput('', Validators.email)
  const password = useInput('', Validators.password)

  const inputsValid = checkInputsValid([email, password])

  const handleLinkClick = () => {
    navigate(ROUTES.REGISTER)
  }

  const handleButtonClick = () => {
    // TODO: 로그인 API 연결
  }

  return (
    <>
      <Form headerText={'로그인'} buttonText={'로그인'} onButtonClick={handleButtonClick} inputs={[email, password]} inputsValid={inputsValid}>
        <FormInputGroup labelText={'이메일'} id={'email'}>
          <FormInput type={'text'} id={'email'} placeholder={'이메일을 입력하세요.'} value={email.value} onChangeInput={email.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'비밀번호'} id={'password'}>
          <FormInput type={'password'} id={'password'} placeholder={'비밀번호를 입력하세요.'} value={password.value} onChangeInput={password.onChange} />
        </FormInputGroup>
      </Form>

      <AuthFormFooter text={'아직 계정이 없으신가요?'} linkText={'회원가입하러 가기'} onLinkClick={handleLinkClick} />
    </>
  )
}

export default LoginPage
