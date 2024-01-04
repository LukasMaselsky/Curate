import { useEffect, useState, useRef } from "react";

export default function LazyImage({ src, className }) {
    const [inView, setInView] = useState(false);
    const imgRef = useRef();

    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setInView(true);
            }
        });
    };

    useEffect(() => {
        let observer = new IntersectionObserver(callback);

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, []);

    return inView ? (
        <img
            className={className}
            src={src}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "https://via.placeholder.com/200x300";
            }}
        ></img>
    ) : (
        <img
            ref={imgRef}
            className={className}
            style={{
                backgroundColor: getComputedStyle(
                    document.querySelector(":root")
                ).getPropertyValue("--background"),
            }}
        />
    );
}
