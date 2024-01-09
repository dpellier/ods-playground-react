import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { ROUTE } from 'app/constants/navigation'

const List = lazy(() => import('app/modules/users/modules/list/List'))
const View = lazy(() => import('app/modules/users/modules/view/View'))

const Users = () => {
  return (
    <Suspense fallback={ <LoadingMask /> }>
      <Routes>
        <Route path={ `${ROUTE.users}/:id` } element={ <View /> } />
        <Route index element={ <List /> } />
        <Route path="*" element={ <Navigate to={ ROUTE.users } replace /> } />
      </Routes>
    </Suspense>
  )
}

export { Users }
export default Users
