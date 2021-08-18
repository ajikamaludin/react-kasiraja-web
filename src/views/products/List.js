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
} from "@chakra-ui/react"
import { useProducts } from "../../api"
import { 
  Breadcrumb, 
  Card, 
  Loading, 
  SearchInput,
  Pagination,
  useDebounce
} from "../../components/Common"
import { formatIDR } from  "../../utils"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AppContext"

export default function List({ history }) {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const q = useDebounce(search, 600)
  const [ data, error ] = useProducts(user, { page, q })

  const handleItemClick = (id) => {
    history.push(`/products/${id}`)
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
        <Button as={Link} to="/products/create" size="md">
          tambah
        </Button>
        <SearchInput setter={[search, setSearch]}/>
        {data ? (
          <>
          <Table variant="simple" mt="2" mb="4">
            <Thead>
              <Tr>
                <Th>nama</Th>
                <Th isNumeric>harga beli</Th>
                <Th isNumeric>harga jual</Th>
                <Th>deskripsi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.products.map((product) => (
                <Tr onClick={() => handleItemClick(product.id)} key={product.id}>
                  <Td>{ product.name }</Td>
                  <Td isNumeric>{ formatIDR(product.cost) }</Td>
                  <Td isNumeric>{ formatIDR(product.price) }</Td>
                  <Td>{ product.description }</Td>
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
    </>
  )
}