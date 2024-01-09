import Filters from "./Filters";

export default function Controls({ setFilters, filters }) {
    return (
        <div className="controls">
            <div className="controls-wrapper">
                <Filters setFilters={setFilters} filters={filters} />
            </div>
        </div>
    );
}
