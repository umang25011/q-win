import React, { useEffect } from "react"
import { BrowserRouter, Navigate, redirect, Route, Routes, useNavigate } from "react-router-dom"
import PrivateRoute from "../config/PrivateRoute"
import EventsList from "../layouts/eventsList/EventsList"
import Login from "../layouts/login/Login"
import Profile from "../layouts/profile/Profile"
import { useAppSelector } from "../store/store"
// import Dashboard from "../components/dashboard/Dashboard";
// import NotProtectedRoute from "./NotProtectedRoute";
// import EventDetail from "../components/event/EventDetail";
// import User from "../components/user/User";
// import ProtectedRoute from "./ProtectedRoute";
// import People from "../components/people/People";
// import CreateEditEvent from "../components/event/CreateEditEvent";
// import Settings from "../components/settings/Settings";
// import Authenticate from "../components/auth/Authenticate";

const Router = () => {
  const commonData = useAppSelector((state) => state.commonData)

  useEffect(() => {
    // if (!commonData.userLoggedIn) {
    //   if (window.location.pathname !== "/login") window.location.href = "/login"
    // } else if (!commonData.userProfileComplete) {
    //   if (window.location.pathname !== "/profile") window.location.href = "/profile"
    // }
  }, [commonData])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
