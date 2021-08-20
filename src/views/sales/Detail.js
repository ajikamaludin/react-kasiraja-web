import { 
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Th,
  Td,
  Tr,
  Textarea,
  Heading,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { 
  Card,
  FormInput,
  FormInputNumber,
} from "../../components/Common"
import { formatDate, formatIDR } from "../../utils"
import { useAuth } from "../../context/AppContext"
import { getSale } from "./Api"

export default function Create(props) {
  const id = props.match.params.id
  const { user } = useAuth()
  
  const [casier, setCasier] = useState('')
  const [invoice, setInvoice] = useState('')
  const [date, setDate] = useState(new Date())
  const [customer, setCustomer] = useState({name: ''})
  const [discount, setDiscount] = useState(0)
  const [note, setNote] = useState('')

  const [items, setItems] = useState([])

  const totalAmount = items.reduce((mr, item) => {
    return mr + +item.price * +item.quantity
  }, 0) - +discount

  useEffect(() => {
    getSale(id, user.accessToken)
    .then(res => {
      setCasier(res.sale.casier)
      setDate(new Date(res.sale.date))
      setCustomer({name: res.sale.customer_name})
      setInvoice(res.sale.invoice)
      setDiscount(res.sale.discount)
      setNote(res.sale.description)
      setItems(res.sale.items)
    })
    .catch(err => {
      console.log(err)
    })
    return () => {}
  }, [id, user])

  return (
    <Flex direction="column" mt="-7">
      <Flex>
        <Card flex="1">
          <FormInput data={["kasir", casier, setCasier]} readOnly={true} bg="gray.200"/>
          <FormInput data={["tangal", formatDate(date), setDate]} readOnly={true} bg="gray.200"/>
          <FormInput data={["pelanggan", customer.name]} readOnly={true} bg="gray.200"/>
          <FormInput data={["no. invoice", invoice, setInvoice]} readOnly={true} bg="gray.200"/>
          <FormInputNumber data={["diskon", formatIDR(discount), setDiscount]} readOnly={true} bg="gray.200"/>
          <Textarea 
            focusBorderColor="red.500"
            placeholder="catatan" 
            value={note}
            readOnly={true}
            bg="gray.200"
          />
        </Card>
        <Card flex="3">
          <Table px="3" mt="2" minH="27rem">
            <Thead style={{display: "table", width: "calc( 100% )", tableLayout: "fixed"}}>
              <Tr>
                <Th>kode</Th>
                <Th>nama</Th>
                <Th isNumeric>harga</Th>
                <Th isNumeric>jumlah</Th>
                <Th isNumeric>subtotal</Th>
              </Tr>
            </Thead>
            <Tbody style={{display: "block", maxHeight: "27rem", overflow: "auto", width: "100%"}}>
              {items.map(item => (
                <Tr key={item.id} style={{display: "table", width: "100%", tableLayout: "fixed"}}>
                  <Td>{item.code}</Td>
                  <Td>{item.name}</Td>
                  <Td isNumeric>{formatIDR(item.price)}</Td>
                  <Td isNumeric>
                    
                  </Td>
                  <Td isNumeric>
                    {formatIDR(item.price * item.quantity)}
                  </Td>
                  
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex direction="row" justifyContent="space-between">
            <Box>
              <Heading>Total</Heading>
            </Box>
            <Box>
              <Heading>
                {formatIDR(totalAmount)}
              </Heading>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  )
}