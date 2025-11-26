function Button({ text, className, onButtonClick }) {
  return (
    <>
      <button type='button' className={className} onClick={onButtonClick}>
        {text}
      </button>
    </>
  )
}

export default Button
