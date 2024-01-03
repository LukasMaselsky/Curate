import Navbar from "../../components/Navbar/Navbar";
import Featured from "../../components/Home/Featured";
import SearchResults from "../../components/Home/SearchResults";
import Controls from "../../components/Home/Controls";
import "./Home.css";
import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState("");
    const [mediaType, setMediaType] = useState("books");

    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="home-main">
                {<Controls setMediaType={setMediaType} />}
                {search == "" ? (
                    <Featured mediaType={mediaType} />
                ) : (
                    <SearchResults search={search} />
                )}
            </main>
        </>
    );
}
