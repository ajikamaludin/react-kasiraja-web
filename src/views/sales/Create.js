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
import { useState, useEffect } from "react"
import { 
  Card, 
  FormDatePicker, 
  FormInput, 
  InputNumber,
  FormInputNumber, 
  FormInputSelection, 
  FormInputSelectionOpen,
  AlertChange,
  ModalChange,
  Breadcrumb,
  useModalState,
} from "../../components/Common"
import { formatDate, formatIDR, genInvId } from "../../utils"
import { useAuth } from "../../context/AppContext"
import { useCustomers } from "../customers/Api"
import { searchProductByCode } from "../products/Api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createSale } from "./Api"

import CustomerSelectionModal from "../customers/Modal"
import ProductSelectionModal from "../products/Modal"
import { mutate } from "swr"

export default function Create() {
  const { user } = useAuth()
  const currentDate = new Date()
  const invoicePrefix = genInvId()
  const [invoice, setInvoice] = useState(`${invoicePrefix}/${Date.parse(currentDate)/1000}`)
  const [date, setDate] = useState(currentDate)
  const [customer, setCustomer] = useState({name: ''})
  const [discount, setDiscount] = useState(0)
  const [note, setNote] = useState('')

  const [productCode, setProductCode] = useState('')
  const [payAmount, setPayAmount] = useState('')
  const [submit, setSummit] = useState(false)

  const [data] = useCustomers(user)

  const toast = useToast()

  const [isCustomerOpen, toggleCustomer] = useModalState()
  const [isProductOpen, toggleProduct] = useModalState()
  const [isAlert, toggleAlert] = useModalState()
  const [isModalChange, toggleChange] = useModalState()

  const [items, setItems] = useState([])

  const searchProductCode = (e) => {
    if(e.code === "Enter") {
      if(!productCode) { 
        return
      }
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
          quantity: +item.stock <= +value ? +item.stock : +value
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
    return mr + +item.price * +item.quantity
  }, 0) - +discount

  const handlePayAmountEnter = (e) => {
    if(e.code === "Enter") {
      handlePay()
    }
  }

  const handlePay = () => {
    if(customer.name === "") {
      toast({
        title: 'error',
        description: 'pelanggan kosong',
        status: 'warning',
        isClosable: true,
        duration: 6000,
        position: 'top-right',
      });
      return
    }
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
    if(payAmount === "" || +payAmount <= 0) {
      toggleAlert()
    } else {
      if(+payAmount < totalAmount) {
        return 
      }
      handleCreateSale()
    }
  }

  const resetForm = () => {
    setItems([])
    setDiscount(0)
    setNote('')
    setPayAmount('')
    setInvoice(`${genInvId()}/${Date.parse(currentDate)/1000}`)
    mutate(["/products?page=1&q=&withCategory=true&withStock=true", user.accessToken])
  }

  const handleCreateSale = () => {
    setSummit(true)
    createSale({
      officeId: user.officeid,
      customerId: customer ? customer.id : '',
      date: formatDate(date),
      invoice,
      amount: totalAmount,
      discount,
      description: note,
      items: items.map(item => {
        return { 
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        }
      })
    }, user.accessToken)
    .then((res) => {
      toast({
        title: 'success',
        description: res.message,
        status: 'success',
        isClosable: true,
        duration: 2000,
        position: 'top-right',
      });
      toggleChange()
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

  useEffect(() => {
    if(data) {
      const selectedCustomer = data.customers[0]
      if(selectedCustomer !== undefined) {
        setCustomer(selectedCustomer)
      }
    }
    return () => {}
  }, [data])

  return (
    <Flex direction="column" mt={user.role === "admin" ? "" : "-7"}>
      {user.role === "admin" && (
        <Breadcrumb main={["/sales", "penjualan", "baru"]}/>
      )}
      <AlertChange isOpen={isAlert} toggle={toggleAlert} onClose={() => handleCreateSale()}/>
      <ModalChange 
        isOpen={isModalChange} 
        toggle={toggleChange} 
        pay={payAmount} 
        total={totalAmount}
        onClose={resetForm}
      />
      <Flex>
        <Card flex="1">
          <FormInput data={["kasir", user.name]} readOnly={true} bg="gray.200"/>
          <FormDatePicker data={["tangal", date, setDate]}/>
          <Box my="2">
            <FormInputSelection 
              data={["pelanggan", customer.name]}
              onClick={toggleCustomer}
              onRemove={() => setCustomer({name: ''})}
            />
          </Box>
          <FormInput data={["no. invoice", invoice, setInvoice]}/>
          <FormInputNumber data={["diskon", discount, setDiscount]}/>
          <Textarea 
            focusBorderColor="red.500"
            placeholder="catatan" 
            value={note}
            onChange={e => setNote(e.target.value)}
          />
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
                  <Td isNumeric>{formatIDR(item.price)}</Td>
                  <Td isNumeric>
                    <InputNumber
                      type="number"
                      value={item.quantity}
                      onValueChange={(e) => setItemQuantity(item.id, e.value)}
                    />
                  </Td>
                  <Td isNumeric>
                    {formatIDR(item.price * item.quantity)}
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
      <Flex mt="2">
        <Card width="100%">
          <Flex direction="row" justifyContent="flex-end">
            <Box mt="2" style={{textAlign: "end"}}>
              <InputNumber 
                value={payAmount}
                onValueChange={(e) => {
                  setPayAmount(e.value)
                }}
                onKeyUp={(e) => {
                  handlePayAmountEnter(e)
                }}
                placeholder="...jumlah bayar" 
                style={{ height: "3rem", textAlign: "right", fontWeight: "bold", fontSize: "2em" }}
              />
            </Box>
            <Button 
              mt="2" 
              mx="2" 
              size="lg" 
              minW="12rem"
              isLoading={submit}
              onClick={handlePay}
            >
              Bayar
            </Button>
          </Flex>
        </Card>
      </Flex>
      <CustomerSelectionModal
        isOpen={isCustomerOpen}
        toggle={toggleCustomer}
        onClose={(customer) => {
          setCustomer(customer)
        }}
      />
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