import books from "../../assets/books-img.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";

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

    return (
        <div className="home">
            <div className="home-wrapper">
                <FontAwesomeIcon
                    className="book-open-icon"
                    icon={bookmarkSolid}
                />
                <FontAwesomeIcon
                    className="book-open-icon"
                    icon={bookmarkSolid}
                />
                <FontAwesomeIcon
                    className="book-open-icon"
                    icon={bookmarkSolid}
                />
                <img className="home-img" src={books}></img>
                <div className="home-text">
                    <div
                        className="home-text-row"
                        onMouseEnter={(e) => handleDim(e)}
                        onMouseLeave={(e) => handleUnDim(e)}
                    >
                        <h1>Find</h1>
                        <p>
                            Search for the books you like with detailed filters
                        </p>
                    </div>
                    <div
                        className="home-text-row"
                        onMouseEnter={(e) => handleDim(e)}
                        onMouseLeave={(e) => handleUnDim(e)}
                    >
                        <h1>Read</h1>
                        <p>Read your findings (Obviously)</p>
                    </div>
                    <div
                        className="home-text-row"
                        onMouseEnter={(e) => handleDim(e)}
                        onMouseLeave={(e) => handleUnDim(e)}
                    >
                        <h1>Curate</h1>
                        <p>Rate and save books to your profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
