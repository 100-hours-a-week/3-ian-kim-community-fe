import Form from '@/components/form/Form.jsx'
import FormInput from '@/components/input/FormInput.jsx'
import FormInputGroup from '@/components/input/FormInputGroup.jsx'
import useInput from '@/hooks/useInput.jsx'
import { checkInputsValid, Validators } from '@/utils/validation.js'

function PasswordEditPage() {
  const password = useInput('', Validators.password)
  const passwordConfirm = useInput('', Validators.passwordConfirm, password.value)

  const inputsValid = checkInputsValid([password, passwordConfirm])

  const handleEditClick = () => {
    // TODO: 비밀번호수정 API 연결
  }

  return (
    <>
      <Form headerText={'비밀번호수정'} buttonText={'수정하기'} onButtonClick={handleEditClick} inputs={[password, passwordConfirm]} inputsValid={inputsValid}>
        <FormInputGroup labelText={'비밀번호 *'} id={'password'}>
          <FormInput type={'password'} id={'password'} placeholder={'비밀번호를 입력하세요.'} value={password.value} onChangeInput={password.onChange} />
        </FormInputGroup>

        <FormInputGroup labelText={'비밀번호 확인 *'} id={'password-confirm'}>
          <FormInput type={'password'} id={'password-confirm'} placeholder={'비밀번호를 한번 더 입력하세요.'} value={passwordConfirm.value} onChangeInput={passwordConfirm.onChange} />
        </FormInputGroup>
      </Form>
    </>
  )
}

export default PasswordEditPage
