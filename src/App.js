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
import { SWRConfig } from "swr";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "@fontsource/raleway/400.css"
import "@fontsource/open-sans/700.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AppProvider } from "./context/AppContext"
import ErrorBoundary from "./context/ErrorBoundary";
import NotFound from "./views/errors/404"

import Loading from "./components/Common/Loading"
import AppCrash from "./views/errors/500";

const Login = React.lazy(() => import('./views/auth/Login'))
const Register = React.lazy(() => import('./views/auth/Register'))
const Dashboard = React.lazy(() => import('./layouts/Dashboard'))

// font awesome
library.add(fas)

// chakra ui custom theme
const customTheme = extendTheme(withDefaultColorScheme(
  { 
    colorScheme: "red",
    fonts: {
      heading: "Inter, Open Sans",
      body: "Inter, Raleway",
    },
  }
  ))

// config fatcher for swr with axios
const fetcher = (url, token) => axios({
  method: "GET",
  url: url,
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(res => { 
  return res.data.data
})
class App extends React.Component {
  
  render() {
    return (
      // handle global value
      <AppProvider> 
        {/* handle useSwr to fetch api */}
        <SWRConfig 
          value={{
            refreshInterval: 60000,
            fetcher
          }}
        >
          {/* react router dom  */}
          <BrowserRouter>
            {/* handle chakra ui */}
            <ChakraProvider theme={customTheme}>
              {/* handle app crash */}
              <ErrorBoundary>
                <React.Suspense fallback={<Loading/>}>
                  <Switch>
                    <Route path="/login" exect={true} render={(props) => <Login {...props} />}/>
                    <Route path="/register" exect={true} render={(props) => <Register {...props} />}/>
                    <Route path="/error" exect={true} render={(props) => <AppCrash {...props} />}/>
                    <Route path="/" render={(props) => <Dashboard {...props} />}/>
                    <Route path="*" render={(props) => <NotFound/>}/>
                  </Switch>
                </React.Suspense>
              </ErrorBoundary>
            </ChakraProvider>
          </BrowserRouter>
        </SWRConfig>
      </AppProvider>
    );
  }
}

export default App;
