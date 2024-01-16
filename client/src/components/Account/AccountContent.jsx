import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { getAccountPreview } from "../../api/account";
import { MoonLoader } from "react-spinners";

export default function AccountContent() {
    const { currentUser, login, logout } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            navigate("/register");
        }
    }, []);

    const { data, isLoading, error } = useQuery({
        queryFn: async () => getAccountPreview(),
        queryKey: ["account-preview"],
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

    console.log(data);

    return (
        <div className="account">
            <div className="account-wrapper">
                {[...Array(5)].map((cover, index) => {
                    return <div></div>;
                })}
            </div>
        </div>
    );
}
