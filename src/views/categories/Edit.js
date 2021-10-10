import {
  Button,
  Alert,
  AlertIcon,
  useToast
} from "@chakra-ui/react"
import { getCategory, updateCategory } from "./Api"
import { useState } from "react"
import { Breadcrumb, Card, FormInput, Loading } from "../../components/Common"
import { useAuth } from "../../context/AppContext"
import { useEffect } from "react"

export default function Edit(props) {
  const id = props.match.params.id
  const { user } = useAuth()

  const toast = useToast()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    setSubmit(true)
    updateCategory(id, {
      name, 
      description: description ? description : '' 
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
      props.history.push('/categories')
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
    getCategory(id, token)
    .then(res => {
      setName(res.category.name)
      setDescription(res.category.description)
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))
    return () => {}
  }, [id, user])

  return (
    <>
      <Breadcrumb main={["/categories", "kategori", "ubah"]}/>
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