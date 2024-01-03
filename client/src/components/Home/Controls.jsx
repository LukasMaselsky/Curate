import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";

export default function Controls({ setMediaType }) {
    useEffect(() => {
        const booksBtn = document.getElementsByClassName("books-btn")[0];
        booksBtn.classList.add("focused-btn");
    }, []);

    const handleClick = (name) => {
        setMediaType(name);
        const moviesBtn = document.getElementsByClassName("movies-btn")[0];
        const tvBtn = document.getElementsByClassName("tv-btn")[0];
        const booksBtn = document.getElementsByClassName("books-btn")[0];

        moviesBtn.classList.remove("focused-btn");
        tvBtn.classList.remove("focused-btn");
        booksBtn.classList.remove("focused-btn");

        if (name == "movies") {
            moviesBtn.classList.add("focused-btn");
        } else if (name == "tv") {
            tvBtn.classList.add("focused-btn");
        } else {
            booksBtn.classList.add("focused-btn");
        }
    };

    return (
        <div className="controls">
            <div className="controls-wrapper">
                <div className="types">
                    <button
                        className="movies-btn"
                        onClick={() => handleClick("movies")}
                    >
                        Movies
                    </button>
                    <button
                        className="tv-btn"
                        onClick={() => handleClick("tv")}
                    >
                        TV
                    </button>
                    <button
                        className="books-btn"
                        onClick={() => handleClick("books")}
                    >
                        Books
                    </button>
                </div>
                <div className="filters">
                    <FontAwesomeIcon
                        icon={faSliders}
                        className="filters-icon"
                    />
                </div>
            </div>
        </div>
    );
}
