import { useSelector } from "react-redux"
import { Navigate, redirect, Route, RouteProps, useNavigate } from "react-router-dom"
import { useAppSelector } from "../store/store"

export default function PrivateRoute(props: RouteProps): React.ReactElement | null {
  const user = useAppSelector((state) => state.login)
  const navigate = useNavigate()

  return user.term ? <Route {...props} /> : user.userID ? <Navigate to="/profile" /> : <Navigate to="/login" />
}
