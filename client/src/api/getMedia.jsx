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

            const data = [];
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
        let data;
        try {
            const response = await axios.get(
                "https://openlibrary.org/works/" + id + "/editions.json"
            );

            const entries = response.data.entries;
            const filtered = entries.filter(
                (entry) => entry.covers != undefined
            );
            const result = filtered.reduce((a, b) =>
                new Date(a.publish_date).getTime() <
                new Date(b.publish_date).getTime()
                    ? a
                    : b
            );

            data = {
                title: result.title,
                key: result.key,
                date: result.publish_date,
                publisher: result.publishers,
                pages: result.number_of_pages,
                cover: result.covers[0],
            };

            let authorId;
            try {
                const response = await axios.get(
                    "https://openlibrary.org/works/" + id + ".json"
                );
                authorId = response.data.authors[0].author.key;
                data["description"] = response.data.description;
            } catch (err) {
                return err;
            }

            let author;
            try {
                const response = await axios.get(
                    "https://openlibrary.org" + authorId + ".json"
                );
                author = response.data.name;
            } catch (err) {
                author = undefined;
            }

            data["author"] = author;
        } catch (err) {
            return err;
        }

        return data;
    } catch (err) {
        return err;
    }
}

export async function getSearchResults(mediaType, search) {
    if (mediaType == "books") {
        try {
            const response = await axios.get(
                "https://openlibrary.org/search.json?q=" +
                    search +
                    "&offset=0&limit=50"
            );
            const entries = response.data.docs;

            const data = [];
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
