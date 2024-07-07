import React from 'react'
import ReactDOM from 'react-dom/client'
import { Online, Offline } from 'react-detect-offline'
import { Alert } from 'antd'

import App from './components/App.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <Alert
        type="error"
        message="There is no internet connection"
        description="It looks like you have problems with the network. Check your internet connection."
      />
    </Offline>
  </>
)
