'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST

      if (posthogKey && posthogHost) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: 'identified_only',
          capture_pageview: false,
          loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.debug()
          },
        })
      }
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
