import FormButton from '@/components/button/FormButton.jsx'
import AuthFormFooter from '@/components/footer/AuthFormFooter.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import HelperText from '@/components/text/HelperText.jsx'
import useInput from '@/hooks/useInput.jsx'
import styles from '@/pages/LoginPage/LoginPage.module.css'
import { ROUTES } from '@/routes/routes.js'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useNavigate } from 'react-router'

function LoginPage() {
  const navigate = useNavigate()

  const email = useInput('', Validators.email)
  const password = useInput('', Validators.password)

  const inputsValid = checkInputsValid(email, password)

  const handleLinkClick = () => {
    navigate(ROUTES.REGISTER)
  }

  const handleButtonClick = () => {
    // TODO: 로그인 API 연결
  }

  return (
    <>
      <h1>로그인</h1>

      <form className={styles['user-form']}>
        <div className={styles['user-form-inputs']}>
          <FormInput labelText={'이메일'} type={'text'} id={'email'} placeholder={'이메일을 입력하세요.'} value={email.value} onChangeInput={email.onChange} />
          <FormInput labelText={'비밀번호'} type={'password'} id={'password'} placeholder={'비밀번호를 입력하세요.'} value={password.value} onChangeInput={password.onChange} />
        </div>

        <HelperText text={email.error || password.error} />

        <FormButton text={'로그인'} onButtonClick={handleButtonClick} isActive={inputsValid} />
      </form>

      <AuthFormFooter text={'아직 계정이 없으신가요?'} linkText={'회원가입하러 가기'} onLinkClick={handleLinkClick} />
    </>
  )
}

export default LoginPage
