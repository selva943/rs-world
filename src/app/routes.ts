import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Rental } from "./pages/Rental";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "rental", Component: Rental },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
]);
