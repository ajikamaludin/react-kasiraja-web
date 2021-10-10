import { Switch, Route } from 'react-router-dom'

import Detail from "./Detail"
import Create from "./Create"
import List from "./List"

function routes(props) {
  return (
    <Switch>
      <Route path="/purchases/:id/detail" exact component={Detail} />
      <Route path="/purchases/create" exact component={Create} />
      <Route path="/purchases" exact component={List} />
    </Switch>
  )
}

export default routes
