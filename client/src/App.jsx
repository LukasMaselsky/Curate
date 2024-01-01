import { useState, useReducer, useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/account",
            element: <Account />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
