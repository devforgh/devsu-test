import { useEffect, useState } from 'react'
import {
  Table,
  Icon,
  Button,
  Row,
  TextField,
  Avatar
} from '../../components/ui'
import { IoMdInformation } from 'react-icons/io'
import MenuAction from './MenuAction'
import { productService } from '../../services'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/dateUtils'

const header = [
  {
    key: 'logo',
    label: 'Logo',
    render: (value) => {
      return <Avatar src={value} />
    }
  },
  { key: 'name', label: 'Nombre del Producto' },
  {
    key: 'description',
    label: (
      <div>
        Descripción
        <Icon>
          <IoMdInformation />
        </Icon>
      </div>
    )
  },
  {
    key: 'date_release',
    label: (
      <div>
        Fecha de liberación
        <Icon>
          <IoMdInformation />
        </Icon>
      </div>
    ),
    render: (value) => {
      return formatDate(new Date(value))
    }
  },
  {
    key: 'date_revision',
    label: (
      <div>
        Fecha de revisión
        <Icon>
          <IoMdInformation />
        </Icon>
      </div>
    ),
    render: (value) => {
      return formatDate(new Date(value))
    }
  },
  {
    key: 'actions',
    label: '',
    render: (value, id) => {
      return <MenuAction id={id} />
    }
  }
]

const ProductsTable = () => {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search) {
      setFilteredData(data.filter((item) => item.name.includes(search)))
    } else {
      setFilteredData([])
    }
  }, [search])

  useEffect(() => {
    const fecthProducts = async () => {
      let products
      try {
        products = await productService.getProducts()
        setData(products)
      } catch (error) {}
    }
    fecthProducts()
  }, [])

  return (
    <>
      <Row justify='space-between' mb={15}>
        <TextField
          id='search'
          aria-label='search'
          placeholder='Search...'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          $dense
        />
        <Button as={Link} to='/create' color='primary'>
          Agregar
        </Button>
      </Row>
      <Table header={header} data={search ? filteredData : data} />
    </>
  )
}

export default ProductsTable
