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
import { usePurchases } from "./Api"
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
    endDate: formatDate(endDate),
  }
  const [data, error] = usePurchases(user, params)

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
      <Breadcrumb main={["/purchases", "pembelian"]}/>
      <Card>
        <Button as={Link} to="/purchases/create" size="md" mb="3">
          tambah
        </Button>
        <DatePickerFilter 
          mx="3"
          mt="2"
          startDate={startDate} 
          endDate={endDate} 
          setter={setter}
        />
        <SearchInput setter={[search, setSearch]} px="3" mt="3"/>
        
        {data ? (
          <>
          <Table variant="simple" mt="2" mb="4">
            <Thead>
              <Tr>
                <Th>invoice</Th>
                <Th isNumeric>tanggal</Th>
                <Th isNumeric>total</Th>
                <Th>penerima</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.purchases.map((purchase) => (
                <Tr key={purchase.id}>
                  <Td>{purchase.invoice}</Td>
                  <Td isNumeric>{formatDate(new Date(purchase.date))}</Td>
                  <Td isNumeric>{formatIDR(purchase.amount)}</Td>
                  <Td>{purchase.creator}</Td>
                  <Td isNumeric>
                    <Button as={Link} to={`/purchases/${purchase.id}/detail`}>detail</Button>
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