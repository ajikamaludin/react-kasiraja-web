import {
  Button,
  Alert,
  AlertIcon,
  useToast
} from "@chakra-ui/react"
import { getUser, updateUser } from "./Api"
import { useState } from "react"
import { Breadcrumb, Card, FormInput, Loading } from "../../components/Common"
import { useAuth } from "../../context/AppContext"
import { useEffect } from "react"

export default function Edit(props) {
  const id = props.match.params.id
  const { user } = useAuth()

  const toast = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = () => {
    setSubmit(true)
    updateUser(id, {
      name, 
      email,
      password
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
      props.history.push('/users')
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
    getUser(id, token)
    .then(res => {
      setName(res.user.name)
      setEmail(res.user.email)
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))
    return () => {}
  }, [id, user])

  return (
    <>
      {user.role === "admin" && (
        <Breadcrumb main={["/users", "pengguna", "ubah"]}/>
      )}
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
          <FormInput data={['email', email, setEmail]}/>
          <FormInput data={['password', password, setPassword, "password"]}/>
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