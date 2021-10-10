import {
  Modal, 
  ModalOverlay,
  ModalContent, 
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Button,
  Heading,
} from "@chakra-ui/react"
import { formatIDR } from "../../utils"
export default function ModalChange(props) {
  const { isOpen, toggle, onClose, total, pay } = props
  return (
    <Modal isOpen={isOpen} 
      onClose={() => { 
        toggle() 
        onClose() 
      }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>transaksi sukses</ModalHeader>
        <ModalBody textAlign="center">
            <Heading mt={3}>total :</Heading>
            <Heading>{ formatIDR(total) }</Heading>
            <Heading mt={3}>bayar :</Heading>
            <Heading>{ formatIDR(pay) }</Heading>
            <Heading mt={3}>kembalian :</Heading>
            <Heading>{ formatIDR(+pay - +total <= 0 ? 0 : +pay - +total) }</Heading>
        </ModalBody>
        <ModalFooter>
          <Button mt={8} 
            onClick={() => {
              toggle()
              onClose()
            }}>
            tutup
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}