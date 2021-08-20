import { useState } from "react"
import {
  Button,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Grid,
  Box,
} from "@chakra-ui/react"
import { mutate } from "swr"
import qs from "query-string"
import { 
  Breadcrumb, 
  Card, 
  Loading, 
  SearchInput,
  Pagination,
  AlertDialog,
  useDebounce,
  useModalState,
  FormInputSelection
} from "../../components/Common"
import { useProducts, deleteProduct } from "./Api"
import { formatIDR } from  "../../utils"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AppContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import CategorySelectionModal from "../categories/Modal"

export default function List({ history }) {
  const { user } = useAuth()
  const toast = useToast()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const q = useDebounce(search, 600)
  const [category, setCategory] = useState({name: ''})
  const params = { page, q, withCategory: true, withStock: true, categoryId: category?.id }
  const [ data, error ] = useProducts(user, params)

  const [isOpen, toggle, selected] = useModalState()
  const [isCategoryOpen, toggleCategory] = useModalState()

  const handleDelete = () => {
    deleteProduct(selected.id, user.accessToken)
    .then(res => {
      toast({
        title: res.status,
        description: "item dihapus",
        status: "success",
        position: "top-right",
        duration: 4000, 
        isClosable: true
      })
      mutate([`/products?${qs.stringify(params)}`, user.accessToken])
    })
    .catch(err => {
      toast({
        title: err.status,
        description: err.message,
        status: "error",
        position: "top-right",
        duration: 4000, 
        isClosable: true
      })
    })
  }

  if(error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    )
  }

  return (
    <>
      <Breadcrumb main={["/products", "produk"]}/>
      <Card>
        <Button as={Link} to="/products/create" size="md" mb="3">
          tambah
        </Button>
        <Grid gap="1" templateColumns="repeat(2, 1fr)">
          <Box mx="3" mt="2">
            <SearchInput setter={[search, setSearch]}/>
          </Box>
          <FormInputSelection 
            data={["", category.name]}
            placeholder={"kategori"}
            onClick={toggleCategory}
            onRemove={() => {
              setCategory({name: ''})
            }}
          />
        </Grid>
        {data ? (
          <>
          <Table variant="simple" mt="2" mb="4">
            <Thead>
              <Tr>
                <Th>code</Th>
                <Th>nama</Th>
                <Th>kategori</Th>
                <Th isNumeric>harga beli</Th>
                <Th isNumeric>harga jual</Th>
                <Th isNumeric>stok</Th>
                <Th isNumeric>total jual</Th>
                <Th isNumeric>total beli</Th>
                <Th>deskripsi</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.products.map((product) => (
                <Tr key={product.id}>
                  <Td>{ product.code }</Td>
                  <Td>{ product.name }</Td>
                  <Td>{ product.category_name }</Td>
                  <Td isNumeric>{ formatIDR(product.cost) }</Td>
                  <Td isNumeric>{ formatIDR(product.price) }</Td>
                  <Td isNumeric>{ formatIDR(product.stock) }</Td>
                  <Td isNumeric>{ formatIDR(product.sale) }</Td>
                  <Td isNumeric>{ formatIDR(product.purchase) }</Td>
                  <Td>{ product.description }</Td>
                  <Td isNumeric>
                    <Menu>
                      <MenuButton as={Button}>
                        <FontAwesomeIcon icon="ellipsis-v"/>
                      </MenuButton>
                      <MenuList>
                        <MenuItem as={Link} to={`/products/${product.id}/edit`}>ubah</MenuItem>
                        <MenuItem 
                          onClick={() => {
                            toggle(product)
                          }}
                        >
                          hapus
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination page={page} setPage={setPage} totalPages={data.meta.totalPages}/>
          </>
        ) : (
          <Loading/>
        )}
      </Card>
      <AlertDialog 
        isOpen={isOpen} 
        onClose={handleDelete} 
        toggle={() => toggle()}
      />
      <CategorySelectionModal
        isOpen={isCategoryOpen}
        onClose={(category) => {
          setCategory(category)
        }}
        toggle={toggleCategory}
      />
    </>
  )
}