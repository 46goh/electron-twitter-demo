import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const { myAPI } = window

const onClick = async (setSources: (sources: string[]) => void) => {
  const targets = [
    'https://www.google.com/logos/doodles/2021/thanksgiving-2021-6753651837109145-2xa.gif',
    'https://lh3.googleusercontent.com/1rZuQB0nilW1Y6fg2cpWsuY6kQ9uWsVnqF4f8K9Yk1nFNgSjWe0xcVBnoQTCOl93AuDRZUfgIkM6lj1fc_WxpOp0JCPEDG4SJq2Ea5o=s660',
  ]
  const localURLs = await Promise.all(
    targets.map(async (target) => {
      const res = await fetch(target)
      const blob = await res.blob()
      const url = (window.URL || window.webkitURL).createObjectURL(blob)
      return url
    })
  )

  setSources(localURLs)

  await myAPI.download(localURLs)
}

const App = (): JSX.Element => {
  const [sources, setSources] = useState<string[]>()
  return (
    <div>
      <h1>downloader</h1>
      <button onClick={() => onClick(setSources)}>download</button>
      {sources && sources.map((source) => <img src={source} key={source} />)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
