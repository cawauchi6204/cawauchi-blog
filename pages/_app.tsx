import type { AppProps } from 'next/app'
import "tailwindcss/tailwind.css"
import { AnimatePresence } from 'framer-motion'

import Layout from "../components/layout"
import '../styles/globals.css'
import useLoading from '../hooks/useLoading'
import { motion } from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  useLoading()
  return (
    <div>
      <AnimatePresence exitBeforeEnter onExitComplete={() => window.scrollTo(0, 0)}>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </AnimatePresence>
    </div>
  )
}

export default MyApp
