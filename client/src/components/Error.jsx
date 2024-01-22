import bookshelf3 from "./../assets/bookshelf3.svg";

export default function Error({ error }) {
    return (
        <div className="error-wrapper">
            <img
                src={bookshelf3}
                alt="books icon"
                style={{ width: "200px" }}
            ></img>
            <p style={{ fontSize: "2rem" }}>{error}</p>
        </div>
    );
}
