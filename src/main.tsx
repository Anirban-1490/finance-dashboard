import { createRoot } from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "next-themes";
import { Router } from "./modules/router/index.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
    <Router />
  </ThemeProvider>,
);
