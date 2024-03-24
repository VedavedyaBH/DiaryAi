import { createContext, useContext, useState } from "react";

const SearchContext = createContext<any>(undefined);

export function SearchProvider({ children }: any) {
    const [query, setQuery] = useState("");

    const contextValue = {
        query,
        setQuery,
    };

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }

    return context;
};
