function Textarea({ id, className, text, placeholder, onChangeInput }) {
  return (
    <>
      <textarea id={id} className={className} placeholder={placeholder} onChange={onChangeInput}>
        {text}
      </textarea>
    </>
  )
}

export default Textarea
