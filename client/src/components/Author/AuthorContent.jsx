import { useLocation } from "react-router-dom";
import { getAuthor } from "../../api/media";
import { useQuery } from "@tanstack/react-query";
import LazyImage from "../LazyImage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Loading from "../Loading";
import Error from "../Error";

export default function AuthorContent() {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);

    const { data, isLoading, error } = useQuery({
        queryFn: async () => getAuthor(id),
        queryKey: ["author", id],
        staleTime: Infinity,
        cacheTime: 0,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <div className="author">
            <div className="author-wrapper">
                <div>
                    <LazyImage
                        className={"author-cover"}
                        src={
                            "https://covers.openlibrary.org/b/id/" +
                            data.photo +
                            "-L.jpg?default=false"
                        }
                    />
                </div>
                <div className="author-content">
                    <div className="author-header">
                        <div className="author-header-info">
                            <h1>{data.name}</h1>
                            <h2>
                                {data.birthDate == undefined
                                    ? ""
                                    : data.birthDate}{" "}
                                -{" "}
                                {data.birthDate == undefined
                                    ? ""
                                    : data.deathDate}
                            </h2>
                        </div>
                    </div>
                    <p>
                        {typeof data.bio === "object"
                            ? data.bio.value
                            : data.bio != undefined
                            ? data.bio
                            : "Bio unavailable"}
                    </p>
                </div>
            </div>
        </div>
    );
}
