import { useEffect, useRef } from 'react'

const useInfiniteScroll = (callback) => {
  const pageNoRef = useRef(1)
  const hasNextPage = useRef(false)
  const targetRef = useRef(null)

  useEffect(() => {
    if (!targetRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage.current) {
          callback()
        }
      },
      {
        threshold: 1.0,
      },
    )

    observer.observe(targetRef.current)

    return () => observer.disconnect()
  }, [targetRef.current])

  const updateHasNextPage = (page) => {
    hasNextPage.current = page.number < page.totalPages
  }

  return { targetRef, pageNoRef, updateHasNextPage }
}

export default useInfiniteScroll
