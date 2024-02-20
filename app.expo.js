import App from './src/app'
import React from 'react'
import { registerRootComponent } from 'expo'

function ExpoApp() {
  return <App />
}

registerRootComponent(ExpoApp)
export default ExpoApp
