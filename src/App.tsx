import {lazy, Suspense} from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import GoogleCallback from "./pages/Login/GoogleCallback";
// import Parpol from "./pages/Parpol/Parpol";
// import Dapil from "./pages/Daerah-Pemilihan/Dapil";
// import Users from "./pages/Users/Users";
// import Profile from "./pages/Profile/Profile";
// import DapilHasilSuara from "./pages/Data-Suara/DapilHasilSuara";
// import FormSuara from "./pages/Data-Suara/FormSuara";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import ResetPassword from "./pages/ResetPassword";

const Login = lazy(()=> import("./pages/Login/Login"));
const Register = lazy(()=> import( "./pages/Register"));
const Home = lazy(()=> import( "./pages/Home"));
const GoogleCallback = lazy(()=> import("./pages/Login/GoogleCallback"));
const Parpol = lazy(()=> import("./pages/Parpol/Parpol"));
const Dapil = lazy(()=> import("./pages/Daerah-Pemilihan/Dapil"));
const Users = lazy(()=> import("./pages/Users/Users"));
const Profile = lazy(()=> import("./pages/Profile/Profile"));
const DapilHasilSuara = lazy(()=> import("./pages/Data-Suara/DapilHasilSuara"))
const FormSuara = lazy(()=> import("./pages/Data-Suara/FormSuara"));
const Dashboard = lazy(()=> import("./pages/Dashboard/Dashboard"));
const ResetPassword = lazy(()=> import("./pages/ResetPassword"));

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

const Loading : React.FC = () => {
  return(
    <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"/>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"/>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce"/>
    </div>
  )
}

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <Toaster />
      <Suspense fallback={<Loading/>}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
