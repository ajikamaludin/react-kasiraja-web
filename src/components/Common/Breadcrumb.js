import { Box, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({ main: [link, menu, submenu]}) {
  return (
    <Box p="3" m="2" bg="white" rounded="lg">
      <Heading size="md">
        <Link to="/dashboard">
          dashboard {' '}
        </Link>
        <Link to={link}>
          / {menu} {' '}
        </Link>
        {submenu && ` / ${submenu}`}
      </Heading>
    </Box>
  )
}