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
  Button,
  Heading,
  useToast
} from "@chakra-ui/react"
import { useState } from "react"
import { 
  Card, 
  FormDatePicker, 
  FormInput, 
  InputNumber,
  Breadcrumb,
  FormInputSelectionOpen,
  useModalState,
} from "../../components/Common"
import { formatDate, formatIDR, genInvId } from "../../utils"
import { useAuth } from "../../context/AppContext"
import { searchProductByCode } from "../products/Api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPurchase } from "./Api"

import ProductSelectionModal from "../products/Modal"
import { mutate } from "swr"

export default function Create() {
  const { user } = useAuth()
  const currentDate = new Date()
  const invoicePrefix = genInvId()
  const [invoice, setInvoice] = useState(`${invoicePrefix}/${Date.parse(currentDate)/1000}`)
  const [date, setDate] = useState(currentDate)

  const [note, setNote] = useState('')

  const [productCode, setProductCode] = useState('')
  const [submit, setSummit] = useState(false)


  const toast = useToast()

  const [isProductOpen, toggleProduct] = useModalState()

  const [items, setItems] = useState([])

  const searchProductCode = (e) => {
    if(e.code === "Enter") {
      searchProductByCode(productCode, user.accessToken)
      .then(product => {
        if(product) {
          addItems(product)
        }
      })
      setProductCode('')
    }
  }

  const addItems = (product) => {
    const findId = items.find(item => item.id === product.id)
    if(findId) {
      setItems(items.map(item => {
        return {
          ...item,
          quantity: item.id === product.id ? +item.quantity + 1 : item.quantity
        }
      }))
    } else {
      setItems(items.concat({
        ...product,
        quantity: 1
      }))
    }
  }

  const setItemQuantity = (itemId, value) => {
    setItems(items.map(item => {
      if (itemId === item.id) {
        return {
          ...item,
          quantity: value
        }
      } else {
        return item
      }
    }))
  }

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId))
  }

  const totalAmount = items.reduce((mr, item) => {
    return mr + +item.cost * +item.quantity
  }, 0)

  const resetForm = () => {
    setItems([])
    setNote('')
    setInvoice(`${genInvId()}/${Date.parse(currentDate)/1000}`)
    mutate(["/products?page=1&q=&withCategory=true&withStock=true", user.accessToken])
  }

  const handleCreatePurchase = () => {
    if(items.length <= 0) {
      toast({
        title: 'error',
        description: 'item produk kosong',
        status: 'warning',
        isClosable: true,
        duration: 6000,
        position: 'top-right',
      });
      return
    }
    setSummit(true)
    createPurchase({
      officeId: user.officeid,
      date: formatDate(date),
      invoice,
      amount: totalAmount,
      discount: 0,
      description: note,
      items: items.map(item => {
        return { 
          productId: item.id,
          quantity: item.quantity,
          cost: item.cost,
        }
      })
    }, user.accessToken)
    .then((res) => {
      toast({
        title: "success",
        description: res.message,
        status: "success",
        isClosable: true,
        duration: 6000,
        position: "top-right"
      })
      resetForm()
    })
    .catch(err => {
      toast({
        title: "error",
        description: err.message,
        status: "warning",
        isClosable: true,
        duration: 6000,
        position: "top-right"
      })
    })
    .finally(() => {
      setSummit(false)
    })
  }

  return (
    <Flex direction="column">
      <Breadcrumb main={["/purchases", "pembelian", "baru"]}/>
      <Flex>
        <Card flex="1">
          <Flex direction="column">
            <Box minH="32rem">
              <FormInput data={["penerima", user.name]} readOnly={true} bg="gray.200"/>
              <FormDatePicker data={["tangal", date, setDate]}/>
              <FormInput data={["no. invoice", invoice, setInvoice]}/>
              <Textarea 
                focusBorderColor="red.500"
                placeholder="catatan" 
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </Box>
            <Box>
              <Button
                isLoading={submit}
                onClick={handleCreatePurchase}
              >
                Simpan
              </Button>
            </Box>
          </Flex>
        </Card>
        <Card flex="3">
          <Flex direction="row">
            <FormInputSelectionOpen 
              data={["", productCode, setProductCode]}
              onClick={toggleProduct}
              placeholder="cari produk"
              autoFocus
              onKeyUp={searchProductCode}
              flex="8"
            />
            <Button 
              flex="1" 
              mt="2" 
              mx="2"
              bg="gray.100"
              color="black"
              _hover={{ bg: "gray.200"}}
              _active={{ bg: "gray.300"}}
              onClick={toggleProduct}
            >
              produk
            </Button>
          </Flex>
          <Table px="3" mt="3" minH="27rem">
            <Thead style={{display: "table", width: "calc( 100% )", tableLayout: "fixed"}}>
              <Tr>
                <Th>kode</Th>
                <Th>nama</Th>
                <Th isNumeric>harga</Th>
                <Th isNumeric>jumlah</Th>
                <Th isNumeric>subtotal</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody style={{display: "block", maxHeight: "27rem", overflow: "auto", width: "100%"}}>
              {items.map(item => (
                <Tr key={item.id} style={{display: "table", width: "100%", tableLayout: "fixed"}}>
                  <Td>{item.code}</Td>
                  <Td>{item.name}</Td>
                  <Td isNumeric>{formatIDR(item.cost)}</Td>
                  <Td isNumeric>
                    <InputNumber
                      type="number"
                      value={item.quantity}
                      onValueChange={(e) => setItemQuantity(item.id, e.value)}
                    />
                  </Td>
                  <Td isNumeric>
                    {formatIDR(item.cost * item.quantity)}
                  </Td>
                  <Td isNumeric>
                    <FontAwesomeIcon icon="times" onClick={() => removeItem(item.id)}/>
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
      <ProductSelectionModal
        isOpen={isProductOpen}
        toggle={toggleProduct}
        onClose={(product) => {
          addItems(product)
        }}
      />
    </Flex>
  )
}