import React, { useEffect } from "react"
import { Button, Icon } from "semantic-ui-react"
import { getAuth, getRedirectResult, OAuthProvider, signInWithRedirect } from "firebase/auth"
import { microsoftProvider } from "../../config/IntialiseFirebase"
import { loginWithMicrosoft } from "./loginSlice"
import { useDispatch } from "react-redux"
import { redirect, useNavigate } from "react-router-dom"
import { url } from "inspector"

export default function Login() {
  const auth = getAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const microsoftLogin = () => {
    signInWithRedirect(auth, microsoftProvider)
  }

  useEffect(() => {
    dispatch(loginWithMicrosoft())
  }, [])

  return (
    <div className="home">
      <div className="logo">
        <img src={require("../../assets/logo.png")} alt="University of Windsor" />
      </div>
      {/* <div className="home-qwin-logo">
        <img src={require("../../assets/qwin-logo.jpg")} alt="Qwin Logo" />
      </div> */}
      <div className="home-intro">
        Note <br /> Use Your University Microsoft Account To Login <br /> Please Allow Location Permission
      </div>
      <Button inverted size="large" onClick={microsoftLogin}>
        Login <Icon name="arrow right" />
      </Button>
    </div>
  )
}
