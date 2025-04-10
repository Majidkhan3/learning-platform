'use client'
import { useRootContext } from '@/context/context/context'
import { useEffect, useRef } from 'react'
import useScroll from './useScroll'

const useActive = (id, isCall = true) => {
  const ref = useRef()
  const { setCurrentActive } = useRootContext()
  const { scroll } = useScroll()

  useEffect(() => {
    if (isCall && ref.current) {
      if (ref.current.offsetTop <= scroll + 100) {
        setCurrentActive(id)
      }
    }
  }, [scroll, setCurrentActive, id, isCall])

  return ref
}

export default useActive
