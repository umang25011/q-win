import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../layouts/login/Login"
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route exact path="/authenticate" component={Authenticate} />
         <NotProtectedRoute exact path="/dashboard" component={Dashboard} />
         <NotProtectedRoute exact path="/event/:id" component={EventDetail} />
         <ProtectedRoute exact path="/user/:id" component={User} />
         <ProtectedRoute exact path="/people/:id" component={People} />
         <ProtectedRoute exact path="/createEvent" component={CreateEditEvent} />
         <ProtectedRoute exact path="/editEvent/:id" component={CreateEditEvent} />
         <ProtectedRoute path="/settings" component={Settings} />
         <Route path="*" render={() => <Redirect to="/" />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
