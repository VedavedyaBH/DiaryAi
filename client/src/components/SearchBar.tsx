import React, { useState } from "react";
import { useSearch } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const { setQuery } = useSearch();
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSearch = () => {
        setQuery(inputValue);
        navigate("/findPeople");
    };

    return (
        <>
            <input
                type="text"
                placeholder="find people...."
                className="rounded-xl text-xs p-1 m-4 border focus:outline-0"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button
                onClick={handleSearch}
                className="m-4 bg-black rounded-xl text-xs text-gray-200 p-1 text-center w-12"
            >
                Search
            </button>
        </>
    );
}

export default SearchBar;
