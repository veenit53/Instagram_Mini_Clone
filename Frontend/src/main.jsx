import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import UserContext from "./context/UserContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContext>
        <App />
    </UserContext>
  </BrowserRouter>
);
