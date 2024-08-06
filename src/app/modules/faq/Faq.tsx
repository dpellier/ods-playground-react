import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoadingMask } from 'app/components/loadingMask/LoadingMask'
import { ROUTE } from 'app/constants/navigation'

const List = lazy(() => import('app/modules/faq/modules/list/List'))

const Faq = () => {
  return (
    <Suspense fallback={ <LoadingMask /> }>
      <Routes>
        <Route index element={ <List /> } />
        <Route path="*" element={ <Navigate to={ ROUTE.faq } replace /> } />
      </Routes>
    </Suspense>
  )
}

export { Faq }
export default Faq
