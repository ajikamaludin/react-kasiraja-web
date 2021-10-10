import {
  Button,
  Alert,
  AlertIcon,
  useToast
} from "@chakra-ui/react"
import { createUser } from "./Api"
import { useState } from "react"
import { Breadcrumb, Card, FormInput } from "../../components/Common"
import { useAuth } from "../../context/AppContext"

export default function Create({ history }) {
  const { user } = useAuth()

  const toast = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    setSubmit(true)
    createUser({ name, email, password }, user.accessToken)
    .then(res => {
      toast({
        title: res.status,
        description: "item ditambahkan",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right"
      })
      history.push('/users')
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
      <Breadcrumb main={["/users", "pengguna", "baru"]}/>
      <Card>
        {error !== null && (
          <Alert status="error" mb="5" rounded="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        <FormInput data={['nama', name, setName]}/>
        <FormInput data={['email', email, setEmail]}/>
        <FormInput data={['password', password, setPassword, "password"]}/>
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