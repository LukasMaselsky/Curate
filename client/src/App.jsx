import { useState, useReducer, useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import Single from "./pages/Single/Single";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./pages/Search/Search";

const queryClient = new QueryClient();

function App() {
    const [search, setSearch] = useState("");
    const [mediaType, setMediaType] = useState("books");

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Home
                    search={search}
                    mediaType={mediaType}
                    setMediaType={setMediaType}
                    setSearch={setSearch}
                />
            ),
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
        {
            path: "/book/:id",
            element: <Single />,
        },
        {
            path: "/search/:searchTerm",
            element: (
                <Search
                    search={search}
                    mediaType={mediaType}
                    setMediaType={setMediaType}
                    setSearch={setSearch}
                />
            ),
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
