import { Container, Center } from '@chakra-ui/react'

export default function AppCrash(){
  return (
    <Container minW="full" minH="full">
      <Center bg="red.600" minH="40rem" m="10" color="white" fontSize="2.5rem">
        be patient, app crash / down / in maintace
      </Center>
    </Container>
  )
}