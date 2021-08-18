import { Alert, AlertIcon, Button, useToast } from "@chakra-ui/react"
import { useState } from "react"
import {
  Breadcrumb,
  Card,
  FormInput,
  FormInputNumber,
  FormInputSelection,
  useModalState
} from "../../components/Common"
import { createProduct } from "./Api"
import CategoryModalSelection from "../categories/Modal"
import { useAuth } from "../../context/AppContext"

export default function Create(props) {
  const { user } = useAuth()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState(0)
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [category, setCategory] = useState({name: ''})

  const toast = useToast()
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)

  const [ isOpen, toggle ] = useModalState()

  const handleSubmit = () => {
    setSubmit(true)
    createProduct({
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
        description: "item ditambahkan",
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

  return (
    <>
      <Breadcrumb main={["/products", "produk", "baru"]}/>
      <Card>
        {error !== null && (
          <Alert status="error" mb="5" rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <FormInput data={['nama', name, setName]}/>
        <FormInput data={['deskripsi', description, setDescription]}/>
        <FormInputNumber data={['harga beli', cost, setCost]} onClick={() => setCost('')}/>
        <FormInputNumber data={['harga jual', price, setPrice]} onClick={() => setPrice('')}/>
        <FormInputNumber data={['stok', stock, setStock]}/>
        <FormInputSelection
          data={['kategori', category.name]}
          readOnly={true}
          onClick={() => toggle()}
        />
        <Button
          mt="4"
          isLoading={submit}
          onClick={handleSubmit}
        >
          simpan
        </Button>
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