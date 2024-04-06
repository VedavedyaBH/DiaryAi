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
            <div className="flex justify-between item-center">
                <div className="">
                    {" "}
                    <input
                        type="text"
                        placeholder="find people...."
                        className="px-5 py-2.5 rounded-lg focus:rounded-lg
                        mr-4 text-sm border focus:outline-0
                        focus:shadow-xl ease-in-out duration-300 transform focus:scale-110"
                        value={inputValue}
                        onChange={handleInput}
                    />
                </div>
                <ButtonSmall
                    label={"Search"}
                    onClick={handleSearch}
                ></ButtonSmall>
            </div>
        </>
    );
}

export default SearchBar;
