function Thumbnail({ imgSrc, size }) {
  return (
    <>
      <img src={imgSrc} style={{ width: size, height: size, objectFit: 'cover' }} />
    </>
  )
}

export default Thumbnail
