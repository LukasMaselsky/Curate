import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getFeatured } from "../../api/media";
import Card from "../Card";
import { MoonLoader } from "react-spinners";
import { Fragment } from "react";

export default function FeaturedContent({ filters }) {
    const {
        data,
        isLoading,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryFn: async ({ pageParam = 0 }) =>
            getFeatured({ filters, pageParam }),
        queryKey: ["featured", filters],
        getNextPageParam: (lastPage, pages) => {
            return pages.length;
        },
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
            <h1>Featured books</h1>
            <div className="featured-wrapper">
                {data.pages.map((group, index) => {
                    return (
                        <Fragment key={index}>
                            {group.map((entry, i) => {
                                return (
                                    <Card
                                        key={i}
                                        id={entry.id}
                                        coverId={entry.coverId}
                                        title={entry.title}
                                    />
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>
            {isFetchingNextPage ? (
                <div className="loader-wrapper">
                    <MoonLoader
                        color={getComputedStyle(
                            document.querySelector(":root")
                        ).getPropertyValue("--primary")}
                        loading={isFetchingNextPage}
                        size={120}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : null}
            <div
                className="load-more-wrapper"
                style={{ display: isFetchingNextPage ? "none" : "flex" }}
            >
                <button
                    disabled={!hasNextPage}
                    onClick={fetchNextPage}
                    className="load-more-btn"
                >
                    Load more
                </button>
            </div>
        </div>
    );
}
