import Navbar from "../../components/Navbar/Navbar";
import FeaturedContent from "../../components/Featured/FeaturedContent";
import Controls from "../../components/Controls";
import "./Featured.css";

export default function Featured({ search, setSearch, filters, setFilters }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="featured-main">
                <Controls setFilters={setFilters} filters={filters} />
                <FeaturedContent filters={filters} />
            </main>
        </>
    );
}
