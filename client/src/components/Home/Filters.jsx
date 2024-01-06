import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Select from "react-select";
import LanguageCodes from "../../assets/language-codes.json";

export default function Filters({ setFilters, filters }) {
    useEffect(() => {
        const btn = document.getElementsByClassName("rating-btn")[0];
        btn.classList.add("focused-btn");
    }, []);

    const currentYear = parseInt(new Date().getFullYear());
    const min = 0;
    const max = currentYear;
    const defaultLanguage = { label: "English", value: "eng" };

    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(filters.startDate);
    const [endDate, setEndDate] = useState(filters.endDate);
    const [language, setLanguage] = useState(filters.language);
    const [sortBy, setSortBy] = useState(filters.sortBy);

    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = () => {
        setIsOpen(false);
        setFilters({
            startDate: startDate,
            endDate: endDate,
            language: language,
            sortBy: sortBy,
        });
    };

    const handleLanguageChange = (selected) => {
        setLanguage(selected.value);
    };

    const handleStartDateChange = (year) => {
        const truncated = Math.max(min, Math.min(max, Number(year)));
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

    return (
        <div className="filters">
            <FontAwesomeIcon
                icon={faSliders}
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
                            type="number"
                            value={startDate}
                            onBlur={(e) =>
                                handleStartDateChange(e.target.value)
                            }
                            onChange={(e) => setStartDate(e.target.value)}
                            onFocus={() => unfocusAnyBtn()}
                        ></input>
                        <input
                            className="end-date"
                            type="number"
                            value={endDate}
                            onBlur={(e) => handleEndDateChange(e.target.value)}
                            onChange={(e) => setEndDate(e.target.value)}
                            onFocus={() => unfocusAnyBtn()}
                        ></input>
                        <button
                            className="any-year-btn"
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
                            onClick={() => handleSortByClick("new")}
                        >
                            New
                        </button>
                        <button
                            className="old-btn"
                            onClick={() => handleSortByClick("old")}
                        >
                            Old
                        </button>
                        <button
                            className="rating-btn"
                            onClick={() => handleSortByClick("rating")}
                        >
                            Rating
                        </button>
                    </div>
                </div>
                <div className="save-filters">
                    <button
                        className="cancel-filter-btn"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleSubmit()}
                        className="save-filters-btn"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
