import { useQuery } from "@tanstack/react-query";
import { getTBRPreview, getRatingsPreview } from "../../api/account";
import LazyImage from "../LazyImage";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";

export default function AccountPreview({ type }) {
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery({
        queryFn: async () =>
            type == "tbr" ? getTBRPreview() : getRatingsPreview(),
        queryKey: ["account-preview-" + type],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    let fixedData;
    if (data.length < 5) {
        // fill remaining slots with undefined
        fixedData = Array.from({ length: 5 }, (_, i) =>
            data[i] !== undefined ? data[i] : undefined
        ).reverse();
    } else {
        fixedData = data.reverse();
    }

    const handleClick = () => {
        navigate("/account/" + type);
    };

    return (
        <div className="account-preview">
            <div className="account-preview-wrapper" onClick={handleClick}>
                <h2>{type == "tbr" ? "TBR" : "Ratings"}</h2>
                {fixedData.map((entry, i) => {
                    return entry !== undefined ? (
                        <LazyImage
                            className={"preview preview-cover"}
                            src={`https://covers.openlibrary.org/b/id/${entry.cover_id}-M.jpg?default=false`}
                            title={entry.title}
                        ></LazyImage>
                    ) : (
                        <div className="preview preview-undefined"></div>
                    );
                })}
            </div>
        </div>
    );
}
