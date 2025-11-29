import { useEffect, useRef } from 'react'

const useInfiniteScroll = ({ onIntersect, hasNextPage }) => {
  const target = useRef(null)

  useEffect(() => {
    if (!hasNextPage || !target.current) {
      return
    }

    const observer = new IntersectionObserver(
      async ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          await onIntersect(entry, observerInstance)
        }
      },
      {
        threshold: 1.0,
      },
    )

    observer.observe(target.current)

    return () => observer.disconnect()
  }, [hasNextPage, onIntersect])

  return { target }
}

export default useInfiniteScroll
