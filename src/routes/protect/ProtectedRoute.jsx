import { getLoginRequiredMessage } from '@/api/error.js'
import { ROUTES } from '@/routes/routes.js'
import { useAuthStore } from '@/stores/authStore.js'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
  const userId = useAuthStore((state) => state.userId)
  const loading = useAuthStore((state) => state.loading)

  if (loading) {
    return
  }

  if (!userId) {
    alert(getLoginRequiredMessage())
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
