import axios from "axios";

export async function getFeatured({ filters, pageParam }) {
    let offset = pageParam * 50;
    try {
        const response = await axios.get(
            `https://openlibrary.org/search.json?q=language%3A${filters.language}` +
                (filters.startDate == ""
                    ? ""
                    : `+first_publish_year%3A[${filters.startDate}+TO+${filters.endDate}]`) +
                `&sort=${filters.sortBy}&offset=${offset}&limit=50`
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

export async function getSingle(id) {
    try {
        let data;
        try {
            const response = await axios.get(
                "https://openlibrary.org/works/" + id + "/editions.json"
            );
            const entries = response.data.entries;

            // filter covers
            const filtered = entries.filter(
                (entry) => entry.covers != undefined
            );

            let result;

            // sort by earliest
            if (filtered.length == 0) {
                result = entries[0];
            } else {
                // get a single edition (based rn on oldest date)
                result = filtered.reduce(function (a, b) {
                    if (
                        a.publish_date == undefined &&
                        b.publish_date == undefined
                    ) {
                        return a;
                    }
                    if (a.publish_date == undefined) {
                        return b;
                    }
                    if (b.publish_date == undefined) {
                        return a;
                    }

                    return new Date(a.publish_date).getTime() <
                        new Date(b.publish_date).getTime()
                        ? a
                        : b;
                });
            }

            data = {
                key: result.key,
                date: result.publish_date,
                publisher: result.publishers,
                pages:
                    result.number_of_pages == undefined
                        ? result.pagination
                        : result.number_of_pages,
                cover:
                    result.covers == undefined ? undefined : result.covers[0],
            };

            let authorId;
            try {
                const response = await axios.get(
                    "https://openlibrary.org/works/" + id + ".json"
                );
                authorId = response.data.authors[0].author.key;
                data["authorId"] = authorId;
                data["description"] = response.data.description;
                data["title"] = response.data.title;
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

export async function getSearchResults(search, filters) {
    try {
        const response = await axios.get(
            `https://openlibrary.org/search.json?q=language%3A${filters.language}` +
                (filters.startDate == ""
                    ? ""
                    : `+first_publish_year%3A[${filters.startDate}+TO+${filters.endDate}]`) +
                `&sort=${filters.sortBy}&offset=0&` +
                (filters.searchBy == "title" ? "title=" : "author=") +
                `${search}`
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
        return [response.data.numFound, data];
    } catch (err) {
        return err;
    }
}

export async function getAuthor(id) {
    let data;
    try {
        const response = await axios.get(
            "https://openlibrary.org/authors/" + id + ".json"
        );

        data = {
            bio: response.data.bio,
            photo:
                response.data.photos == undefined
                    ? undefined
                    : response.data.photos[0],
            name: response.data.name,
            birthDate: response.data.birth_date,
            deathDate: response.data.death_date,
        };
    } catch (err) {
        data = undefined;
    }
    return data;
}
