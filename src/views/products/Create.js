import {
  Button,
} from "@chakra-ui/react"
import { useState } from "react"
import { Breadcrumb, Card, FormInput, FormInputNumber } from "../../components/Common"

export default function Create() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState(0)
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [category, setCategory] = useState({})

  return (
    <>
      <Breadcrumb main={["/products", "produk", "baru"]}/>
      <Card>
        <FormInput data={['nama', name, setName]}/>
        <FormInput data={['deskripsi', description, setDescription]}/>
        <FormInputNumber data={['harga beli', cost, setCost]} onClick={() => setCost('')}/>
        <FormInputNumber data={['harga jual', price, setPrice]} onClick={() => setPrice('')}/>
        <FormInputNumber data={['stok', stock, setStock]}/>
        <FormInput data={['kategori', category ? category.name : '']} readOnly={true}/>
        <Button mt="4">simpan</Button>
      </Card>
    </>
  )
}