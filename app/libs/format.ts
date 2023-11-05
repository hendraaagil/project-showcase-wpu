import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export const toTitleCase = (str: string) =>
  str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')

export const toKebabCase = (str: string) =>
  str
    .replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()

export const toLocalDate = (date: Date) =>
  format(date, 'PPP HH:mmxxx', { locale: id })
