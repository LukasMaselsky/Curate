import LazyImage from "./LazyImage";
import { useNavigate } from "react-router-dom";

export default function Card({ coverId, id, title }) {
    const navigate = useNavigate();
    return (
        <div className="card" onClick={() => navigate("/book/" + id)}>
            <LazyImage
                className={"cover"}
                src={
                    "https://covers.openlibrary.org/b/id/" +
                    coverId +
                    "-M.jpg?default=false"
                }
                title={title}
            />
        </div>
    );
}
