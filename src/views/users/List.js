import { useState } from "react"
import {
  Button,
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  useToast,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { mutate } from 'swr'
import qs from "query-string"
import { 
  Breadcrumb, 
  Card, 
  Loading,
  Pagination,
  useDebounce,
  AlertDialog,
  SearchInput,
  useModalState,
} from "../../components/Common"
import { useUsers, deleteUser } from "./Api"
import { useAuth } from "../../context/AppContext"

export default function List() {
  const { user } = useAuth()
  const toast = useToast()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const q = useDebounce(search, 600)
  const params = { page, q }
  const [data, error] = useUsers(user, params)

  const [isOpen, toggle, selected] = useModalState(false)

  const handleDelete = async () => {
    await deleteUser(selected.id, user.accessToken)
    .then((res) => {
      toast({
        title: res.status,
        description: "item dihapus",
        status: "success",
        position: "top-right",
        duration: 4000, 
        isClosable: true
      })
      mutate([`/users?${qs.stringify(params)}`, user.accessToken])
    })
    .catch((err) => {
      toast({
        title: err.status,
        description: err.message,
        status: "error",
        position: "top-right",
        duration: 4000, 
        isClosable: true
      })
    })
  }

  if(error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    )
  }

  return (
    <>
      <Breadcrumb main={["/users", "pengguna"]}/>
      <Card>
        <Button as={Link} to="/users/create" size="md" mb="3">
          tambah
        </Button>
        <SearchInput setter={[search, setSearch]}/>
        {data ? (
          <>
          <Table variant="simple" mt="2" mb="4">
            <Thead>
              <Tr>
                <Th>nama</Th>
                <Th>email</Th>
                <Th>role</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.users.map((auser) => auser.id !== user.id && (
                <Tr key={auser.id}>
                  <Td>{auser.name}</Td>
                  <Td>{auser.email}</Td>
                  <Td>{auser.role}</Td>
                  <Td isNumeric>
                    <Menu>
                      <MenuButton as={Button}>
                        <FontAwesomeIcon icon="ellipsis-v"/>
                      </MenuButton>
                      <MenuList>
                        <MenuItem as={Link} to={`/users/${auser.id}/edit`}>ubah</MenuItem>
                        <MenuItem 
                          onClick={() => {
                            toggle(auser)
                          }}
                        >
                          hapus
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Pagination page={page} setPage={setPage} totalPages={data.meta.totalPages}/>
          </>
        ) : (
          <Loading/>
        )}
      </Card>
      <AlertDialog 
        isOpen={isOpen} 
        onClose={handleDelete} 
        toggle={() => toggle()}
      />
    </>
  )
}