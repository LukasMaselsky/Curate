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
    const currentYear = parseInt(new Date().getFullYear());
    const [search, setSearch] = useState("");
    const [mediaType, setMediaType] = useState("books");
    const [filters, setFilters] = useState({
        startDate: currentYear - 1,
        endDate: currentYear,
        language: "eng",
        sortBy: "rating",
        //genres: [],
    });

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Home
                    search={search}
                    setSearch={setSearch}
                    mediaType={mediaType}
                    setMediaType={setMediaType}
                    filters={filters}
                    setFilters={setFilters}
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
            element: <Single search={search} setSearch={setSearch} />,
        },
        {
            path: "/search/:searchTerm",
            element: (
                <Search
                    search={search}
                    setSearch={setSearch}
                    mediaType={mediaType}
                    setMediaType={setMediaType}
                    filters={filters}
                    setFilters={setFilters}
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
