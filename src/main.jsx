import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { MyProvider } from "./context/data/myContext"; // Ensure correct path

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <MyProvider>
        <App />
      </MyProvider>
    </ReduxProvider>
  </React.StrictMode>
);
