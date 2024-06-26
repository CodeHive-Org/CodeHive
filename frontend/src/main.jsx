import { Buffer } from 'buffer';
window.Buffer = Buffer;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import ContextProvierAllOver from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ContextProvierAllOver>
        <App />
      </ContextProvierAllOver>
    </RecoilRoot>
  </React.StrictMode>,
);
