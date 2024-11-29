import { formatDate as vendorFormatter, parseDate as vendorParser } from '@ovhcloud/ods-components'

function formatDate(date: Date, format: string) {
  if (typeof date === 'string') {
    return date
  }
  return vendorFormatter(date, format)
}

function parseDate(str: string, format: string) {
  return new Date(vendorParser(str, format) || 0)
}

export {
  formatDate,
  parseDate,
}
