import React, { useState } from "react";
import HotelsDataContext from "./StaysContext";

const StaysProvider = ({ children }) => {
  // State for hotelsData
  const [hotelsData, setHotelsData] = useState([]);

  return (
    // Provide the context value to the children
    <HotelsDataContext.Provider value={[hotelsData, setHotelsData]}>{children}</HotelsDataContext.Provider>
  );
};

export default StaysProvider;
