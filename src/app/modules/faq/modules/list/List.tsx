import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ovhcloud/ods-react'
import { PageTitle } from 'app/components/pageTitle/PageTitle'
import styles from './list.module.scss'

const List = () => {
  return (
    <div className={ styles.list }>
      <PageTitle label="Playground FAQ" />

      <Accordion>
        <AccordionItem value="0">
          <AccordionTrigger className={ styles['list__item__title'] }>
            How do I create a new user?
          </AccordionTrigger>

          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="1">
          <AccordionTrigger className={ styles['list__item__title'] }>
            Why is my product not in the list?
          </AccordionTrigger>

          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="2">
          <AccordionTrigger className={ styles['list__item__title'] }>
            Why are all the answers Lorem ipsum?
          </AccordionTrigger>

          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export { List }
export default List
