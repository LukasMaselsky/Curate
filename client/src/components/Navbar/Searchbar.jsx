import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar({ search, setSearch }) {
    const handleSearch = () => {};

    return (
        <div className="search">
            <input
                name="search"
                placeholder="Search for a movie, show or book"
                value={search}
                type="text"
                onInput={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <FontAwesomeIcon
                className="search-button"
                icon={faMagnifyingGlass}
                onClick={handleSearch}
            />
        </div>
    );
}
