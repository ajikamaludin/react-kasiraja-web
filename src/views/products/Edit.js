import { Alert, AlertIcon, Button, useToast } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import {
  Breadcrumb,
  Card,
  FormInput,
  FormInputNumber,
  FormInputSelection,
  Loading,
  useModalState
} from "../../components/Common"
import { getProduct, updateProduct } from "./Api"
import CategoryModalSelection from "../categories/Modal"
import { useAuth } from "../../context/AppContext"
import { formatIDR } from "../../utils"

export default function Edit(props) {
  const id = props.match.params.id
  const { user } = useAuth()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState(0)
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [category, setCategory] = useState({name: ''})

  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)

  const [isOpen, toggle] = useModalState()

  const handleSubmit = () => {
    setSubmit(true)
    updateProduct(id, {
      name,
      description,
      cost,
      price,
      stock,
      category_id: category ? category.id : ''
    }, user.accessToken)
    .then(res => {
      toast({
        title: res.status,
        description: "item diubah",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right"
      })
      props.history.push('/products')
    })
    .catch((err) => {
      setError(err.message)
    })
    .finally(() => {
      setSubmit(false)
    })
  }

  useEffect(() => {
    setLoading(true)
    getProduct(id, user.accessToken)
    .then(res => {
      setName(res.product.name)
      setDescription(res.product.description)
      setPrice(res.product.price)
      setCost(res.product.cost)
      setStock(res.product.stock)
      setCategory({ 
        id: res.product.category_id,
        name: res.product.category_name
      })
    })
    .catch(err => setError(err))
    .finally(() => setLoading(false))
    return () => {}
  }, [id, user])

  return (
    <>
      <Breadcrumb main={["/products", "produk", "ubah"]}/>
      <Card>
        {error !== null && (
          <Alert status="error" mb="5" rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {loading ? (
          <Loading/>
        ) : (
        <>
          <FormInput data={['nama', name, setName]}/>
          <FormInput data={['deskripsi', description, setDescription]}/>
          <FormInputNumber data={['harga beli', formatIDR(cost), setCost]}/>
          <FormInputNumber data={['harga jual', formatIDR(price), setPrice]}/>
          <FormInputNumber data={['stok', formatIDR(stock), setStock]}/>
          <FormInputSelection
            data={['kategori', category.name]}
            readOnly={true}
            onFormClick={() => toggle()}
          />
          <Button
            mt="4"
            isLoading={submit}
            onClick={handleSubmit}
          >
            simpan
          </Button>
        </>
        )}
      </Card>
      <CategoryModalSelection 
        isOpen={isOpen}
        toggle={toggle}
        onClose={(category) => {
          setCategory(category)
        }}
      />
    </>
  )
}