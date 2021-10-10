import { Switch, Route } from 'react-router-dom'

import Dashboard from './Dashboard'

function routes(props) {
  return (
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
    </Switch>
  )
}

export default routes
