import Login from "./components/Login";
import Register from "./components/Register";
import Private from "./components/Private";
import PrivateRoute from "./routes/PrivateRoute";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import GoogleCallback from "./components/GoogleCallback";

const Auth: React.FC = () => {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
};

const routes = [
  {
    id: "root",
    path: "",
    element: <Auth />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/google/callback",
        element: <GoogleCallback />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <PrivateRoute roles={["admin"]} />,
        children: [
          {
            path: "/private",
            element: <Private />,
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
