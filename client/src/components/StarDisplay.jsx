import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as starRegular } from "@fortawesome/free-regular-svg-icons";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { getRatingEntry } from "../api/ratings";

export default function StarDisplay({ id }) {
    const [rating, setRating] = useState(null);

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

    return (
        <div className="star-rating-display">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                        ></input>
                        <FontAwesomeIcon
                            icon={
                                rating >= currentRating
                                    ? starSolid
                                    : starRegular
                            }
                            className="star"
                        />
                    </label>
                );
            })}
        </div>
    );
}
