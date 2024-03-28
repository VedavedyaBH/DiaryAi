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
            <div className="absolute flex justify-between item-center">
                <input
                    type="text"
                    placeholder="find people...."
                    className="rounded-xl focus:rounded-lg mr-4 text-sm p-1 border focus:outline-0
                    focus:w-64 focus:shadow-xl ease-in-out duration-300 h-8 w-48 lg:h-8 lg:w-48"
                    value={inputValue}
                    onChange={handleInput}
                />
                <ButtonSmall
                    label={"Search"}
                    onClick={handleSearch}
                ></ButtonSmall>
            </div>
        </>
    );
}

export default SearchBar;
