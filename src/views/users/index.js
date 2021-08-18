import { Switch, Route } from 'react-router-dom'

import Create from './Create'
import List from './List'
import Edit from './Edit'

function routes(props) {
  return (
    <Switch>
      <Route path="/users/:id/edit" exect component={Edit} />
      <Route path="/users/create" exact component={Create} />
      <Route path="/users" exact component={List} />
    </Switch>
  )
}

export default routes
