import { format, parse } from 'date-fns'

export const toDateString = (timestamp, { showTime } = { showTime: false }) => {
  if (!timestamp) return ''
  return showTime ? format(timestamp, 'yyyy MMM d, p') : format(timestamp, 'yyyy MMM d')
}

export const fromDateString = (dateString) => {
  if (!dateString) return null
  return parse('yyyy MMM d', dateString)
}

export const dateStringForReports = (timestamp) => {
  if (!timestamp) return ''
  return format(timestamp, 'yyyy MM dd')
}

export const dateStringForReportsTitle = (timestamp) => {
  if (!timestamp) return ''
  return format(timestamp, 'yyyy.MM.dd')
}

export const getTodaysDateFileName = () => new Date().toISOString().split('T')[0]
