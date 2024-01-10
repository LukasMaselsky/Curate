import "./Ratings.css";
import Navbar from "../../components/Navbar/Navbar";
import RatingsContent from "../../components/Ratings/RatingsContent";

export default function Ratings({ search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="ratings-main">
                <RatingsContent />
            </main>
        </>
    );
}
