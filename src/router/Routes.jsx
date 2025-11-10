import { createBrowserRouter } from "react-router";
import MainLayout from "../layOut/MainLayout";
import Home from "../pages/Home";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import MyBooks from "../pages/MyBooks";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path:'/',
        Component: MainLayout,
        hydrateFallbackElement: <div>Loading...</div>,
        errorElement: <div>Error-404</div>,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path:'/all-books',
                Component: AllBooks
            },
            {
                path:'/add-book',
                Component: AddBook
            },
            {
                path:'/my-books',
                Component: MyBooks
            },
            {
                path:'/login',
                Component: Login
            },
            {
                path:'/register',
                Component: Register
            },
        ]
    }
]);

export default router