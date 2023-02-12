import React from "react"
import { Button, Icon } from "semantic-ui-react"

export default function Login() {
  return (
    <div className="home">
      <div className="home-header">
        <img src="/assets/logo.png" alt="logo" />
        <span>Qwin</span>
      </div>
      <div className="home-intro">Do whatever you want to do</div>
      <Button inverted size="large" onClick={() => {}}>
        Get Started <Icon name="arrow right" />
      </Button>
    </div>
  )
}
