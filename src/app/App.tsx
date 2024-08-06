import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Header } from 'app/components/header/Header'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { SideMenu } from 'app/components/sideMenu/SideMenu'
import { Toaster } from 'app/components/toaster/Toaster'
import { ROUTE } from 'app/constants/navigation'
import { useAuth } from 'app/hooks/useAuth'
import styles from './app.module.scss'

const Dashboard = lazy(() => import('app/modules/dashboard/Dashboard'))
const Faq = lazy(() => import('app/modules/faq/Faq'))
const Products = lazy(() => import('app/modules/products/Products'))
const SignIn = lazy(() => import('app/modules/signIn/SignIn'))
const Users = lazy(() => import('app/modules/users/Users'))

const App = () => {
  const authContext = useAuth()

  function onSignOut() {
    authContext?.signOut()
  }

  return (
    <div className={ styles.app }>
      <Toaster />

      {
        !authContext?.isLogged &&
        <Suspense fallback={ <LoadingMask /> }>
          <Routes>
            <Route path={ `${ROUTE.signIn}/*` } element={ <SignIn /> } />
            <Route path="*" element={ <Navigate to={ ROUTE.signIn } replace /> } />
          </Routes>
        </Suspense>
      }

      {
        authContext?.isLogged &&
        <>
          <Header className={ styles['app__header'] }
                  onSignOut={ onSignOut } />

          <div className={ styles['app__body'] }>
            <SideMenu />

            <div className={ styles['app__body__content'] }>
              <Suspense fallback={ <LoadingMask /> }>
                <Routes>
                  <Route path={ `${ROUTE.dashboard}/*` } element={ <Dashboard /> } />
                  <Route path={ `${ROUTE.faq}/*` } element={ <Faq /> } />
                  <Route path={ `${ROUTE.products}/*` } element={ <Products /> } />
                  <Route path={ `${ROUTE.users}/*` } element={ <Users /> } />
                  <Route path="*" element={ <Navigate to={ ROUTE.dashboard } replace /> } />
                </Routes>
              </Suspense>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
