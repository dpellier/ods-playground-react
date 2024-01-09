import type { OdsDatagridRow } from '@ovhcloud/ods-components'
import type { ReactElement } from 'react'
import { cloneElement } from 'react'
import { createRoot } from 'react-dom/client'

const roots = new Map()

function reactFormatter(JSX: ReactElement) {
  // TODO fix TS any type on cell
  return function (cellData: string | number | boolean, rowData: OdsDatagridRow, cell: any, onRendered: (callback: () => void) => void) {
    onRendered(() => {
      const cellEl = cell.getElement()

      if (cellEl) {
        const formatterCell = cellEl.querySelector('[data-react-formatter]')

        if (formatterCell) {
          const CompWithMoreProps = cloneElement(JSX, { cellData, rowData })

          let root = roots.get(formatterCell)

          if (!root) {
            root = createRoot(formatterCell);
            roots.set(formatterCell, root);
          }

          root.render(CompWithMoreProps);
        }
      }
    })

    return '<div data-react-formatter></div>';
  }
}

export {
  reactFormatter,
}
