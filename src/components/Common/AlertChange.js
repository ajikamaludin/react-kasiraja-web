import { useRef, useState } from "react"
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react"

export default function AlertChange({ isOpen, onClose, toggle }) {
  const cancelRef = useRef()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={toggle}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              pembayaran
            </AlertDialogHeader>

            <AlertDialogBody>
              pembayaran dengan uang pas ?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button bg="white" color="black" _hover={{bg: "gray.200"}} _active={{bg: "gray.200"}} ref={cancelRef} onClick={toggle}>
                batal
              </Button>
              <Button 
                onClick={async () => {
                  setLoading(true)
                  await onClose()
                  toggle()
                  setLoading(false)
                }} 
                ml={3}
                isLoading={loading}
              >
                Ya
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}