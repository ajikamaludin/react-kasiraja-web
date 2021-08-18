import { Switch, Route } from 'react-router-dom'

import Create from './Create'
import List from './List'
import Detail from './Detail'

function routes(props) {
  return (
    <Switch>
      <Route path="/products/create" exact component={Create} />
      <Route path="/products" exact component={List} />
      <Route path="/products/:id" exact component={Detail} />
    </Switch>
  )
}

export default routes
