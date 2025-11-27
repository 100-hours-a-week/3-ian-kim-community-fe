import FormButton from '@/components/button/FormButton.jsx'
import styles from '@/components/form/Form.module.css'
import FormInputs from '@/components/form/FormInputs.jsx'
import HelperText from '@/components/text/HelperText.jsx'
import { getValidationErrorMessage } from '@/utils/validation.js'

function Form({ headerText, buttonText, onButtonClick, children, inputs, inputsValid }) {
  return (
    <>
      <h1>{headerText}</h1>

      <form className={styles['form']}>
        <FormInputs>{children}</FormInputs>

        <HelperText text={getValidationErrorMessage(inputs)} />

        <FormButton text={buttonText} onButtonClick={onButtonClick} isActive={inputsValid} />
      </form>
    </>
  )
}

export default Form
