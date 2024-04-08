import React from 'react'
import classes from './LoadingComponent.module.css'
import { Spin } from 'antd'

function LoadingComponent() {
  return (
    <div>
      <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%"
          }} />
    </div>
  )
}

export default LoadingComponent
