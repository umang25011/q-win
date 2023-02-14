import { useSelector } from "react-redux"
import { Navigate, redirect, Route, RouteProps, useNavigate } from "react-router-dom"
import { useAppSelector } from "../store/store"

export default function PrivateRoute(props: RouteProps): React.ReactElement | null {
  const user = useAppSelector((state) => state.login)
  const navigate = useNavigate()

  return user.userID ? <Route {...props} /> : <Route element={<Navigate to="/login" replace />} />
}
