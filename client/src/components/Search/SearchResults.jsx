import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import Card from "../Home/Card";
import { getSearchResults } from "../../api/getMedia";
import { useLocation } from "react-router-dom";

export default function SearchResults({ mediaType, filters }) {
    const location = useLocation();
    const search = location.pathname.split("/")[2];

    const { data, isLoading, error } = useQuery({
        queryFn: async () => getSearchResults(mediaType, search, filters),
        queryKey: ["search-results", search, filters],
        staleTime: Infinity,
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
        <div className="search-results">
            <h1>Search results for "{search.replaceAll("%20", " ")}"</h1>
            <div className="search-results-wrapper">
                {data.map((entry, index) => (
                    <Card
                        id={entry.id}
                        key={index}
                        coverId={entry.coverId}
                        title={entry.title}
                    />
                ))}
            </div>
        </div>
    );
}
