import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Card from "../Card";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import { getTBR } from "../../api/tbr";

export default function TBRContent() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/register");
        }
    }, []);

    const { data, isLoading, error } = useQuery({
        queryFn: async () => getTBR(),
        queryKey: ["get-tbr"],
        staleTime: 30000,
        cacheTime: 0,
    });

    if (isLoading) {
        return (
            <div className="loader-wrapper">
                <MoonLoader
                    color={getComputedStyle(
                        document.querySelector(":root")
                    ).getPropertyValue("--primary")}
                    loading={isLoading}
                    size={120}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <div>Error</div>;
    }

    return (
        <div className="tbr">
            <h1>To be read</h1>
            <div className="tbr-wrapper">
                {data.length == 0 ? (
                    <div>You haven't added any books to your tbr</div>
                ) : (
                    data.map((entry, index) => (
                        <Card
                            id={entry.book_id}
                            key={index}
                            coverId={entry.cover_id}
                            title={null}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
