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
  AlertIcon,
  Box,
  Flex
} from "@chakra-ui/react"
import { 
  Loading, 
  Pagination, 
  SearchInput, 
  FormInputSelection,
  useDebounce,
  useModalState
} from "../../components/Common"
import { useAuth } from "../../context/AppContext"
import { useProducts } from "./Api"

import CategorySelectionModal from "../categories/Modal"
import { formatIDR } from "../../utils"

export default function ModalCom(props) {
  const { isOpen, toggle, onClose } = props
  const { user } = useAuth()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState({name: ''})
  const q = useDebounce(search, 600)
  const params = { page, q, withCategory: true, withStock: true, categoryId: category?.id }

  const [isCategoryOpen, toggleCategory] = useModalState()

  const [data, error] = useProducts(user, params)

  return (
    <Modal isOpen={isOpen} onClose={toggle} size="3xl">
      <ModalOverlay />
      <ModalContent minW="40rem">
        <ModalHeader>produk</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="row">
            <Box flex="1" mt="2" mx="2">
              <SearchInput setter={[search, setSearch]}/>
            </Box>
            <FormInputSelection 
              data={["", category.name]}
              placeholder={"kategori"}
              onClick={toggleCategory}
              onRemove={() => {
                setCategory({name: ''})
              }}
              flex="1"
            />
          </Flex>
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
                  <Th>kode</Th>
                  <Th>nama</Th>
                  <Th>kategori</Th>
                  <Th>harga</Th>
                  <Th>stok</Th>
                  <Th>deskripsi</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.products.map((product) => (
                  <Tr key={product.id} onClick={() => { 
                      onClose(product)
                      toggle()
                    }} _hover={{bg: "gray.200"}}>
                    <Td>{ product.code }</Td>
                    <Td>{ product.name }</Td>
                    <Td>{ product.category_name }</Td>
                    <Td>{ formatIDR(product.price) }</Td>
                    <Td>{ formatIDR(product.stock) }</Td>
                    <Td>{ product.description }</Td>
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
      <CategorySelectionModal
        isOpen={isCategoryOpen}
        onClose={(category) => {
          setCategory(category)
        }}
        toggle={toggleCategory}
      />
    </Modal>
  )
}