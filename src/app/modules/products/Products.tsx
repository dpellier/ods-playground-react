import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Breadcrumb } from 'app/components/breadcrumb/Breadcrumb'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { ROUTE } from 'app/constants/navigation'

const Create = lazy(() => import('app/modules/products/modules/create/Create'))
const Edit = lazy(() => import('app/modules/products/modules/edit/Edit'))
const List = lazy(() => import('app/modules/products/modules/list/List'))
const View = lazy(() => import('app/modules/products/modules/view/View'))

const Products = () => {
  return (
    <>
      <Breadcrumb />

      <Suspense fallback={ <LoadingMask /> }>
        <Routes>
          <Route path="new" element={ <Create /> } />
          <Route path=":id" element={ <View /> } />
          <Route path=":id/edit" element={ <Edit /> } />
          <Route index element={ <List /> } />
          <Route path="*" element={ <Navigate to={ ROUTE.products } replace /> } />
        </Routes>
      </Suspense>
    </>
  )
}

export { Products }
export default Products
