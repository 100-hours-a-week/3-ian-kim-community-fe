import { useEffect, useRef, useState } from 'react'

const useImageUpload = (initImageSrc, initImageName) => {
  const inputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [imgSrc, setImgSrc] = useState(initImageSrc)
  const [imgName, setImgName] = useState(initImageName)

  useEffect(() => {
    if (initImageSrc) {
      setImgSrc(initImageSrc)
    }
  }, [initImageSrc])

  const handleImageClick = () => {
    inputRef.current.click()
  }

  const handleImageChange = (e) => {
    const uploadedImage = e.target.files[0]

    if (!uploadedImage) {
      setImage(null)
      setImgSrc(initImageSrc)
      setImgName(initImageName)
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImage(uploadedImage)
      setImgSrc(reader.result)
      setImgName(uploadedImage.name)
    }

    reader.readAsDataURL(uploadedImage)
  }

  return { inputRef, image, imgSrc, imgName, handleImageClick, handleImageChange }
}

export default useImageUpload
