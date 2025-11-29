import { useState } from 'react'

const useInput = (initValue, validator, arg) => {
  const [value, setValue] = useState(initValue)
  const [error, setError] = useState('')

  const onChange = (e) => {
    const val = e.target.value

    if (validator) {
      setError(validator(val, arg))
    }

    setValue(val)
  }

  const reset = () => {
    setValue(initValue)
    setError('')
  }

  return { value, setValue, error, onChange, reset }
}

export default useInput
