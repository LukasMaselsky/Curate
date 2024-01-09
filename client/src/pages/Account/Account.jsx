import AccountContent from "../../components/Account/AccountContent";
import Navbar from "../../components/Navbar/Navbar";
import "./Account.css";

export default function Account({ search, setSearch }) {
    return (
        <>
            <Navbar search={search} setSearch={setSearch} />
            <main>
                <AccountContent />
            </main>
        </>
    );
}
