import {
  Button,
  Alert,
  AlertIcon,
  Box,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Heading
} from "@chakra-ui/react"
import { useProducts } from "../../api"
import Card from "../../components/Common/Card"
import Loading from "../../components/Common/Loading"
import { DatePickerFilter, useDatePickerFilter } from "../../components/Common/DatePickerFilter"
import { formatIDR } from  "../../utils"

export default function List({ history }) {
  const [ startDate, endDate, setter ] = useDatePickerFilter()
  const [ data, error ] = useProducts({startDate, endDate})

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
      <Box p="3" m="2" bg="white" rounded="lg">
          <Heading size="md">dashboard / produk</Heading>
        </Box>
      <Card>
        <Button size="md">tambah</Button>
        <DatePickerFilter startDate={startDate} endDate={endDate} setter={setter} />
        {data ? (
          <Table variant="simple" mt="2">
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
        ) : (
          <Loading/>
        )}
      </Card>
    </>
  )
}