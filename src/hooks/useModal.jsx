import { useState } from 'react'

const useModal = (handleAcceptModal) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(() => true)
  }

  const onAccept = () => {
    handleAcceptModal()
  }

  const onCancel = () => {
    setIsOpen(() => false)
  }

  return { isOpen, openModal, onAccept, onCancel }
}

export default useModal
