import {
  Button,
  Alert,
  AlertIcon,
  useToast
} from "@chakra-ui/react"
import { createCategory } from "./Api"
import { useState } from "react"
import { Breadcrumb, Card, FormInput } from "../../components/Common"
import { useAuth } from "../../context/AppContext"

export default function Create({ history }) {
  const { user } = useAuth()

  const toast = useToast()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    setSubmit(true)
    createCategory({ name, description: description ? description : '' }, user.accessToken)
    .then(res => {
      toast({
        title: res.status,
        description: "item ditambahkan",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right"
      })
      history.push('/categories')
    })
    .catch(err => {
      setError(err.message)
    })
    .finally(() => {
      setSubmit(false)
    })
  }

  return (
    <>
      <Breadcrumb main={["/categories", "kategori", "baru"]}/>
      <Card>
        {error !== null && (
          <Alert status="error" mb="5" rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <FormInput data={['nama', name, setName]}/>
        <FormInput data={['deskripsi', description, setDescription]}/>
        <Button 
          mt="4"
          isLoading={submit}
          onClick={() => handleSubmit()}
        >
          simpan
        </Button>
      </Card>
    </>
  )
}