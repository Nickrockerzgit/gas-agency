import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBuiltOn } from "./lib/today";

const root = document.getElementById("root")!;
const built = document.documentElement.dataset.built;
if (built) setBuiltOn(built);

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
