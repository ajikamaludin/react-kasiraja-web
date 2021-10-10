import { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tr,Th,Td,
  Tbody,
  Alert,
  AlertIcon
} from "@chakra-ui/react"
import { Loading, Pagination, SearchInput, useDebounce } from "../../components/Common"
import { useAuth } from "../../context/AppContext"
import { useCustomers } from "./Api"

export default function ModalCom(props) {
  const { isOpen, toggle, onClose } = props
  const { user } = useAuth()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const q = useDebounce(search, 600)

  const [data, error] = useCustomers(user, { page, q })

  return (
    <Modal isOpen={isOpen} onClose={toggle}>
      <ModalOverlay />
      <ModalContent minW="40rem">
        <ModalHeader>pelanggan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchInput setter={[search, setSearch]}/>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error.message}
            </Alert>
          )}
          {data ? (
            <>
            <Table variant="simple" mt="2" mb="4">
              <Thead>
                <Tr>
                  <Th>nama</Th>
                  <Th>no.hp</Th>
                  <Th>alamat</Th>
                  <Th>keterangan</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.customers.map((customer) => (
                  <Tr key={customer.id} onClick={() => { 
                      onClose(customer)
                      toggle()
                    }} _hover={{bg: "gray.200"}}>
                    <Td>{ customer.name }</Td>
                    <Td>{ customer.phone }</Td>
                    <Td>{ customer.address }</Td>
                    <Td>{ customer.description }</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Pagination page={page} setPage={setPage} totalPages={data.meta.totalPages} mb="4"/>
            </>
          ) : (
            <Loading/>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}