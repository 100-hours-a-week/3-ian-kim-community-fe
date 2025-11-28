import PasswordUpdateRequest from '@/api/dto/request/PasswordUpdateRequest.js'
import { resetPassword } from '@/api/user.js'
import Form from '@/components/form/Form.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import useInput from '@/hooks/useInput.jsx'
import { ROUTES } from '@/routes/routes.js'
import { checkInputsValid, Validators } from '@/utils/validation.js'
import { useNavigate } from 'react-router'

function PasswordEditPage() {
  const navigate = useNavigate()

  const passwordInput = useInput('', Validators.password)
  const passwordConfirmInput = useInput('', Validators.passwordConfirm, passwordInput.value)

  const inputsValid = checkInputsValid([passwordInput, passwordConfirmInput])

  const handleEditClick = async () => {
    try {
      await resetPassword(new PasswordUpdateRequest({ password: passwordInput.value }))
      alert('비밀번호가 수정되었습니다.')
      navigate(ROUTES.HOME)
    } catch (err) {}
  }

  return (
    <>
      <Form headerText={'비밀번호수정'} buttonText={'수정하기'} onButtonClick={handleEditClick} inputs={[passwordInput, passwordConfirmInput]} inputsValid={inputsValid}>
        <FormInputGroup labelText={'비밀번호 *'} id={'password'}>
          <FormInput type={'password'} id={'password'} placeholder={'비밀번호를 입력하세요.'} value={passwordInput.value} onChangeInput={passwordInput.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'비밀번호 확인 *'} id={'password-confirm'}>
          <FormInput type={'password'} id={'password-confirm'} placeholder={'비밀번호를 한번 더 입력하세요.'} value={passwordConfirmInput.value} onChangeInput={passwordConfirmInput.onChange} />
        </FormInputGroup>
      </Form>
    </>
  )
}

export default PasswordEditPage
