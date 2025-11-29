import { Navigate, Route, Routes } from 'react-router'
import LoginPage from '@/pages/LoginPage/LoginPage.jsx'
import PostListPage from '@/pages/PostListPage/PostListPage.jsx'
import RegisterPage from '@/pages/RegisterPage/RegisterPage.jsx'
import PasswordEditPage from '@/pages/PasswordEditPage/PasswordEditPage.jsx'
import PostPage from '@/pages/PostPage/PostPage.jsx'
import PostCreatePage from '@/pages/PostCreatePage/PostCreatePage.jsx'
import PostEditPage from '@/pages/PostEditPage/PostEditPage.jsx'
import AccountEditPage from '@/pages/AccountEditPage/AccountEditPage.jsx'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.jsx'
import FormLayout from '@/layout/FormLayout/FormLayout.jsx'
import AuthLayout from '@/layout/AuthLayout/AuthLayout.jsx'
import MainLayout from '@/layout/MainLayout/MainLayout.jsx'
import PostLayout from '@/layout/PostLayout/PostLayout.jsx'
import ProtectedRoute from '@/routes/protect/ProtectedRoute.jsx'
import { useAuthStore } from '@/stores/authStore.js'
import { useEffect } from 'react'
import { getMyAccount } from '@/api/user.js'

function App() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const resetUser = useAuthStore((state) => state.resetUser)
  const loading = useAuthStore((state) => state.loading)
  const setLoading = useAuthStore((state) => state.setLoading)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await getMyAccount()
        setUser(response)
      } catch (errCode) {
        resetUser()
      } finally {
        setLoading(false)
      }
    }

    if (!user) {
      checkLogin()
      return
    }

    setLoading(false)
  }, [user, setUser])

  if (loading) {
    return
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/post' replace />} />

        <Route element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path='my'>
              <Route path='edit' element={<FormLayout />}>
                <Route path='account' element={<AccountEditPage />} />
                <Route path='password' element={<PasswordEditPage />} />
              </Route>
            </Route>
          </Route>

          <Route path='post'>
            <Route element={<PostLayout />}>
              <Route index element={<PostListPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path=':postId' element={<PostPage />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<FormLayout />}>
                <Route path='create' element={<PostCreatePage />} />
                <Route path='edit' element={<PostEditPage />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
