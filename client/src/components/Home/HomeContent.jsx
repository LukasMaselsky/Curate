import books from "../../assets/books-img.svg";
import bookshelf1 from "../../assets/bookshelf1.svg";
import bookshelf2 from "../../assets/bookshelf2.svg";
import bookshelf3 from "../../assets/bookshelf3.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function HomeContent() {
    const handleDim = (e) => {
        document.getElementsByTagName("nav")[0].classList.add("is-dimmed");
        document.getElementsByTagName("main")[0].classList.add("is-dimmed");
        document
            .getElementsByClassName("home-img")[0]
            .classList.add("is-dimmed");
        document.querySelectorAll(".book-open-icon").forEach((icon) => {
            icon.classList.add("is-dimmed");
        });
    };

    const handleUnDim = (e) => {
        document.getElementsByTagName("nav")[0].classList.remove("is-dimmed");
        document.getElementsByTagName("main")[0].classList.remove("is-dimmed");
        document
            .getElementsByClassName("home-img")[0]
            .classList.remove("is-dimmed");

        document.querySelectorAll(".book-open-icon").forEach((icon) => {
            icon.classList.remove("is-dimmed");
        });
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    return (
        <div className="home">
            <div className="home-wrapper">
                <img className="home-img" src={books}></img>
                <div className="home-text">
                    <div
                        className="home-text-row"
                        onMouseEnter={(e) => handleDim(e)}
                        onMouseLeave={(e) => handleUnDim(e)}
                    >
                        <div className="row-big">
                            <h1 className="row-header">Find</h1>
                        </div>
                        <div className="row-small">
                            <img className="bookshelf" src={bookshelf1}></img>
                            <p>Search for books with detailed filters</p>
                        </div>
                    </div>
                    <div
                        className="home-text-row"
                        onMouseEnter={(e) => handleDim(e)}
                        onMouseLeave={(e) => handleUnDim(e)}
                    >
                        <div className="row-big">
                            <h1 className="row-header">Read</h1>
                        </div>
                        <div className="row-small">
                            <img className="bookshelf" src={bookshelf2}></img>
                            <p>Read your findings (Obviously)</p>
                        </div>
                    </div>
                    <div
                        className="home-text-row"
                        onMouseEnter={(e) => handleDim(e)}
                        onMouseLeave={(e) => handleUnDim(e)}
                    >
                        <div className="row-big">
                            <h1 className="row-header">Curate</h1>
                        </div>
                        <div className="row-small">
                            <img className="bookshelf" src={bookshelf3}></img>
                            <p>Rate and save books</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
