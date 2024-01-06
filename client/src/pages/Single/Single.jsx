import Navbar from "../../components/Navbar/Navbar";
import SingleContent from "../../components/Single/SingleContent";
import "./Single.css";

export default function Single({ search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main>
                <SingleContent />
            </main>
        </>
    );
}
