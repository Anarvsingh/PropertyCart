import Navbar from "./Navbar/Navbar.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import ListPage from "./pages/listPage/ListPage.jsx";
import SinglePage from "./pages/singlePage/SinglePage.jsx";
import { Layout, RequireAuth } from "./pages/layout/Layout.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProfilePage from "./pages/profilePage/ProfilePage.jsx";
import ProfileUpdate from "./pages/profileUpdatePage/ProfileUpdate.jsx";
import PostPage from "./pages/newPostPage/PostPage.jsx";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
      ]
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdate />,
        },
        {
          path: "/add",
          element: <PostPage />,
        },
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />

  )
}

export default App