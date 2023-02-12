import React from 'react';
import Router from "./routes/Router";
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Router/>
      </Provider>
    </div>
  );
}

export default App;
