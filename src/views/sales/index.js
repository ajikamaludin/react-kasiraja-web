import { Switch, Route } from 'react-router-dom'

import Detail from "./Detail"
import Create from "./Create"
import List from "./List"

function routes(props) {
  return (
    <Switch>
      <Route path="/sales/:id/detail" exact component={Detail} />
      <Route path="/sales/create" exact component={Create} />
      <Route path="/sales" exact component={List} />
    </Switch>
  )
}

export default routes
