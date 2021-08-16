import { Switch, Route } from 'react-router-dom'

import ProductList from './List'
import ProductDetail from './Detail'

function ProductRoutes(props) {
  return (
    <Switch>
      <Route path="/products/:id" exact component={ProductDetail} />
      <Route path="/products" exact component={ProductList} />
    </Switch>
  )
}

export default ProductRoutes
