import { OdsIcon } from '@ovhcloud/ods-components/react'
import { Link } from 'app/components/link/Link'
import { SIDE_MENU_ITEMS } from 'app/constants/navigation'
import styles from './sideMenu.module.scss'

const SideMenu = () => {
  return (
    <ul className={ styles['side-menu'] }>
      {
        SIDE_MENU_ITEMS.map((item, idx) => (
          <li className={ styles['side-menu__item'] }
              key={ idx }>
            <OdsIcon name={ item.icon } />

            <Link label={ item.label }
                  route={ item.route } />
          </li>
        ))
      }
    </ul>
  )
}

export { SideMenu }
