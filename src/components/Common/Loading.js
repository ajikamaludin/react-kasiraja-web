import { Flex } from '@chakra-ui/react'
import { CircularProgress } from "@chakra-ui/progress"

export default function Loading() {
  return (
    <Flex justifyContent="center" alignItems="center" mt="24" mb="24">
      <CircularProgress isIndeterminate color="red.500" />
    </Flex>
  )
}