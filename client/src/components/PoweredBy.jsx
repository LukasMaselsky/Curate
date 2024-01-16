export default function PoweredBy({ className }) {
    return (
        <div className={className}>
            <p>
                Powered by{" "}
                <a href="https://openlibrary.org/" target="_blank">
                    Open Library
                </a>
            </p>
        </div>
    );
}
