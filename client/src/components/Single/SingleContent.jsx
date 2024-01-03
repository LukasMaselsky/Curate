import { useLocation } from "react-router-dom";
import { getSingle } from "../../api/getMedia";
import { useQuery } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";

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
        console.log(error);
        return <div>Error</div>;
    }

    return <div>{data.author}</div>;
}
