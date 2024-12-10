import type { OdsTabsSelectedEvent } from '@ovhcloud/ods-components'
import type { FC } from 'react'
import type { InferProps } from 'prop-types'
import { OdsTab, OdsTabs } from '@ovhcloud/ods-components/react'
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

  function onOdsTabsSelected(event: OdsTabsSelectedEvent) {
    setCurrentTab((event.detail.target as HTMLElement)?.id)
  }

  return (
    <>
      <OdsTabs onOdsTabsSelected={ onOdsTabsSelected }>
        <OdsTab id={ FORM_SELECTOR_TAB.native }
                isDisabled={ isDisabled }
                isSelected={ currentTab === FORM_SELECTOR_TAB.native }>
          Using native form
        </OdsTab>

        <OdsTab id={ FORM_SELECTOR_TAB.formik }
                isDisabled={ isDisabled }
                isSelected={ currentTab === FORM_SELECTOR_TAB.formik }>
          Using Formik + yup
        </OdsTab>

        <OdsTab id={ FORM_SELECTOR_TAB.hookForm }
                isDisabled={ isDisabled }
                isSelected={ currentTab === FORM_SELECTOR_TAB.hookForm }>
          Using react-hook-form + zod
        </OdsTab>

        <OdsTab id={ FORM_SELECTOR_TAB.tanstackForm }
                isDisabled={ isDisabled }
                isSelected={ currentTab === FORM_SELECTOR_TAB.tanstackForm }>
          Using tanstack-form + zod
        </OdsTab>
      </OdsTabs>

      { children(currentTab) }
    </>
  )
}

FormSelector.propTypes = propTypes

export {
  FORM_SELECTOR_TAB,
  FormSelector,
}
