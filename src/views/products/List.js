import {
  Button,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody
} from "@chakra-ui/react"
import Card from "../../components/Common/Card"
import DatePickerFilter from "../../components/Common/DatePickerFilter"

export default function List() {
  const arr = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
    <Card>
      {/* Tombol Create */}
      <Button size="md">Tambah</Button>
      {/* Filter Tanggal  */}
      <DatePickerFilter/>
      {/* daftar products */}
      <Table variant="simple" mt="2" colorScheme="whatsapp">
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            arr.map(() => (
              <Tr onClick={() => {alert('Hello')}}>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </Card>
  )
}