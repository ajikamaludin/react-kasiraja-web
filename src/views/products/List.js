import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function List() {
  return (
    <Box bg="red.600" w="max" h="max">
      <Link to="/products/detail">
        Halo
      </Link>
    </Box>
  )
}