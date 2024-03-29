import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as starRegular } from "@fortawesome/free-regular-svg-icons";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation } from "react-router-dom";
import {
    getRatingEntry,
    createRatingEntry,
    updateRatingEntry,
} from "../api/ratings";

export default function StarRating({ data }) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const asyncFn = async () => {
            //! check if logged in first
            if (currentUser) {
                const res = await getRatingEntry({ bookId: id });
                setRating(res.length == 0 ? null : res[0].rating);
            }
        };
        asyncFn();
    }, []);

    const handleClick = async (currentRating) => {
        if (rating == null) {
            // first time rating
            await createRatingEntry({
                bookId: id,
                rating: currentRating,
                coverId: data.cover,
            });
        } else {
            await updateRatingEntry({ bookId: id, rating: currentRating });
        }
        setRating(currentRating);
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => handleClick(currentRating)}
                        ></input>
                        <FontAwesomeIcon
                            icon={
                                hover >= currentRating ||
                                rating >= currentRating
                                    ? starSolid
                                    : starRegular
                            }
                            className={
                                hover >= currentRating ? "star-hover" : "star"
                            }
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                );
            })}
        </div>
    );
}
