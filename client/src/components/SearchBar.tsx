import React, { useState } from "react";
import { useSearch } from "../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import { ButtonSmall } from "./ButtonSmall";

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
                className="rounded-xl text-xs p-1 lg:m-4 border focus:outline-0"
                value={inputValue}
                onChange={handleInputChange}
            />
            <ButtonSmall label={"Search"} onClick={handleSearch}></ButtonSmall>
        </>
    );
}

export default SearchBar;
