import { HStack, Box } from "@chakra-ui/layout"

export function usePaginate() {}
  function StyledBox(props) {
    return (
        <Box 
          px="3" 
          py="1" 
          outlineColor="red.700"
          rounded="3xl"
          color="white"
          {...props}
        >
          {props.children}
        </Box>
    )
}

export function Pagination(props) {
  const { page = 1, setPage, totalPages = 1, ...restProps} = props
  return (
    <HStack spacing="2" mt="3" justifyContent="flex-end" {...restProps}>
      <StyledBox 
        bg={page === 1 ? "red.200" : "red.500"} 
        onClick={() => setPage(+page - 1 <= 0 ? 1 : +page - 1)}
      >
        {"<"}
      </StyledBox>
      <StyledBox 
        bg={page === (+totalPages > 0 ? +totalPages : 1) ? "red.200" : "red.500"} 
        onClick={() => setPage(+page + 1 >= +totalPages ? +totalPages : +page + 1)}
      >
        &gt;
      </StyledBox>
    </HStack>
  )
}