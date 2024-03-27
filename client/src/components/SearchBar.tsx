import React from "react";
import { ButtonSmall } from "./ButtonSmall";

interface Props {
    handleSearch: () => void;
    handleInputChange: (value: string) => void;
    inputValue: string;
}

function SearchBar({ handleSearch, handleInputChange, inputValue }: Props) {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event.target.value);
    };

    return (
        <>
            <input
                type="text"
                placeholder="find people...."
                className="rounded-xl text-xs p-1 lg:mx-4 border focus:outline-0"
                value={inputValue}
                onChange={handleInput}
            />
            <ButtonSmall label={"Search"} onClick={handleSearch}></ButtonSmall>
        </>
    );
}

export default SearchBar;
