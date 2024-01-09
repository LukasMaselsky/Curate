import axios from "axios";

export async function getTBR() {
    const res = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/server/tbr/getTBR",
        {
            withCredentials: true,
        }
    );

    return res.data;
}

export async function getTBREntry(inputs) {
    const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/server/tbr/getTBREntry",
        inputs,
        {
            withCredentials: true,
        }
    );
    return res.data;
}

export async function createTBREntry(inputs) {
    const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/server/tbr/createTBREntry",
        inputs,
        {
            withCredentials: true,
        }
    );
    return res.data;
}

export async function deleteTBREntry(inputs) {
    const res = await axios.delete(
        import.meta.env.VITE_SERVER_URL +
            "/server/tbr/deleteTBREntry/" +
            inputs.bookId,
        {
            withCredentials: true,
        }
    );
    return res.data;
}
