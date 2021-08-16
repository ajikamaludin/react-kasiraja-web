import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  Heading,
  Flex,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navs } from '../../_nav'


const MenuItem = ({ name, icon, onClick }) => {
  return (
    <Box bg="red" onClick={onClick} p="3.5" mx="3.5" _hover={{ bg: "red.600" }} color="white" rounded="lg">
      <Flex direction="row">
        <FontAwesomeIcon icon={icon} style={{ margin: "2" }}/>
        <Box flex="1" mx="1">
          {name}
        </Box>
      </Flex>
    </Box>
  )
}

const SidebarContent = ({ onClick, variant }) => (
  <VStack>
    {variant === 'sidebar' && (
      <Heading
        as="h3"
        size="lg"
        mx="3.5"
        my="6"
      >kasirAja</Heading>
    )}
    {navs.map(nav => (
      <Link to={nav.to} style={{width: "100%"}} key={nav.name}>
        <MenuItem name={nav.name} icon={nav.icon} onClick={onClick}/>
      </Link>
    ))}
  </VStack>
)

const Sidebar = ({ isOpen, variant, onClose }) => {
  return variant === 'sidebar' ? (
    <Box
      position="fixed"
      left={0}
      w="200px"
      top={0}
      h="100%"
      bg="white"
      shadow="md"
    >
      <SidebarContent onClick={onClose} variant={variant}/>
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>kasirAja</DrawerHeader>
          <DrawerBody>
            <SidebarContent onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default Sidebar
