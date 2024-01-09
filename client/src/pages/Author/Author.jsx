import Navbar from "../../components/Navbar/Navbar";
import AuthorContent from "../../components/Author/AuthorContent";
import "./Author.css";

export default function Author({ search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main>
                <AuthorContent />
            </main>
        </>
    );
}
