import axios from "axios";

export const getAccountPreview = async () => {
    const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/server/account/getAccountPreview",
        {
            withCredentials: true,
        }
    );

    return res.data;
};
