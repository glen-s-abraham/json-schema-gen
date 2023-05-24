import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";

const rootElem = document.getElementById("root");
const root = ReactDom.createRoot(rootElem);
root.render(<App/>)
