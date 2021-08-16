import {
  Flex,
  Box,
} from "@chakra-ui/react"

export default function Dashboard() {
  return (
    <Flex direction="column">
      <Flex direction="row" justifyContent="space-between">
        <Box bg="green.400" shadow="lg" minW="sm" minH="sm">
          Something
        </Box>
        <Box bg="green.400">
          Something
        </Box>
      </Flex>
      <div>
        Dashboard
      </div>
    </Flex>
  )
}