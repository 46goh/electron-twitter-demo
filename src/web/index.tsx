import React from 'react';
import ReactDOM from 'react-dom';
import fs from 'fs';

import './index.css';

const onClick = async (setSrc: (s: string) => void) => {
  const res = await fetch('https://www.google.com/logos/doodles/2021/thanksgiving-2021-6753651837109145-2xa.gif')
  const blob = await res.blob()
  const url = (window.URL || window.webkitURL).createObjectURL(blob)
  setSrc(url);
};

const App = (): JSX.Element => {
  const [src, setSrc] = React.useState('');
  return (
    <div>
      <h1>downloader</h1>
      <input type="file" />
      <img src={src} />
      <button onClick={() => onClick(setSrc)}>download</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
