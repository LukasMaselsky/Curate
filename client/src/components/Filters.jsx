import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Select from "react-select";
import LanguageCodes from "../assets/language-codes.json";

export default function Filters({ setFilters, filters }) {
    useEffect(() => {
        const btn = document.getElementsByClassName(filters.sortBy + "-btn")[0];
        btn.classList.add("focused-btn");
        const btn2 = document.getElementsByClassName(
            filters.searchBy + "-btn"
        )[0];
        btn2.classList.add("focused-btn");
    }, []);

    const currentYear = parseInt(new Date().getFullYear());
    const min = 0;
    const max = currentYear;
    const defaultLanguage = { label: "English", value: "eng" };

    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(filters.startDate);
    const [endDate, setEndDate] = useState(filters.endDate);
    var previousChange = null;
    const [language, setLanguage] = useState(filters.language);
    const [sortBy, setSortBy] = useState(filters.sortBy);
    const [searchBy, setSearchBy] = useState(filters.searchBy);

    const [isFocused, setIsFocused] = useState(
        filters.startDate == "" ? true : false
    );

    const handleSubmit = () => {
        setIsOpen(false);
        setFilters({
            startDate: startDate,
            endDate: endDate,
            language: language,
            sortBy: sortBy,
            searchBy: searchBy,
        });
    };

    const handleLanguageChange = (selected) => {
        setLanguage(selected.value);
    };

    const handleStartDateChange = (year) => {
        const truncated = Math.max(min, Math.min(max - 1, Number(year)));
        if (truncated >= endDate) {
            setStartDate(endDate - 1);
        } else {
            setStartDate(truncated);
        }
    };

    const handleEndDateChange = (year) => {
        const truncated = Math.max(min, Math.min(max, Number(year)));
        if (truncated <= startDate) {
            setEndDate(startDate + 1);
        } else {
            setEndDate(truncated);
        }
    };

    const openFilters = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        const btn = document.getElementsByClassName("any-year-btn")[0];
        if (isFocused) {
            btn.classList.add("focused-btn");
            setStartDate("");
            setEndDate("");
        } else {
            btn.classList.remove("focused-btn");
            setStartDate(max - 1);
            setEndDate(max);
        }
    }, [isFocused]);

    const unfocusAnyBtn = () => {
        if (isFocused) {
            setIsFocused(false);
        }
    };

    const handleSortByClick = (name) => {
        setSortBy(name);
        const newBtn = document.getElementsByClassName("new-btn")[0];
        const oldBtn = document.getElementsByClassName("old-btn")[0];
        const ratingBtn = document.getElementsByClassName("rating-btn")[0];

        newBtn.classList.remove("focused-btn");
        oldBtn.classList.remove("focused-btn");
        ratingBtn.classList.remove("focused-btn");

        const btn = document.getElementsByClassName(name + "-btn")[0];
        btn.classList.add("focused-btn");
    };

    const handleSearchByClick = (name) => {
        setSearchBy(name);
        const titleBtn = document.getElementsByClassName("title-btn")[0];
        const authorBtn = document.getElementsByClassName("author-btn")[0];

        titleBtn.classList.remove("focused-btn");
        authorBtn.classList.remove("focused-btn");

        const btn = document.getElementsByClassName(name + "-btn")[0];
        btn.classList.add("focused-btn");
    };

    // onBlur doesn't register the arrow presses as a change of input focus

    return (
        <div className="filters">
            <FontAwesomeIcon
                icon={faSliders}
                style={{ visibility: isOpen ? "hidden" : "visible" }}
                className="filters-icon"
                onClick={openFilters}
            />
            <div
                className="filters-options"
                style={{ display: isOpen ? "flex" : "none" }}
            >
                <div className="filter language-filter">
                    <p>Language</p>
                    <Select
                        defaultValue={defaultLanguage}
                        className="language-selector"
                        onChange={handleLanguageChange}
                        options={LanguageCodes}
                    />
                </div>
                <div className="filter year-filter">
                    <p>Year</p>
                    <div className="year-filter-wrapper">
                        <input
                            className="start-date"
                            type="text"
                            value={startDate}
                            onBlur={(e) =>
                                handleStartDateChange(e.target.value)
                            }
                            onChange={(e) => setStartDate(e.target.value)}
                            onFocus={() => unfocusAnyBtn()}
                        ></input>
                        <input
                            className="end-date"
                            type="text"
                            value={endDate}
                            onBlur={(e) => handleEndDateChange(e.target.value)}
                            onChange={(e) => setEndDate(e.target.value)}
                            onFocus={() => unfocusAnyBtn()}
                        ></input>
                        <button
                            className="any-year-btn"
                            aria-label="Any year button"
                            onClick={() => setIsFocused((prev) => !prev)}
                        >
                            Any
                        </button>
                    </div>
                </div>
                <div className="filter sortby-filter">
                    <p>Sort by</p>
                    <div className="sortby-filter-wrapper">
                        <button
                            className="new-btn"
                            aria-label="Sort by new button"
                            onClick={() => handleSortByClick("new")}
                        >
                            New
                        </button>
                        <button
                            className="old-btn"
                            aria-label="Sort by old button"
                            onClick={() => handleSortByClick("old")}
                        >
                            Old
                        </button>
                        <button
                            className="rating-btn"
                            aria-label="Sort by rating button"
                            onClick={() => handleSortByClick("rating")}
                        >
                            Rating
                        </button>
                    </div>
                </div>
                <div className="filter searchby-filter">
                    <p>Search by</p>
                    <div className="searchby-filter-wrapper">
                        <button
                            className="title-btn"
                            aria-label="Search by title button"
                            onClick={() => handleSearchByClick("title")}
                        >
                            Title
                        </button>
                        <button
                            className="author-btn"
                            aria-label="Search by author button"
                            onClick={() => handleSearchByClick("author")}
                        >
                            Author
                        </button>
                    </div>
                </div>
                <div className="save-filters">
                    <button
                        className="cancel-filter-btn"
                        aria-label="Cancel filters button"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleSubmit()}
                        aria-label="Save filter button"
                        className="save-filters-btn"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
