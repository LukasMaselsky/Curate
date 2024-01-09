import "./TBR.css";
import Navbar from "../../components/Navbar/Navbar";
import TBRContent from "../../components/TBR/TBRContent";

export default function TBR({ search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main className="tbr-main">
                <TBRContent />
            </main>
        </>
    );
}
