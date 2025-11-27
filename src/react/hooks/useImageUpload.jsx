import { useRef, useState } from 'react'

const useImageUpload = (initImage) => {
  const inputRef = useRef(null)
  const [imgSrc, setimgSrc] = useState(initImage)
  const [imgName, setImgName] = useState('')

  const handleImageClick = () => {
    inputRef.current.click()
  }

  const handleImageChange = (e) => {
    const image = e.target.files[0]

    if (!image) {
      setimgSrc(initImage)
      setImgName('')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setimgSrc(reader.result)
      setImgName(image.name)
    }

    reader.readAsDataURL(image)
  }

  return { inputRef, imgSrc, imgName, handleImageClick, handleImageChange }
}

export default useImageUpload
