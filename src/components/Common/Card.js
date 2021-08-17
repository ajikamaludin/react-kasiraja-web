import { Box } from "@chakra-ui/react"

export default function Card(props) {
  return (
    <Box bg="white" shadow="lg" minW="15rem" minH="1" rounded="md" p="3.5" mx="0.5rem">
      {props.children}
    </Box>
  )
}