import SearchResults from "../../components/Search/SearchResults";
import Navbar from "../../components/Navbar/Navbar";
import Controls from "../../components/Home/Controls";
import "./Search.css";

export default function Search({ setMediaType, mediaType, search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="search-results-main">
                <Controls setMediaType={setMediaType} />
                <SearchResults mediaType={mediaType} />
            </main>
        </>
    );
}
