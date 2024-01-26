import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeatured } from "../../api/media";
import Card from "../Card";
import { Fragment } from "react";
import Error from "../Error";
import Loading from "../Loading";

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
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (data.pages[0].name == "AxiosError") {
        return (
            <Error
                error={
                    "Something went wrong :( Please check your internet connection"
                }
            />
        );
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
            {isFetchingNextPage ? <Loading /> : null}
            <div
                className="load-more-wrapper"
                style={{
                    display: isFetchingNextPage ? "none" : "flex",
                }}
            >
                <button
                    aria-label="Load more button"
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
