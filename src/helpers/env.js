const isProduction = () => process.env.NODE_ENV === 'production'
const isDev = () => process.env.NODE_ENV === 'development'

export const env = {
  isProduction,
  isDev
}
