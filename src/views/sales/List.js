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
  Flex,
  Box,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { 
  Breadcrumb, 
  Card, 
  Loading,
  Pagination,
  DatePickerFilter,
  SearchInput,
  FormInputSelection,
  useDebounce,
  useDatePickerFilter,
  useModalState,
} from "../../components/Common"
import { useSales } from "./Api"
import { useAuth } from "../../context/AppContext"
import { formatDate, formatIDR } from "../../utils"

import CustomerSelectionModal from "../customers/Modal"

export default function List() {
  const { user } = useAuth()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const q = useDebounce(search, 600)
  const [startDate, endDate, setter] = useDatePickerFilter()
  const [customer, setCustomer] = useState({name: ''})
  const params = { 
    page, 
    q, 
    startDate: formatDate(startDate), 
    endDate: formatDate(endDate),
    customerId: customer ? customer.id : ''
  }
  const [data, error] = useSales(user, params)

  const [isCustomerOpen, toggleCustomer] = useModalState()

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
        <DatePickerFilter 
          mx="3"
          mt="2"
          startDate={startDate} 
          endDate={endDate} 
          setter={setter}
        />
        <Flex flexDirection="row">
          <Box mx="3" mt="2" flex="1">
            <SearchInput setter={[search, setSearch]}/>
          </Box>
          <Box mx="3" flex="1">
            <FormInputSelection
              data={["", customer.name]}
              placeholder={"pelanggan"}
              onClick={toggleCustomer}
              onRemove={() => {
                setCustomer({name: ''})
              }}
            />
          </Box>
        </Flex>
        
        {data ? (
          <>
          <Table variant="simple" mt="2" mb="4">
            <Thead>
              <Tr>
                <Th>invoice</Th>
                <Th>pelanggan</Th>
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
                  <Td>{sale.customer_name}</Td>
                  <Td isNumeric>{formatDate(new Date(sale.date))}</Td>
                  <Td isNumeric>{formatIDR(sale.amount)}</Td>
                  <Td>{sale.casier}</Td>
                  <Td isNumeric>
                    <Button as={Link} to={`/sales/${sale.id}/detail`}>detail</Button>
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
      <CustomerSelectionModal
        isOpen={isCustomerOpen}
        toggle={toggleCustomer}
        onClose={(customer) => {
          setCustomer(customer)
        }}
      />
    </>
  )
}