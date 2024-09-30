import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import Private from "./components/Private";
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
        path: "login",
        element: <Login />,
      },
      {
        path: "google/callback",
        element: <GoogleCallback />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "partai-politik",
        element: <Parpol />,
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
        path: "users",
        element: <Users />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        element: <PrivateRoute roles={["admin"]} />,
        children: [
          {
            path: "private",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
