import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

//components
import About from "./components/About.jsx"
import Main from './components/Home.jsx'
import ExploreSnap from "./components/ExploreSnap/ExploreSnap.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Main/>} />
      <Route path="about" element={<About/>} />
      <Route path="explore" element={<ExploreSnap/>} />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
