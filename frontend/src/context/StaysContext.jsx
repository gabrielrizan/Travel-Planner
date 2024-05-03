import React, { createContext, useContext, useState } from "react";

// Create a context for hotelsData
const HotelsDataContext = createContext();

// Custom hook to access the context
export const useHotelsData = () => useContext(HotelsDataContext);

export default HotelsDataContext;
