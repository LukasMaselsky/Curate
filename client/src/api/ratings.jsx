import axios from "axios";

export async function getRatings() {
    const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/server/ratings/getRatings",
        {
            withCredentials: true,
        }
    );

    return res.data;
}

export async function getRatingEntry(inputs) {
    const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/server/ratings/getRatingEntry",
        inputs,
        {
            withCredentials: true,
        }
    );
    return res.data;
}

export async function createRatingEntry(inputs) {
    const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/server/ratings/createRatingEntry",
        inputs,
        {
            withCredentials: true,
        }
    );
    return res.data;
}

export async function updateRatingEntry(inputs) {
    const res = await axios.patch(
        import.meta.env.VITE_SERVER_URL + "/server/ratings/updateRatingEntry",
        inputs,
        {
            withCredentials: true,
        }
    );
    return res.data;
}
