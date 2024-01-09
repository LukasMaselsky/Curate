import { useState, useReducer, useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Account from "./pages/Account/Account";
import Single from "./pages/Single/Single";
import Author from "./pages/Author/Author";
import TBR from "./pages/TBR/TBR";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./pages/Search/Search";

const queryClient = new QueryClient();

function App() {
    const currentYear = parseInt(new Date().getFullYear());
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        startDate: currentYear - 1,
        endDate: currentYear,
        language: "eng",
        sortBy: "rating",
        searchBy: "title"
        //genres: [],
    });

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <Home
                    search={search}
                    setSearch={setSearch}
                    filters={filters}
                    setFilters={setFilters}
                />
            ),
        },
        {
            path: "/register",
            element: <Register search={search} setSearch={setSearch} />,
        },
        {
            path: "/login",
            element: <Login search={search} setSearch={setSearch} />,
        },
        {
            path: "/account",
            element: <Account search={search} setSearch={setSearch} />,
        },
        {
            path: "/book/:id",
            element: <Single search={search} setSearch={setSearch} />,
        },
        {
            path: "/author/:id",
            element: <Author search={search} setSearch={setSearch} />,
        },
        {
            path: "/search/:searchTerm",
            element: (
                <Search
                    search={search}
                    setSearch={setSearch}
                    filters={filters}
                    setFilters={setFilters}
                />
            ),
        },
        {
            path: "/account/tbr",
            element: <TBR search={search} setSearch={setSearch} />,
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
