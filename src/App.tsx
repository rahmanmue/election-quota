import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import GoogleCallback from "./pages/Login/GoogleCallback";
import Parpol from "./pages/Parpol/Parpol";
import Dapil from "./pages/Daerah-Pemilihan/Dapil";
import Users from "./pages/Users/Users";
import Profile from "./pages/Profile/Profile";
import DapilHasilSuara from "./pages/Data-Suara/DapilHasilSuara";
import FormSuara from "./pages/Data-Suara/FormSuara";
import Dashboard from "./pages/Dashboard/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

const routes = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sign-in",
        element: <Login />,
      },
      {
        path: "google/callback",
        element: <GoogleCallback />,
      },
      {
        path: "sign-up",
        element: <Register />,
      },

      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
      {
        element: <PrivateRoute roles={["admin"]} />,
        children: [
          {
            path: "partai-politik",
            element: <Parpol />,
          },
          {
            path: "users",
            element: <Users />,
          },
        ],
      },
      {
        element: <PrivateRoute roles={["admin", "user"]} />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },

          {
            path: "daerah-pemilihan",
            element: <Dapil />,
          },
          {
            path: "daerah-pemilihan/:id",
            element: <DapilHasilSuara />,
          },
          {
            path: "daerah-pemilihan/tambah-suara/:id",
            element: <FormSuara />,
          },
          {
            path: "daerah-pemilihan/edit-suara/:id",
            element: <FormSuara />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
