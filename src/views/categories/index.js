import { Switch, Route } from 'react-router-dom'

import Create from './Create'
import List from './List'
import Edit from './Edit'

function routes(props) {
  return (
    <Switch>
      <Route path="/categories/:id/edit" exect component={Edit} />
      <Route path="/categories/create" exact component={Create} />
      <Route path="/categories" exact component={List} />
    </Switch>
  )
}

export default routes
