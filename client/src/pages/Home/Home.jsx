import Navbar from "../../components/Navbar/Navbar";
import Featured from "../../components/Home/Featured";
import Controls from "../../components/Home/Controls";
import "./Home.css";

export default function Home({
    search,
    setSearch,
    mediaType,
    setMediaType,
    filters,
    setFilters,
}) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="home-main">
                <Controls setMediaType={setMediaType} setFilters={setFilters} />
                <Featured mediaType={mediaType} filters={filters} />
            </main>
        </>
    );
}
