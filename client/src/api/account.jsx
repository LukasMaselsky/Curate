import axios from "axios";

export const getTBRPreview = async () => {
    const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/server/account/getTBRPreview",
        {
            withCredentials: true,
        }
    );

    return res.data;
};

export const getRatingsPreview = async () => {
    const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/server/account/getRatingsPreview",
        {
            withCredentials: true,
        }
    );

    return res.data;
};
