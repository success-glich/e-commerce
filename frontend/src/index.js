import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./component/layout/ErrorBoundary";
import { loadUser } from "./app/features/userSlice";
const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(loadUser());
root.render(
  <>
    <Provider store={store}>
      <ErrorBoundary fallback={<p>Something went wrong </p>}>
        <App />
      </ErrorBoundary>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Provider>
  </>
);
