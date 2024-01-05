import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar({ search, setSearch }) {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (search.length > 1) {
            navigate("/search/" + search);
        }
    };

    return (
        <div className="search">
            <form className="search-form" onSubmit={handleSubmit} method="post">
                <input
                    name="search"
                    placeholder="Search for a movie, show or book"
                    value={search}
                    type="text"
                    onInput={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                />
                <FontAwesomeIcon
                    className="search-button"
                    icon={faMagnifyingGlass}
                    type="submit"
                />
            </form>
        </div>
    );
}