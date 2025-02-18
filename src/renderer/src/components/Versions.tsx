import { useState } from 'react'
import { Button } from './ui/button'

function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)

  return (
    <ul className="versions flex bg-slate-600">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
      <Button></Button>
    </ul>
  )
}

export default Versions
