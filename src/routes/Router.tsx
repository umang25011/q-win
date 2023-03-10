import React, { useEffect } from "react"
import { BrowserRouter, Navigate, redirect, Route, Routes, useNavigate } from "react-router-dom"
import { LOCAL_STORAGE } from "../config/localStorage"
import PrivateRoute from "../config/PrivateRoute"
import EventsList from "../layouts/eventsList/EventsList"
import Login from "../layouts/login/Login"
import ManageEvents from "../layouts/manageEvent/ManageEvents"
import Profile from "../layouts/profile/Profile"
import { useAppDispatch, useAppSelector } from "../store/store"
import { getUser } from "../layouts/login/loginSlice"
import Verification from "../layouts/verification/Verification"
import QrScan from "../layouts/verification/QRScanner"
import Header from "../layouts/header/Header"
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
  const dispatch = useAppDispatch()
  getUser
  useEffect(() => {
    const user = LOCAL_STORAGE.getUser()
    dispatch(getUser())
    if (user === null || !user.email) {
      if (window.location.pathname !== "/login") window.location.href = "/login"
    } else if (!user.studentID) {
      if (window.location.pathname !== "/profile") window.location.href = "/profile"
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/" element={<EventsList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<ManageEvents />} />
        <Route path="/start-verification" element={<Verification />} />
        <Route path="/qr-scanner" element={<QrScan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
