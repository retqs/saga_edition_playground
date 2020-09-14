// useCallback isn't suitable for App component will fire an error
import React from 'react';
import RootRoutes from './Routes';

function App() {
  return <RootRoutes></RootRoutes>;
}

export default App;
