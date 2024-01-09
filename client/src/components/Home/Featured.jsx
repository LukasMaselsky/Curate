import { useQuery } from "@tanstack/react-query";
import { getFeatured } from "../../api/getMedia";
import Card from "../Card";
import { MoonLoader } from "react-spinners";

export default function Featured({ mediaType, filters }) {
    const { data, isLoading, error } = useQuery({
        queryFn: async () => getFeatured(mediaType, filters),
        queryKey: ["featured", filters],
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
        <div className="featured">
            <div className="featured-wrapper">
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
