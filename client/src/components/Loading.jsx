import { MoonLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="loader-wrapper">
            <MoonLoader
                color={getComputedStyle(
                    document.querySelector(":root")
                ).getPropertyValue("--primary")}
                loading={true}
                size={120}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}
