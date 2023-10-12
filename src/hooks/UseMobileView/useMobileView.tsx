'use client'
import { useState, useEffect } from 'react'
// Debounce a function to improve performance by delaying its execution
export const debounce = (func: () => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(func, delay)
  }
}

// Custom hook to handle window resize, determine if it's a mobile view, and manage body overflow
export function useMobileView() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Debounce the window resize event
    const debouncedHandleResize = debounce(handleResize, 200)

    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  // useEffect(() => {
  //   if (isMobile) {
  //     document.body.style.overflow = 'hidden'
  //   } else {
  //     document.body.style.overflow = 'auto'
  //   }

  //   return () => {
  //     document.body.style.overflow = 'auto'
  //   }
  // }, [isMobile])

  return isMobile
}
