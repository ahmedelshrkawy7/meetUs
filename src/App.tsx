import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Home />,
  },
]);

function Layout() {
  return (
    <div>
      <Sidebar />

      <div>
        <Nav />

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
