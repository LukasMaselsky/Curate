import axios from "axios";

export async function getFeatured(mediaType) {
    if (mediaType == "books") {
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;
        try {
            const response = await axios.get(
                "https://openlibrary.org/search.json?q=first_publish_year%3A[" +
                    previousYear +
                    "+TO+" +
                    currentYear +
                    "]&sort=rating&offset=0&limit=50"
            );
            const entries = response.data.docs;

            let data = [];
            entries.forEach(async (entry) => {
                const id = entry.key.slice(7);

                data.push({
                    id: id,
                    coverId: entry.cover_i,
                    title: entry.title,
                });
            });

            return data;
        } catch (err) {
            return err;
        }
    }
}

export async function getSingle(id) {
    try {
        const response = await axios.get(
            "https://openlibrary.org/works/" + id + ".json"
        );

        const authorId = response.data.authors[0].author.key;
        let author;
        try {
            const response = await axios.get(
                "https://openlibrary.org" + authorId + ".json"
            );
            author = response.data.name;
        } catch (err) {
            author = undefined;
        }

        let data = response.data;
        data["author"] = author;

        return data;
    } catch (err) {
        return err;
    }
}
