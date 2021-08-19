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
import { Link } from "react-router-dom"
import { 
  Breadcrumb, 
  Card, 
  Loading,
  Pagination,
  DatePickerFilter,
  SearchInput,
  useDebounce,
  useDatePickerFilter,
} from "../../components/Common"
import { useSales } from "./Api"
import { useAuth } from "../../context/AppContext"
import { formatDate, formatIDR } from "../../utils"

export default function List() {
  const { user } = useAuth()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const q = useDebounce(search, 600)
  const [startDate, endDate, setter] = useDatePickerFilter()
  const params = { 
    page, 
    q, 
    startDate: formatDate(startDate), 
    endDate: formatDate(endDate)
  }
  const [data, error] = useSales(user, params)

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
      <Breadcrumb main={["/sales", "penjualan"]}/>
      <Card>
        <Button as={Link} to="/sales/create" size="md" mb="3">
          tambah
        </Button>
        <SearchInput setter={[search, setSearch]}/>
        <DatePickerFilter 
          mx="3"
          mt="2"
          startDate={startDate} 
          endDate={endDate} 
          setter={setter}
        />
        {data ? (
          <>
          <Table variant="simple" mt="2" mb="4">
            <Thead>
              <Tr>
                <Th>invoice</Th>
                <Th isNumeric>tanggal</Th>
                <Th isNumeric>total</Th>
                <Th>kasir</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.sales.map((sale) => (
                <Tr key={sale.id}>
                  <Td>{sale.invoice}</Td>
                  <Td isNumeric>{formatDate(new Date(sale.date))}</Td>
                  <Td isNumeric>{formatIDR(sale.amount)}</Td>
                  <Td>{sale.casier}</Td>
                  <Td isNumeric>
                    <Button as={Link} to={`/users/${sale.id}/detail`}>detail</Button>
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
    </>
  )
}