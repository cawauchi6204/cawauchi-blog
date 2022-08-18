import { useAtom } from 'jotai'
import { loadingAtom } from '../libs/atoms'
import { useRouter } from "next/router"
import { useEffect } from 'react'

const useLoading = () => {
  const router = useRouter()
  const [, setLoading] = useAtom(loadingAtom)

  const handleStart = (url: string) => {
    if (url !== router.pathname) {
      console.log('trueだよ')
      setLoading(true)
    }
  }
  const handleComplete = (url: string) => {
    if (url !== router.pathname) {
      console.log('trueじゃないよ')
      setLoading(false)
    }
  }
  useEffect(() => {
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [])
}

export default useLoading
