import { 
  Flex,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert, 
  AlertIcon,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AppContext"
import { login } from './Api'

export default function Login(props) {
  const { isLoggedIn, persistUser } = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState([])
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmit(true)
    login({ email, password })
    .then(res => {
      const { data } = res
      persistUser({
        ...data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    })
    .catch(err => {
      setErrors(err.response.data)
    })
    .finally(() => setSubmit(false))
  }

  useEffect(() => {
    const { history } = props
    if (isLoggedIn()) {
      history.push('/dashboard')
    }
  })

  return (
    <Box style={{minHeight: "100vh"}} bg="gray.200" alignItems="center">
      <Flex py={{ base: 1, lg: 22 }} px={{ base: 1, lg: 12, xl: 52 }} flexFlow={{base: "column", lg: "row" }} justifyContent="center" style={{ minHeight: "100vh", placeItems: "center", gap: "1rem", alignItems: "center"}}>
        <Box maxW={{base: "80", lg: "container.lg"}} display={{base: "none", lg: "block"}}>
          <Heading pb="7">Hai, kasirAja</Heading>
          <Text>
            kasirAja sebuah sistem POS simple, mudah, cepat, dan modern
          </Text>
          <Text>
            Sistem penjualan dan pembelian yang simple dengan pengelolan produk multi user. modern dengan dibangun diatas rest api dengan menggunakan nodejs, dapat diakses melalui web maupun perangkat mobile dengan aplikasi yang tersedia dan support dengan PWA.
          </Text>
        </Box>
        <Box flexShrink="0" shadow="lg" p="8" maxW="96" w="full" bg="white" rounded="lg">
          <Box rounded="lg" >
            {errors.message?.length > 0 && (
              <Alert status="error" mb="5" rounded="md">
                <AlertIcon />
                {errors.message}
              </Alert>
            )}
            <FormControl id="email" pb="2">
              <FormLabel mb="1">Email</FormLabel>
              <Input 
                focusBorderColor="red.500" 
                type="email" 
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </FormControl>
            <FormControl id="password" pb="4">
              <FormLabel mb="1">Password</FormLabel>
              <Input
                focusBorderColor="red.500"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Box mt={5} mb="1" ml="1" fontSize="sm">
              <Link to="/register">
                Ingin mencoba, daftar ?
              </Link>
            </Box>
            <Button
              p={6}
              w="100%"
              type="submit"
              disabled={submit}
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}