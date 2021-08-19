import { Switch, Route } from 'react-router-dom'

import Create from './Create'
import Edit from './Edit'
import List from './List'


function routes(props) {
  return (
    <Switch>
      <Route path="/customers/:id/edit" exect component={Edit} />
      <Route path="/customers/create" exact component={Create} />
      <Route path="/customers" exact component={List} />
    </Switch>
  )
}

export default routes
