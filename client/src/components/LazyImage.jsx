import { useEffect, useState, useRef } from "react";
import unavailable from "../assets/image-unavailable.png";

export default function LazyImage({ src, className, title }) {
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

    const accent = getComputedStyle(
        document.querySelector(":root")
    ).getPropertyValue("--accent");
    const primary = getComputedStyle(
        document.querySelector(":root")
    ).getPropertyValue("--primary");

    return inView ? (
        <img
            className={className}
            src={src}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.style.backgroundColor = accent;
                currentTarget.src = unavailable;
            }}
        ></img>
    ) : (
        <img
            ref={imgRef}
            className={className}
            style={{
                backgroundColor: accent,
            }}
        />
    );
}
