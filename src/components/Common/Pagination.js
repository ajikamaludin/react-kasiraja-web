import { HStack, Box } from "@chakra-ui/layout"
export function usePaginate() {}
export function Pagination() {
  return (
    <HStack spacing="2" mt="3" justifyContent="flex-end">
      <Box px="3" py="1" bg="red.200" outlineColor="red.700" rounded="3xl" color="white" _hover={{ bg: "red:700" }}>
        {"<"}
      </Box>
      <Box px="3" py="1" bg="red.500" outlineColor="red.700" rounded="3xl" color="white" _hover={{ bg: "red:700" }}>
        1
      </Box>
      <Box px="3" py="1" bg="red.500" outlineColor="red.700" rounded="3xl" color="white" _hover={{ bg: "red:700" }}>
        &gt;
      </Box>
    </HStack>
  )
}