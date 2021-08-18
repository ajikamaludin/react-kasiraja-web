import { useState } from "react"

export function useModalState(init = false) {
  const [isOpen, setIsOpen] = useState(init)
  const [val, setVal] = useState({})

  const toggle = (data = {}) => {
    setIsOpen(!isOpen)
    setVal(data)
  }

  return [
    isOpen,
    toggle,
    val
  ]
}