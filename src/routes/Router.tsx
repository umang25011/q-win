import React, { useEffect } from "react"
import { BrowserRouter, Navigate, redirect, Route, Routes, useNavigate } from "react-router-dom"
import { LOCAL_STORAGE } from "../config/localStorage"
import PrivateRoute from "../config/PrivateRoute"
import EventsList from "../layouts/eventsList/EventsList"
import Login from "../layouts/login/Login"
import ManageEvents from "../layouts/manageEvent/ManageEvents"
import Profile from "../layouts/profile/Profile"
import { useAppDispatch, useAppSelector } from "../store/store"
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
  useEffect(() => {
    const user = LOCAL_STORAGE.getUser()
    if (user === null || !user.email) {
      if (window.location.pathname !== "/login") window.location.href = "/login"
    } else if (!user.studentID) {
      if (window.location.pathname !== "/profile") window.location.href = "/profile"
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/events" element={<EventsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<ManageEvents />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
