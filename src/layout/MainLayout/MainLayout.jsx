import { checkLoginUser } from '@/api/user.js'
import Header from '@/components/header/Header.jsx'
import { useAuthStore } from '@/stores/authStore.js'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

function MainLayout() {
  const userId = useAuthStore((state) => state.userId)
  const setUserId = useAuthStore((state) => state.setUserId)
  const resetUser = useAuthStore((state) => state.resetUser)
  const loading = useAuthStore((state) => state.loading)
  const setLoading = useAuthStore((state) => state.setLoading)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await checkLoginUser()
        setUserId(response.userId)
      } catch (errCode) {
        resetUser()
      } finally {
        setLoading(false)
      }
    }

    if (!userId) {
      checkLogin()
      return
    }

    setLoading(false)
  }, [userId])

  if (loading) {
    return
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default MainLayout
