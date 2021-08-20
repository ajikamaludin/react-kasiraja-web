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
  AlertIcon, 
  Alert
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { 
  Card, 
  FormInput, 
  Breadcrumb,
  Loading
} from "../../components/Common"
import { formatDate, formatIDR } from "../../utils"
import { useAuth } from "../../context/AppContext"
import { getPurchase } from "./Api"

export default function Create(props) {
  const id = props.match.params.id
  const { user } = useAuth()
  const [invoice, setInvoice] = useState('')
  const [date, setDate] = useState(new Date())

  const [note, setNote] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [items, setItems] = useState([])

  const totalAmount = items.reduce((mr, item) => {
    return mr + +item.cost * +item.quantity
  }, 0)

  useEffect(() => {
    setLoading(true)
    getPurchase(id, user.accessToken)
    .then(res => {
      setInvoice(res.purchase.invoice)
      setDate(new Date(res.purchase.date))
      setNote(res.purchase.description)
      setItems(res.purchase.items)
    })
    .catch(err => {
      setError(err.message)
    })
    .finally(() => setLoading(false))
    return () => {}
  }, [id, user])

  if(loading) {
    return <Loading/>
  }

  return (
    <Flex direction="column">
      <Breadcrumb main={["/purchases", "pembelian", "detail"]}/>
      {error && (
        <Alert status="error" mb="5" rounded="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Flex>
        <Card flex="1">
          <Flex direction="column">
            <Box minH="32rem">
              <FormInput data={["penerima", user.name]} readOnly={true} bg="gray.200"/>
              <FormInput data={["tangal", formatDate(date), setDate]} readOnly={true} bg="gray.200"/>
              <FormInput data={["no. invoice", invoice, setInvoice]} readOnly={true} bg="gray.200"/>
              <Textarea 
                focusBorderColor="red.500"
                placeholder="catatan" 
                value={note}
                readOnly={true} bg="gray.200"
              />
            </Box>
          </Flex>
        </Card>
        <Card flex="3">
          <Table px="3" mt="3" minH="27rem">
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
                  <Td isNumeric>{formatIDR(item.cost)}</Td>
                  <Td isNumeric>
                    {formatIDR(item.quantity)}
                  </Td>
                  <Td isNumeric>
                    {formatIDR(item.cost * item.quantity)}
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