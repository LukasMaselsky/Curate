import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Select from "react-select";
import LanguageCodes from "../../assets/language-codes.json";

export default function Filters({ setFilters }) {
    const currentYear = parseInt(new Date().getFullYear());
    const min = 0;
    const max = currentYear;
    const defaultLanguage = { label: "English", value: "eng" };

    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(currentYear - 1);
    const [endDate, setEndDate] = useState(currentYear);
    const [language, setLanguage] = useState(defaultLanguage.value);

    const handleSubmit = () => {
        setIsOpen(false);
        setFilters({
            startDate: startDate,
            endDate: endDate,
            language: language,
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

    return (
        <div className="filters">
            <FontAwesomeIcon
                icon={faSliders}
                className="filters-icon"
                onClick={() => setIsOpen(true)}
            />
            <div
                className="filters-options"
                style={{ display: isOpen ? "flex" : "none" }}
            >
                <div className="filter language-filter">
                    <p>Language</p>
                    <Select
                        className="language-selector"
                        defaultValue={defaultLanguage}
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
                            onChange={(e) =>
                                handleStartDateChange(e.target.value)
                            }
                        ></input>
                        <input
                            className="end-date"
                            type="number"
                            value={endDate}
                            onChange={(e) =>
                                handleEndDateChange(e.target.value)
                            }
                        ></input>
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
