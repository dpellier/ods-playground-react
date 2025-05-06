import { ICON_NAME } from '@ovhcloud/ods-react'

enum ROUTE {
  dashboard = '/dashboard',
  faq = '/faq',
  products = '/products',
  signIn = '/sign-in',
  users = '/users',
}

const SIDE_MENU_ITEM = Object.freeze({
  dashboard: {
    icon: ICON_NAME.grid,
    label: 'Dashboard',
    route: ROUTE.dashboard,
  },
  users: {
    icon: ICON_NAME.user,
    label: 'User Management',
    route: ROUTE.users,
  },
  products: {
    icon: ICON_NAME.list,
    label: 'Product Management',
    route: ROUTE.products,
  },
  faq: {
    icon: ICON_NAME.circleQuestion,
    label: 'FAQ',
    route: ROUTE.faq,
  }
})

const SIDE_MENU_ITEMS = Object.freeze(Object.values(SIDE_MENU_ITEM))

export {
  ROUTE,
  SIDE_MENU_ITEM,
  SIDE_MENU_ITEMS,
}
