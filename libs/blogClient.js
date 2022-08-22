import { createClient } from 'microcms-js-sdk'

export const blogClient = createClient({
	serviceDomain: process.env.BLOG_SERVICE_DOMAIN,
	apiKey: process.env.BLOG_API_KEY,
})
