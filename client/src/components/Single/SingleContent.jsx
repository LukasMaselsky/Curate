import { Link, useLocation } from "react-router-dom";
import { getSingle } from "../../api/media";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import Error from "../Error";
import LazyImage from "../LazyImage";
import { getTBREntry, createTBREntry, deleteTBREntry } from "../../api/tbr";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as bookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import StarRating from "../StarRating";

export default function SingleContent() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);

    const [isOnTBR, setIsOnTBR] = useState(false);

    useEffect(() => {
        const asyncFn = async () => {
            //! check if logged in first
            if (currentUser) {
                const res = await getTBREntry({ bookId: id });

                setIsOnTBR(res.length == 0 ? false : true);
            }
        };
        asyncFn();
    }, []);

    const { data, isLoading, error } = useQuery({
        queryFn: async () => getSingle(id),
        queryKey: ["single", id],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const handleTBRButton = async () => {
        if (isOnTBR) {
            setIsOnTBR(false);
            await deleteTBREntry({ bookId: id });
        } else {
            setIsOnTBR(true);
            await createTBREntry({ bookId: id, coverId: data.cover });
        }
    };

    return (
        <div className="single">
            <div className="single-wrapper">
                <div className="cover-container">
                    <LazyImage
                        className={"single-cover"}
                        src={
                            "https://covers.openlibrary.org/b/id/" +
                            data.cover +
                            "-L.jpg?default=false"
                        }
                    />
                </div>
                <div className="single-content">
                    <div className="single-header">
                        <div className="single-header-info">
                            <h1>{data.title}</h1>
                            <Link to={"/author/" + data.authorId.split("/")[2]}>
                                <h2>{data.author}</h2>
                            </Link>
                            <div>
                                <p>
                                    {data.pages != undefined
                                        ? data.pages
                                        : "Unknown"}{" "}
                                    pages
                                </p>
                                <p>
                                    {data.date != undefined
                                        ? data.date
                                        : "Unknown date"}
                                </p>
                            </div>
                        </div>
                        <div className="single-header-other">
                            {!currentUser ? (
                                <p>
                                    <Link to="/register">Login</Link> to add to
                                    TBR or rate
                                </p>
                            ) : (
                                <>
                                    <button onClick={handleTBRButton}>
                                        <FontAwesomeIcon
                                            className="bookmark-icon"
                                            icon={
                                                isOnTBR
                                                    ? bookmarkSolid
                                                    : bookmarkRegular
                                            }
                                        />
                                        {isOnTBR
                                            ? "Added to tbr"
                                            : "Add to tbr"}
                                    </button>
                                    <StarRating data={data} />
                                </>
                            )}
                        </div>
                    </div>
                    <p>
                        {typeof data.description === "object"
                            ? data.description.value
                            : data.description != undefined
                            ? data.description
                            : "Description unavailable"}
                    </p>
                </div>
            </div>
        </div>
    );
}
