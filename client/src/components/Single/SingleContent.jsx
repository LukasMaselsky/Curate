import { useLocation } from "react-router-dom";
import { getSingle } from "../../api/getMedia";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import LazyImage from "../LazyImage";

export default function SingleContent() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const { data, isLoading, error } = useQuery({
        queryFn: async () => getSingle(id),
        queryKey: ["single", id],
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
        return <div>Error</div>;
    }
    return (
        <div className="single">
            <div className="single-wrapper">
                <div>
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
                    <h1>{data.title}</h1>
                    <h2>{data.author}</h2>
                    <div>
                        <p>
                            {data.pages != undefined ? data.pages : "Unknown"}{" "}
                            pages
                        </p>
                        <p>
                            {data.date != undefined
                                ? data.date
                                : "Unknown date"}
                        </p>
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