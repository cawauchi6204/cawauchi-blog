import { createClient } from 'microcms-js-sdk'

export const aboutClient = createClient({
  serviceDomain: process.env.ABOUT_SERVICE_DOMAIN,
  apiKey: process.env.ABOUT_API_KEY,
})
