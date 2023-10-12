'use client'
import React, { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { useMobileView } from '@/hooks/UseMobileView/useMobileView'
import { useAuth } from '@/hooks/AuthProvider/AuthProvider'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const button = useRef(null)
  const router = useRouter()
  const isMobile = useMobileView()
  const { isAuthenticated } = useAuth()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (
        e.target === overlay.current ||
        e.target === wrapper.current ||
        e.target === button.current
      ) {
        if (onDismiss) {
          onDismiss()
        }
      }
    },
    [onDismiss, overlay, wrapper],
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss],
  )

  useEffect(() => {
    if (isAuthenticated) {
      onDismiss()

      setTimeout(() => {
        router.push('/dashboard')
      }, 300)
    }
  }, [isAuthenticated, onDismiss, router])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  const wrapperClass = isMobile
    ? 'absolute z-10 left-0 right-0 top-0 bottom-0 w-full h-screen bg-white'
    : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'

  return (
    <div
      ref={overlay}
      className="absolute z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-gray-600/50"
      onClick={onClick}
    >
      <div ref={wrapper} className={wrapperClass}>
        <button
          ref={button}
          className="absolute top-0 right-2 p-2 text-xl text-gray-500"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  )
}
