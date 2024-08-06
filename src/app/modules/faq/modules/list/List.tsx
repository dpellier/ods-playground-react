import { OdsAccordion } from '@ovhcloud/ods-components/react'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import styles from './list.module.scss'

const List = () => {
  return (
    <div className={ styles.list }>
      <PageTitle label="Playground FAQ" />

      <div className={ styles['list__content'] }>
        <OdsAccordion className={ styles['list__content__item'] }>
          <span className={ styles['list__content__item__title'] }
                   slot="summary">
            How do I create a new user?
          </span>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </OdsAccordion>

        <OdsAccordion className={ styles['list__content__item'] }>
          <span className={ styles['list__content__item__title'] }
                slot="summary">
            Why is my product not in the list?
          </span>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </OdsAccordion>

        <OdsAccordion className={ styles['list__content__item'] }>
          <span className={ styles['list__content__item__title'] }
                slot="summary">
            Why are all the answers Lorem ipsum?
          </span>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </OdsAccordion>
      </div>
    </div>
  )
}

export { List }
export default List
