import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import HomeContent from "../../components/Home/HomeContent";
import { useEffect } from "react";

export default function Home({ search, setSearch }) {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        });

        const hiddenElements = document.querySelectorAll(".hidden");
        hiddenElements.forEach((el) => observer.observe(el));
    });

    return (
        <div className="hidden">
            <Navbar search={search} setSearch={setSearch} />
            <main className="home-main">
                <HomeContent />
            </main>
        </div>
    );
}
