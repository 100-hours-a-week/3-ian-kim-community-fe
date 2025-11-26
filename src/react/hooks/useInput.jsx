import { useState } from 'react'

const useInput = (initValue, validator) => {
  const [value, setValue] = useState(initValue)
  const [error, setError] = useState('')

  const onChange = (e) => {
    const val = e.target.value

    if (validator) {
      setError(validator(val))
    }

    setValue(val)
  }

  const reset = () => {
    setValue(initValue)
    setError('')
  }

  return { value, error, onChange, reset }
}

export default useInput
