import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState({
    destinationId: null,
    destinationName: "",
    dateRange: [
      {
        startDate: new Date(),
        endDate: null,
        key: "selection",
      },
    ],
    selections: {
      adults: 1,
      children: 0,
      rooms: 1,
    },
    searchTriggered: false,
  });

  return <SearchContext.Provider value={{ searchState, setSearchState }}>{children}</SearchContext.Provider>;
};
