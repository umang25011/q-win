import React, { useEffect } from "react"
import Router from "./routes/Router"
import "./App.css"
import { Provider } from "react-redux"
import { store, useAppDispatch } from "./store/store"
import ReduxToastr from "react-redux-toastr"

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ReduxToastr
          timeOut={3}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          // @ts-ignore
          getState={(state) => state.toastr} // This is the default
          transitionIn="bounceInDown"
          transitionOut="bounceOutUp"
          progressBar
          closeOnToastrClick={true}
          removeOnHover={true}
        />
        <Router />
      </Provider>
    </div>
  )
}

export default App
