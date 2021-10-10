import { Box } from "@chakra-ui/react"

export default function Card({ children , ...resprops}) {
  return (
    <Box bg="white" shadow="lg" minW={{ base: "10rem", lg: "15rem"}} minH="1" rounded="md" p="3.5" mx="0.5rem" {...resprops}>
      {children}
    </Box>
  )
}