import {
  Button,
  Alert,
  AlertIcon,
  useToast
} from "@chakra-ui/react"
import { getCustomer, updateCustomer } from "./Api"
import { useState } from "react"
import { Breadcrumb, Card, FormInput, Loading } from "../../components/Common"
import { useAuth } from "../../context/AppContext"
import { useEffect } from "react"

export default function Edit(props) {
  const id = props.match.params.id
  const { user } = useAuth()

  const toast = useToast()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')

  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    setSubmit(true)
    updateCustomer(id, {
      name, 
      phone,
      address,
      description,
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
      props.history.push('/customers')
    })
    .catch(err => {
      setError(err.message)
    })
    .finally(() => {
      setSubmit(false)
    })
  }

  useEffect(() => {
    const { accessToken: token } = user
    setLoading(true)
    getCustomer(id, token)
    .then(res => {
      setName(res.customer.name)
      setPhone(res.customer.phone)
      setAddress(res.customer.address)
      setDescription(res.customer.description)
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))
    return () => {}
  }, [id, user])

  return (
    <>
      <Breadcrumb main={["/customers", "pelanggan", "ubah"]}/>
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
          <FormInput data={['no.hp', phone, setPhone]}/>
          <FormInput data={['alamat', address, setAddress]}/>
          <FormInput data={['keterangan', description, setDescription]}/>
          <Button 
            mt="4"
            isLoading={submit}
            onClick={() => handleSubmit()}
          >
            simpan
          </Button>
        </>
        )}
      </Card>
    </>
  )
}