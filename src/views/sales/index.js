import { Switch, Route } from 'react-router-dom'

import List from './List'

function routes(props) {
  return (
    <Switch>
      <Route path="/sales" exact component={List} />
    </Switch>
  )
}

export default routes
