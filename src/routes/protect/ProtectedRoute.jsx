import { getLoginRequiredMessage } from '@/api/error.js'
import { ROUTES } from '@/routes/routes.js'
import { useAuthStore } from '@/stores/authStore.js'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user)
  const loading = useAuthStore((state) => state.loading)

  if (loading) {
    return
  }

  if (!user) {
    alert(getLoginRequiredMessage())
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
