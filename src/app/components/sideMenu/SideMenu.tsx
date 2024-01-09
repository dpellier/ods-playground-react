import { ODS_THEME_COLOR_INTENT } from '@ovhcloud/ods-common-theming'
import { ODS_ICON_SIZE, ODS_TEXT_COLOR_INTENT, ODS_TEXT_LEVEL, ODS_TEXT_SIZE } from '@ovhcloud/ods-components'
import { OsdsIcon, OsdsText } from '@ovhcloud/ods-components/react'
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
            <Link route={ item.route }>
              <OsdsIcon className={ styles['side-menu__item__icon'] }
                        color={ ODS_THEME_COLOR_INTENT.text }
                        name={ item.icon }
                        size={ ODS_ICON_SIZE.xs }
                        slot="start" />

              <OsdsText color={ ODS_TEXT_COLOR_INTENT.text }
                        level={ ODS_TEXT_LEVEL.body }
                        size={ ODS_TEXT_SIZE._500 }>
                { item.label }
              </OsdsText>
            </Link>
          </li>
        ))
      }
    </ul>
  )
}

export { SideMenu }
