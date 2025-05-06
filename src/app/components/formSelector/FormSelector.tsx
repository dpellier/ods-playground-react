import type { TabsChangeEvent } from '@ovhcloud/ods-react'
import type { FC } from 'react'
import type { InferProps } from 'prop-types'
import { Tab, Tabs, TabList } from '@ovhcloud/ods-react'
import PropTypes from 'prop-types'
import { useState } from 'react'

enum FORM_SELECTOR_TAB {
  formik = 'formik',
  hookForm = 'hook-form',
  native = 'native',
  tanstackForm = 'tanstack-form',
}

const propTypes = {
  children: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
}

const FormSelector: FC<InferProps<typeof propTypes>> = ({ children, isDisabled }) => {
  const [currentTab, setCurrentTab] = useState<string>(FORM_SELECTOR_TAB.native)

  function onTabChange(event: TabsChangeEvent) {
    setCurrentTab(event.value)
  }

  return (
    <>
      <Tabs defaultValue={ currentTab }
            onChange={ onTabChange }>
        <TabList>
          <Tab disabled={ isDisabled }
               value={ FORM_SELECTOR_TAB.native }>
            Using native form
          </Tab>

          <Tab disabled={ isDisabled }
               value={ FORM_SELECTOR_TAB.formik }>
            Using Formik + yup
          </Tab>

          <Tab disabled={ isDisabled }
               value={ FORM_SELECTOR_TAB.hookForm }>
            Using react-hook-form + zod
          </Tab>

          <Tab disabled={ isDisabled }
               value={ FORM_SELECTOR_TAB.tanstackForm }>
            Using tanstack-form + zod
          </Tab>
        </TabList>
      </Tabs>

      { children(currentTab) }
    </>
  )
}

FormSelector.propTypes = propTypes

export {
  FORM_SELECTOR_TAB,
  FormSelector,
}
