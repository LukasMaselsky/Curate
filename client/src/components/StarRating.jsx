import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as starSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as starRegular } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function StarRating() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleClick = (currentRating) => {
        if (rating == null) {
            // first time rating
        }
        setRating(currentRating);
    };

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label>
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
