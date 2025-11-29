function Button({ text, className, onButtonClick, style }) {
  return (
    <>
      <button type='button' className={className} onClick={onButtonClick} style={style}>
        {text}
      </button>
    </>
  )
}

export default Button
