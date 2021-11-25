import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App = (): JSX.Element => {
  return (
    <div>
      <h1>Hello.</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
