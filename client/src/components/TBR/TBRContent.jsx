import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Card from "../Card";
import { useQuery } from "@tanstack/react-query";
import { getTBR } from "../../api/tbr";
import Loading from "../Loading";
import Error from "../Error";

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
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
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
