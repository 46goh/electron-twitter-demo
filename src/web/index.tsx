import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const { myAPI } = window

const onClick = async () => {
  await myAPI.download()
}

const App = (): JSX.Element => {
  return (
    <div>
      <h1>downloader</h1>
      <button onClick={() => onClick()}>download</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
