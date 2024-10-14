import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.jsx";
import { AssetsProvider } from "./Helper/context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AssetsProvider>
      <App />
      <Toaster />
    </AssetsProvider>
  </BrowserRouter>
);
