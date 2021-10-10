import { Switch, Route } from 'react-router-dom'

import Create from './Create'
import List from './List'
import Edit from './Edit'

function routes(props) {
  return (
    <Switch>
      <Route path="/products/:id/edit" exact component={Edit} />
      <Route path="/products/create" exact component={Create} />
      <Route path="/products" exact component={List} />
    </Switch>
  )
}

export default routes
