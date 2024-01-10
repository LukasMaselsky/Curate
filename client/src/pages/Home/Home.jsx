import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import HomeContent from "../../components/Home/HomeContent";

export default function Home({ search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="home-main">
                <HomeContent />
            </main>
        </>
    );
}
