import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "./index.css";
import AOS from "aos";

AOS.init({ once: true, duration: 700 });

const root = createRoot(document.getElementById("root"));
root.render(<App />);
