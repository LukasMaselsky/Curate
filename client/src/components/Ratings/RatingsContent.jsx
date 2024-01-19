import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Card from "../Card";
import { useQuery } from "@tanstack/react-query";
import { getRatings } from "../../api/ratings";
import StarDisplay from "../StarDisplay";
import Loading from "../Loading";
import Error from "../Error";

export default function RatingsContent() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/register");
        }
    }, []);

    const { data, isLoading, error } = useQuery({
        queryFn: async () => getRatings(),
        queryKey: ["get-ratings"],
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
        <div className="ratings">
            <h1>Ratings</h1>
            <div className="ratings-wrapper">
                {data.length == 0 ? (
                    <div>You haven't rated any books</div>
                ) : (
                    data.map((entry, index) => (
                        <div className="ratings-card-container" key={index}>
                            <Card
                                id={entry.book_id}
                                coverId={entry.cover_id}
                                title={null}
                            />
                            <StarDisplay id={entry.book_id} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
