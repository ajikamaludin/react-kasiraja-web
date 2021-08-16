import React from "react"
import { 
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme
} from "@chakra-ui/react"
import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import "@fontsource/raleway/400.css"
import "@fontsource/open-sans/700.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import NotFound from "./views/errors/404"
import { AppProvider } from "./context/AppContext"

import Loading from "./components/Common/Loading"

const Login = React.lazy(() => import('./views/auth/Login'))
const Register = React.lazy(() => import('./views/auth/Register'))
const Dashboard = React.lazy(() => import('./layouts/Dashboard'))

library.add(fas)
const customTheme = extendTheme(withDefaultColorScheme(
  { 
    colorScheme: "red",
    fonts: {
      heading: "Inter, Open Sans",
      body: "Inter, Raleway",
    },
  }
  ))

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <BrowserRouter>
          <ChakraProvider theme={customTheme}>
              <React.Suspense fallback={<Loading/>}>
                <Switch>
                  <Route path="/login" exect={true} render={(props) => <Login {...props} />}/>
                  <Route path="/register" exect={true} render={(props) => <Register {...props} />}/>
                  <Route path="/" render={(props) => <Dashboard {...props} />}/>
                  <Route path="*" render={(props) => <NotFound/>}/>
                </Switch>
              </React.Suspense>
          </ChakraProvider>
        </BrowserRouter>
      </AppProvider>
    );
  }
}

export default App;
