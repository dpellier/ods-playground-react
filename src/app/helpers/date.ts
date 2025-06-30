import { format as vendorFormatter, parse as vendorParser } from 'date-fns'

function formatDate(date: Date, format: string) {
  if (typeof date === 'string') {
    return date
  }
  return vendorFormatter(date, format)
}

function parseDate(str: string, format: string) {
  return new Date(vendorParser(str, format, new Date()) || 0)
}

export {
  formatDate,
  parseDate,
}
