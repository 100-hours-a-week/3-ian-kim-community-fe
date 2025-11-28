import { useRef, useState } from 'react'

const useImageUpload = (initImageSrc) => {
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [imgSrc, setimgSrc] = useState(initImageSrc)
  const [imgName, setImgName] = useState('')

  const handleImageClick = () => {
    inputRef.current.click()
  }

  const handleImageChange = (e) => {
    const uploadedImage = e.target.files[0]

    if (!uploadedImage) {
      setImage(null)
      setimgSrc(initImageSrc)
      setImgName('')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImage(uploadedImage)
      setimgSrc(reader.result)
      setImgName(uploadedImage.name)
    }

    reader.readAsDataURL(uploadedImage)
  }

  return { inputRef, image, imgSrc, imgName, handleImageClick, handleImageChange }
}

export default useImageUpload
