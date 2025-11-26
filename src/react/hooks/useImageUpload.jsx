import { useRef, useState } from 'react'

const useImageUpload = (initImage) => {
  const inputRef = useRef(null)
  const [imgSrc, setimgSrc] = useState(initImage)

  const handleImageClick = () => {
    inputRef.current.click()
  }

  const handleImageChange = (e) => {
    const image = e.target.files[0]

    if (!image) {
      setimgSrc(initImage)
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setimgSrc(reader.result)
    }

    reader.readAsDataURL(image)
  }

  return { inputRef, imgSrc, handleImageClick, handleImageChange }
}

export default useImageUpload
