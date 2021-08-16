import { 
  Button,
  Flex,
  Box,
  useToast
} from "@chakra-ui/react"

export default function Dashboard() {
  const toast = useToast()
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
      <Button
        onClick={() =>
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "bottom-right",
          })
        }
      >
        Show Toast
      </Button>
    </Flex>
  )
}