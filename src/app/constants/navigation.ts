import { ODS_ICON_NAME } from '@ovhcloud/ods-components'

enum ROUTE {
  dashboard = '/dashboard',
  products = '/products',
  signIn = '/sign-in',
  users = '/users',
}

const SIDE_MENU_ITEM = Object.freeze({
  dashboard: {
    icon: ODS_ICON_NAME.grid,
    label: 'Dashboard',
    route: ROUTE.dashboard,
  },
  users: {
    icon: ODS_ICON_NAME.user,
    label: 'User Management',
    route: ROUTE.users,
  },
  products: {
    icon: ODS_ICON_NAME.list,
    label: 'Product Management',
    route: ROUTE.products,
  }
})

const SIDE_MENU_ITEMS = Object.freeze(Object.values(SIDE_MENU_ITEM))

export {
  ROUTE,
  SIDE_MENU_ITEM,
  SIDE_MENU_ITEMS,
}
