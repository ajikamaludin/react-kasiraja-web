import { useEffect, useState, Suspense } from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import { 
  Container, 
  Flex,
  Box,
  useBreakpointValue,
  Link
} from "@chakra-ui/react";

import Sidebar from "../components/Layout/Sidebar"
import Header from "../components/Layout/Header"

import routes from './_routeDashboard'
import NotFound from "../views/errors/404";
import { useAuth } from "../context/AppContext";
import Loading from "../components/Common/Loading";

const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

export default function DashboardLayout(props) {
  const { loading, isLoggedIn, logout, user } = useAuth()
  
  const { history } = props;

  const handleLogout = e => {
    e.preventDefault()
    logout()
    history.push('/login')
  }

  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)
  
  useEffect(() => {
    const { history } = props;
    if(!isLoggedIn()){
      history.push('/login');
    }
  })

  if(loading) {
    return <Loading/>
  }

  return (
    <Flex flexShrink>
      <Sidebar
        isOpen={isSidebarOpen}
        variant={variants?.navigation}
        onClose={toggleSidebar}
      />
      <Box ml={!variants?.navigationButton && 200} flex="1">
        <Header
          showSidebarButton={variants?.navigationButton}
          onShowSidebar={toggleSidebar}
          onLogout={handleLogout}
          user={user}
        />
        <Container
          maxW={{ base: '80rem', xl: '110rem' }}
          py="10"
          bg="gray.100"
          minH={{ base: '38rem', sm: '40rem', xl: '53.5rem' }}
        >
          {/* Content */}
          <Suspense fallback={<Loading />}>
            <Switch>
              {routes.map((route, index) => {
                return route.component ? (
                  <Route
                    name={route.name}
                    path={route.path}
                    exact={route.exact}
                    render={(props) => <route.component {...props} />}
                    key={index}
                  />
                ) : null;
              })}
              <Redirect from="/" exact={true} to="/dashboard" />
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </Container>
        <Box
          bg="red"
          minH="1"
          maxW={{ base: '90rem', xl: '110rem' }}
          p="4"
          color="white"
        >
          <Link href="https://github.com/ajikamaludin/" target="_blank">
            &copy; {new Date().getFullYear()} kasirAja dev
          </Link>
        </Box>
      </Box>
    </Flex>
  );
}